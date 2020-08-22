#!/bin/bash

# Use this script in other Shell scripts to interpret
# and use the value of an environment variable's name that is provided as
# the first argument to this Shell script that is contained in a .env file
# by running the following, where in this example `my_var` is returned from
# this Shell script and AWS_ACCOUNT_ID is the environment variable name in
# the .env file whose value we want to use in a Shell script:
# ```
# . ./scripts/get-env.sh AWS_ACCOUNT_ID && \
#   export AWS_ACCOUNT_ID=$my_var && \
#   echo $AWS_ACCOUNT_ID
# ```
# Note: This script does not interpret equal signs in the value i.e. `VAR="12=34"`
VAR="$1"

read_var() {
  if [ -z "$1" ]; then
    echo "environment variable name is required"
    return
  fi

  local ENV_FILE='.env'
  # If user provides second argument to read_var use that file instead of .env
  if [ ! -z "$2" ]; then
    ENV_FILE="$2"
  fi

  local VAR=$(grep ^$1= "$ENV_FILE" | xargs)
  IFS="=" read -ra VAR <<< "$VAR"
  echo ${VAR[1]}
}

my_var=$(read_var $VAR ./.env)
# echo $my_var
