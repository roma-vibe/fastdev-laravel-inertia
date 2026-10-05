# Laravel + Inertia

A Laravel 13 web app with an Inertia 3 frontend: Vue or React, Tailwind CSS, Bootstrap or plain CSS, and
SQLite, PostgreSQL or MySQL, chosen when a project is created; Docker can run everything.

This repository is a [fastDev](https://github.com/roma-vibe/fastDev) project skeleton (`laravel-inertia`). fastDev lists it
from a registry, downloads it when first used and creates named, ready-to-run projects from it.

- `template.toml` — the manifest: requirements, choices, env, setup steps and commands.
- `files/` — the files of a new project (`*.tmpl` files are rendered with the project name and options;
  `path@choice=option` files exist only for that option).
- `scripts/lockfiles.mjs` — regenerates the npm lockfiles (one per frontend × CSS combination) and `composer.lock`.
- `CHANGELOG.md` — what changed in every version.

Versions are the `vX.Y.Z` tags of this repository and never change once published.
