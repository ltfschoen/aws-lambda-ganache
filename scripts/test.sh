#!/bin/bash

# Retrieve value of environment variable `AWS_ACCOUNT_ID` from .env file
. ./scripts/get-env.sh AWS_ACCOUNT_ID && \
  export AWS_ACCOUNT_ID=$my_var && \
  echo $AWS_ACCOUNT_ID 

# Retrieve value of environment variable `MY_NAME` from .env file
. ./scripts/get-env.sh MY_NAME && \
  export MY_NAME=$my_var && \
  echo $MY_NAME

# . ./scripts/get_env.sh FLAG && ls -$my_var # i.e. where FLAG="al" 
