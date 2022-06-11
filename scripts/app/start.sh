#!/usr/bin/env bash

if [ -z "$NODE_ENV" ] || [ "$NODE_ENV" == "development" ]; then
  NODE_ENV=$NODE_ENV yarn start:dev
else
  NODE_ENV=$NODE_ENV yarn start
fi
