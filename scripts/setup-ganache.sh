#!/bin/bash

# Install Ganache
npm install ganache-cli -g
# Delete existing Ethereum blockchain DB of Ganache
rm -rf ./db
# Create DB folder
mkdir db && mkdir db/chain_database
# Start Ethereum blockchain protocol node simulation
# that will be served on http://localhost:8545
#
# Note that 0xce31EeD26ff009f1F5e38408571ea174c5d54f20 is Ethereum address
# of seed 0x209c205f333b5a65cc428589a51bd9f2621e2fc01de1b02dbf8c0f0b68e4974e
# and 0xe66628e37eFE36098c148d2a3B970074999E95C6 is Ethereum address
# of seed 0x0edb559026c8f779be17b4c9d8e4dfc14bead6592241de4d6612f77769327f7f
ganache-cli \
  --account="0x209c205f333b5a65cc428589a51bd9f2621e2fc01de1b02dbf8c0f0b68e4974e, 50471238800000000000" \
  --account="0x0edb559026c8f779be17b4c9d8e4dfc14bead6592241de4d6612f77769327f7f, 100471238800000000000" \
  --unlock "0x209c205f333b5a65cc428589a51bd9f2621e2fc01de1b02dbf8c0f0b68e4974e" \
  --unlock "0x0edb559026c8f779be17b4c9d8e4dfc14bead6592241de4d6612f77769327f7f" \
  --port 8545 \
  --hostname localhost \
  --seed '0x209c205f333b5a65cc428589a51bd9f2621e2fc01de1b02dbf8c0f0b68e4974e' \
  --debug true \
  --mem true \
  --mnemonic 'end sleep vote expire arctic magic crack wrap toddler lizard acoustic owner' \
  --db './db/chain_database' \
  --verbose \
  --networkId=3 \
  --gasLimit=7984452 \
  --gasPrice=20000000000;
