#!/bin/sh
set -eu

ENV_FILE="/app/.env"

if [ ! -f "$ENV_FILE" ]; then
  umask 077
  SECRET="$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")"
  printf "BUILDER_JWT_SECRET=%s\n" "$SECRET" > "$ENV_FILE"
  echo "Generated BUILDER_JWT_SECRET in $ENV_FILE"
elif ! grep -q '^BUILDER_JWT_SECRET=' "$ENV_FILE"; then
  umask 077
  SECRET="$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")"
  printf "\nBUILDER_JWT_SECRET=%s\n" "$SECRET" >> "$ENV_FILE"
  echo "Appended BUILDER_JWT_SECRET to $ENV_FILE"
fi

exec node server.js
