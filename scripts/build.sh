#!/bin/bash

echo '[*] Building with Rollup...'
rm -rf bin && \
    rollup --config rollup.config.js > /dev/null 2>&1

if [ $? -ne 0 ]; then
    echo '[!] Error building with Rollup.';
    exit 1;
fi