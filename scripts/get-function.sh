#!/bin/bash

# AWS Lambda CLI command to retrieve a specific AWS Lambda function
# from your account with its metadata and a presigned URL that you can
# use to download the function's deployment package.

aws lambda get-function --function-name my-function
