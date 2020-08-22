#!/bin/bash

# AWS Lambda CLI command to invoke an AWS Lambda function
# that returns a log stream and then download the last five
# log events every 15 seconds. It uses `sed` to remove quotes
# from the output file,

aws lambda invoke \
  --function-name my-function \
  --payload '{"key": "value"}' out

sed -i'' -e 's/"//g' out

sleep 15

aws logs get-log-events \
  --log-group-name /aws/lambda/my-function \
  --log-stream-name $(cat out) \
  --limit 5
