#!/bin/bash

echo "enter keystore passphrase"
read -s pass

ns build android --release --path ./src \
  --key-store-path ./build/calog.keystore \
  --key-store-password $pass \
  --key-store-alias calog \
  --key-store-alias-password $pass \
  --apk \
  --copy-to ./build/calog.apk
