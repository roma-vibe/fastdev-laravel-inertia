# Laravel + Inertia skeleton — instructions for AI agents

This repository is a fastDev skeleton (`laravel-inertia`). It is not a project: fastDev copies `files/` into
new projects and renders `*.tmpl` files. Read the fastDev skeleton authoring guide first
(MCP tool `get_authoring_guide`, or `docs/skeleton-authoring.md` in the fastDev repository).

- Change `template.toml`, `files/` and `scripts/` only; `files/AGENTS.md.tmpl` and `files/SPEC.md.tmpl` are the
  instructions of the future projects, not of this repository.
- Do not commit, tag or edit `CHANGELOG.md` by hand: validate, verify and publish through fastDev
  (`validate_skeleton`, `verify_skeleton`, `publish_skeleton`). Publishing commits, creates the
  `vX.Y.Z` tag, pushes and updates the registry.
- Never move or delete a published tag.
- Everything is written in English.

## How this skeleton is configured

- Choices: `frontend` (vue, react), `css` (tailwind, bootstrap, none), `database` (sqlite, postgres, mysql),
  `docker` (none, run, full) and `data` (volume, local). Alternatives of one file are conditional files
  (`resources/js/Pages@frontend=vue/…`, `resources/css/app.css@css=bootstrap`, `Dockerfile.tmpl@docker=run|full`);
  small differences are `{% if choices.… %}` blocks in `*.tmpl` files.
- Pages use the same class names with every `css` option (Bootstrap's component names: `container`, `card`,
  `btn btn-primary`, `form-control`, `alert`… plus a few app classes such as `notes-layout`); each option's
  `resources/css/app.css` defines them. Keep the markup of Vue and React pages equivalent.
- Setup and commands: the base ones are for the host with SQLite; `database` options (PostgreSQL, MySQL) add
  `docker compose up -d --wait db` for `docker = "run"`, and `docker` options, applied afterwards, replace them
  (`none`: host commands, `full`: everything through `docker compose run --rm dev …`).

## Dependencies and lockfiles

- PHP: `files/composer.json` (no package name: `composer.lock`'s content-hash includes it, so fastDev could not
  rename it without breaking `composer install`). Node: `files/package.json.tmpl` with exact versions per option.
- Never edit lockfiles by hand. After changing dependencies run `node scripts/lockfiles.mjs` (or `… npm` /
  `… composer`): it writes one `files/package-lock.json@frontend=<f>@css=<c>` per combination and
  `files/composer.lock` (resolved on PHP 8.4, the minimum, in Docker). `[updates]` is not used because
  `package.json` is a template.

## Verification

`[verify] variants` cover every option. The `docker = "none"` and `docker = "run"` variants develop on the
host, so verifying needs PHP 8.4+, Composer and Node.js 24+ on the host (or stand-in wrappers that run them in
Docker, as used for 1.0.0); the others need only Docker.
