# AWS Lambda Function with Ganache

Reference: https://gitcoin.co/issue/blockgeeks/BountyAnyERC20/3/100023523

## Goal

* Create an AWS Lambda Function (see https://console.aws.amazon.com/lambda) that generates a Node.js app and deploys any contract on Ganache and uses web3 or ethers to get any data from that contract.
* Call the AWS Lambda Function and run the code in response to a HTTP request using Amazon API Gateway or using API calls with the AWS SDK

* Note:
  * Each service that integrates with Lambda sends data to the function in JSON as an event. The structure of the event document is different for each event type, and contains data about the resource or request that triggered the function. Lambda runtimes convert the event into an object and pass it to your function. https://docs.aws.amazon.com/lambda/latest/dg/lambda-services.html. Create an event source mapping and grant Lambda permission to access the other service in the execution role https://docs.aws.amazon.com/lambda/latest/dg/lambda-intro-execution-role.html

## Setup AWS CLI

https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html

```
cd ~/Downloads
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg" && \
  sudo installer -pkg AWSCLIV2.pkg -target && \
  aws --version
```

## Setup AWS Credentials

Create new Access Key from https://console.aws.amazon.com/billing/home?#/account then click username and "My Security Credentials", then "Access keys (access key ID and secret access key)"

Set Access Keys

```
aws configure
```

Available regions to use include (e.g. `ap-southeast-2`): https://docs.aws.amazon.com/general/latest/gr/rande.html

Output formats include (e.g. `json`): https://docs.aws.amazon.com/cli/latest/userguide/cli-usage-output.html

## Add AWS Account ID to .env file

Obtain AWS Account ID from https://console.aws.amazon.com/billing/home?#/account then click username and "My Security Credentials", then "Account Identifiers"

Alternatively run `aws sts get-caller-identity`

## Create Execution Role

* Create Execution Role and add the AWSLambdaBasicExecutionRole policy since it has the permissions that the function needs to write logs to CloudWatch Logs.
```
aws iam create-role --role-name lambda-ex --assume-role-policy-document file://trust-policy.json
aws iam attach-role-policy --role-name lambda-ex --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
```

## Create Deployment Package of AWS Lambda Function with Dependencies

Check that Node.js version in local environment matches the Node.js version
of the AWS Lambda function.

Switch to Node.js v10.x

Install libraries into the node_modules/ directory
```
npm install;
```

Create zip file containing contents of project folder
```
zip -r my-function.zip .
```

```
./scripts/create-function.sh
```

## Run AWS Lambda Function Locally

```
node index.js
```

## View Logs

```
./scripts/get-logs-all.sh
./scripts/get-logs-last5.sh
```

## References

https://docs.aws.amazon.com/lambda/latest/dg/welcome.html
https://docs.aws.amazon.com/lambda/latest/dg/getting-started.html
https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-awscli.html
https://docs.aws.amazon.com/lambda/latest/dg/lambda-nodejs.html
https://docs.aws.amazon.com/lambda/latest/dg/nodejs-package.html
