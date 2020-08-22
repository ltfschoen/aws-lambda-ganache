#!/bin/bash

# Compile, Migrate, Deploy, and Retrieve data from contract
truffle compile --network development
truffle migrate --network development
truffle exec ./scripts/deployContract.js --network development

# Watch for changes to contracts, app and config files. Rebuild app upon changes.
truffle watch
