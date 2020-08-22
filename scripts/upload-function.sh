#!/bin/bash

# AWS Lambda CLI command to upload an AWS Lambda function

aws lambda update-function-code \
  --function-name my-function \
  --zip-file fileb://my-function.zip
