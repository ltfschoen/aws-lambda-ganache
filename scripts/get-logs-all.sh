#!/bin/bash

# AWS Lambda CLI command to invoke an AWS Lambda function
# that returns a log stream (where the response includes a
# LogResult field that contains up to 4 KB of base64-encoded
# logs from the invocation) and then decode the logs using
# the `base64` command.

aws lambda invoke \
  --function-name my-function out \
  --log-type Tail \
  --query 'LogResult' \
  --output text | base64 -d
