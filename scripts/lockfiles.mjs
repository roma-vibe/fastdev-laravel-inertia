#!/usr/bin/env node
// Regenerates the lockfiles shipped in files/ (never edit them by hand).
//
//   node scripts/lockfiles.mjs          # npm + composer
//   node scripts/lockfiles.mjs npm      # files/package-lock.json@frontend=<f>@css=<c>, one per combination
//   node scripts/lockfiles.mjs composer # files/composer.lock, resolved on PHP 8.4 (the minimum) in Docker
//
// npm: files/package.json.tmpl is rendered for every frontend × css combination (dependencies are
// pinned there; the lockfile pins the transitive ones) and `npm install --package-lock-only` writes
// the lockfile. Requires Node.js 24+ and npm. composer: requires Docker.
import { execFileSync } from 'node:child_process';
import { copyFileSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const files = join(root, 'files');
const choices = {
    frontend: ['vue', 'react'],
    css: ['tailwind', 'bootstrap', 'none'],
};

/**
 * Renders the subset of minijinja used by package.json.tmpl: `{% if %}`, `{% elif %}`, `{% else %}`,
 * `{% endif %}` with `choices.<name> == "<value>"` / `!=` conditions joined by `and` / `or`, and `-`
 * whitespace control. Anything else is an error, so a template change cannot be rendered wrongly.
 */
function render(template, selected) {
    const tag = /(\s*)\{%(-?)\s*(if|elif|else|endif)\b\s*(.*?)\s*(-?)%\}(\s*)/gs;
    const evaluate = (expression) =>
        expression.split(/\s+or\s+/).some((any) =>
            any.split(/\s+and\s+/).every((test) => {
                const match = /^choices\.(\w+)\s*(==|!=)\s*"([^"]*)"$/.exec(test.trim());
                if (!match) throw new Error(`unsupported condition: ${test}`);
                const [, name, op, value] = match;
                if (!(name in selected)) throw new Error(`unknown choice: ${name}`);
                return (selected[name] === value) === (op === '==');
            }),
        );
    const stack = []; // { active, taken, parentActive }
    const isActive = () => stack.every((frame) => frame.active);
    let out = '';
    let last = 0;
    for (const match of template.matchAll(tag)) {
        const [whole, before, trimBefore, keyword, expression, trimAfter, after] = match;
        if (isActive()) {
            out += template.slice(last, match.index) + (trimBefore ? '' : before);
        }
        if (keyword === 'if') {
            const active = evaluate(expression);
            stack.push({ active, taken: active });
        } else if (keyword === 'elif' || keyword === 'else') {
            const frame = stack.at(-1);
            if (!frame) throw new Error(`${keyword} without if`);
            const active = !frame.taken && (keyword === 'else' || evaluate(expression));
            frame.active = active;
            frame.taken ||= active;
        } else {
            if (!stack.pop()) throw new Error('endif without if');
        }
        if (isActive() && !trimAfter) out += after;
        last = match.index + whole.length;
    }
    if (stack.length) throw new Error('unclosed if');
    out += template.slice(last);
    if (/\{[{%#]/.test(out)) throw new Error('unsupported template syntax left after rendering');
    return out;
}

function npmLockfiles() {
    const template = readFileSync(join(files, 'package.json.tmpl'), 'utf8');
    for (const frontend of choices.frontend) {
        for (const css of choices.css) {
            const dir = mkdtempSync(join(tmpdir(), 'lockfile-'));
            try {
                const manifest = render(template, { frontend, css });
                JSON.parse(manifest); // must be valid JSON
                writeFileSync(join(dir, 'package.json'), manifest);
                copyFileSync(join(files, '.npmrc'), join(dir, '.npmrc'));
                execFileSync(
                    'npm',
                    ['install', '--package-lock-only', '--ignore-scripts', '--no-audit', '--no-fund'],
                    { cwd: dir, stdio: 'inherit' },
                );
                const target = `package-lock.json@frontend=${frontend}@css=${css}`;
                copyFileSync(join(dir, 'package-lock.json'), join(files, target));
                console.log(`wrote files/${target}`);
            } finally {
                rmSync(dir, { recursive: true, force: true });
            }
        }
    }
}

function composerLock() {
    // Composer from the official image, run on PHP 8.4 so every locked package supports the minimum.
    const tools = mkdtempSync(join(tmpdir(), 'composer-'));
    try {
        const composer = execFileSync(
            'docker',
            ['run', '--rm', '--entrypoint', 'cat', 'composer:2', '/usr/bin/composer'],
            { maxBuffer: 64 * 1024 * 1024 },
        );
        writeFileSync(join(tools, 'composer'), composer, { mode: 0o755 });
        // A fresh resolution: `composer update` keeps a stale content-hash when nothing else changes.
        rmSync(join(files, 'composer.lock'), { force: true });
        const uid = execFileSync('id', ['-u']).toString().trim();
        const gid = execFileSync('id', ['-g']).toString().trim();
        execFileSync(
            'docker',
            [
                'run', '--rm', '-u', `${uid}:${gid}`, '-e', 'COMPOSER_HOME=/tmp/composer',
                '-v', `${join(tools, 'composer')}:/usr/local/bin/composer:ro`,
                '-v', `${files}:/app`, '-w', '/app',
                'php:8.4-cli-trixie',
                'composer', 'update', '--no-install', '--no-scripts', '--no-interaction', '--no-progress',
            ],
            { stdio: 'inherit' },
        );
        console.log('wrote files/composer.lock');
    } finally {
        rmSync(tools, { recursive: true, force: true });
    }
}

const what = process.argv[2] ?? 'all';
if (what === 'npm' || what === 'all') npmLockfiles();
if (what === 'composer' || what === 'all') composerLock();
if (!['npm', 'composer', 'all'].includes(what)) {
    console.error('usage: node scripts/lockfiles.mjs [npm|composer|all]');
    process.exit(1);
}
