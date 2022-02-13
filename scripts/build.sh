#!/bin/bash

echo '[*] Building with Rollup...'
rm -rf bin && \
    rollup --silent --config rollup.config.js

if [ $? -ne 0 ]; then
    echo '[!] Error building with Rollup.';
    exit 1;
fi