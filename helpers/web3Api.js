// TODO - refactor into class with web3 singleton
async function isListening(web3) { 
  return await new Promise(resolve => {
    web3.eth.net.isListening()
      .then((res) => {
        console.log('Node is listening for peers: ', res);
        resolve(res);
      });
  });
}

async function getAccounts(web3) { 
  return await new Promise(resolve => {
    web3.eth.getAccounts()
      .then((res) => {
        console.log('Accounts: ', res);
        resolve(res);
      });
  });
}

async function networkId(web3) { 
  return await new Promise(resolve => {
    web3.eth.net.getId()
      .then((res) => {
        console.log('Network ID: ', res);
        resolve(res);
      });
  });
}

async function contractGet(web3, accounts, SimpleStorageContractInstance) {
  console.log('contractGet');
  return await new Promise((resolve, reject) => {
    SimpleStorageContractInstance.methods.get().call({from: accounts[0]}).then(function(result) {
      console.log("Transaction successful with response: ", JSON.stringify(result, null, 2));
      resolve(result);
    }).catch(function(e) {
      console.log("Error running SimpleStorage.sol function get: ", e);
      reject(e);
    })
  });
}

async function createContractInstance(web3, accounts) {
  return await new Promise((resolve, reject) => {
    if (err) return reject(err);
    const res = web3.eth.Contract(SimpleStorage.abi, contractAddress, {gasPrice: '12345678', from: accounts[0]});
    console.log('SimpleStorageContractInstance: ', res);
    resolve(res);
  });
}

module.exports = {
  contractGet,
  createContractInstance,
  getAccounts,
  isListening,
  networkId
}
