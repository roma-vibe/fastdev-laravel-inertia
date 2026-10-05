#!/bin/sh
# Start of the production container: cache the configuration for this environment, apply pending
# migrations, then run the server (the image's CMD).
set -e

php artisan optimize --no-interaction
php artisan migrate --force --no-interaction

exec "$@"
