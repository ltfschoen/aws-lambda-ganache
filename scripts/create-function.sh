#!/bin/bash

# Run `export AWS_ACCOUNT_ID="123" ./scripts/create-function.sh`

# AWS Lambda CLI command to create an AWS Lambda function

. ./scripts/get-env.sh AWS_ACCOUNT_ID && \
  export AWS_ACCOUNT_ID=$my_var && \
  echo $AWS_ACCOUNT_ID

aws lambda create-function \
  --function-name my-function \
  --zip-file fileb://my-function.zip \
  --handler index.handler \
  --runtime nodejs12.x \
  --role arn:aws:iam::$(AWS_ACCOUNT_ID):role/lambda-ex
