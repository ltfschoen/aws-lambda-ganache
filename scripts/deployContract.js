// https://www.trufflesuite.com/docs/truffle/getting-started/writing-external-scripts#file-structure
module.exports = async function(callback) {
  const Web3 = require('web3');
  const contract = require("truffle-contract");
  const artifacts = require('../build/contracts/SimpleStorage.json');
  const WS_PROVIDER_ENDPOINT = "ws://127.0.0.1:8545";
  const SimpleStorage = contract(artifacts);
  const provider = Web3.givenProvider || new Web3.providers.WebsocketProvider(WS_PROVIDER_ENDPOINT);
  const web3 = new Web3(provider);

  console.log('Loading...');
  const SimpleStorageContractInstance = await SimpleStorage.deployed();
  console.log(`SimpleStorage Address: ${SimpleStorageContractInstance.address}`);
  const contractAddress = SimpleStorageContractInstance.address;

  // TODO - move into utility
  async function isListening() { 
    return await new Promise(resolve => {
      web3.eth.net.isListening()
        .then((res) => {
          console.log('Node is listening for peers: ', res);
          resolve(res);
        });
    });
  }

  async function getAccounts() { 
    return await new Promise(resolve => {
      web3.eth.getAccounts()
        .then((res) => {
          console.log('Accounts: ', res);
          resolve(res);
        });
    });
  }

  async function networkId() { 
    return await new Promise(resolve => {
      web3.eth.net.getId()
        .then((res) => {
          console.log('Network ID: ', res);
          resolve(res);
        });
    });
  }

  async function contractGet(accounts, SimpleStorageContractInstance) {
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

  async function createContractInstance(accounts) {
    return await new Promise((resolve, reject) => {
      if (err) return reject(err);
      const res = web3.eth.Contract(SimpleStorage.abi, contractAddress, {gasPrice: '12345678', from: accounts[0]});
      console.log('SimpleStorageContractInstance: ', res);
      resolve(res);
    });
  }

  isListening();
  getAccounts().then((accounts) => {
    let SimpleStorageContractInstance;

    SimpleStorage.setProvider(provider);
    // SimpleStorage.setProvider(web3.eth.currentProvider);
    // console.log('SimpleStorage: ', SimpleStorage);
    // console.log('SimpleStorage.deployed()', SimpleStorage.at(contractAddress))
    // SimpleStorage.deployed().then(function(instance) {

    networkId();

    // console.log('web3.eth.Contract', web3.eth.Contract)
    // console.log('contractAddress', contractAddress)
    // console.log('SimpleStorage.address', SimpleStorage.address)

    // Load the contract schema from the abi
    // const SimpleStorageContract = new web3.eth.Contract(SimpleStorage.abi, SimpleStorage.address, {gasPrice: '12345678', from: account_one});
    // FIXME - this is not responding
    SimpleStorageContractInstance = createContractInstance(accounts);
    console.log('SimpleStorageContract', SimpleStorageContract)
    SimpleStorageContractInstance.setProvider(provider);
    // Call contract function to retrieve data
    contractGet(accounts, SimpleStorageContractInstance);
  });
}