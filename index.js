// const AWSXRay = require('aws-xray-sdk-core');
// const AWS = AWSXRay.captureAWS(require('aws-sdk'));
// const fs = require('fs').promises;
// const crypto = require('crypto');
// const dir = process.env.mountPath;

const { execute } = require('../helpers/execute');

// // Create client outside of handler to reuse
// const lambda = new AWS.Lambda();

/**
 * AWS Lambda Function example that logs the values of environment
 * variables and the event object.
 * 
 * Then it uses Amazon EFS file system in a Amazon VPC with mount targets
 * and access point configured for use with AWS Lambda.
 */
exports.handler = async function(event, context) {
  event.Records.forEach(record => {
    console.log("Record: ", record.body);
  })
  console.log('## ENVIRONMENT VARIABLES: ' + serialize(process.env));
  console.log('## CONTEXT: ' + serialize(context));
  console.log('## EVENT: ' + serialize(event));
  console.log("Log Stream Name: ", context.logStreamName);

  setupGanache();

  return true;
}

// Use SDK client
const setupGanache = async function() {
  // Setup Ganache
  execute(`. ./scripts/setup-ganache.sh`);
  // Setup Contract using Truffle
  execute(`. ./scripts/setup-contract.sh`);

  return true;
  // return lambda.getAccountSettings().promise()
}

const serialize = function(object) {
  return JSON.stringify(object, null, 2)
}
