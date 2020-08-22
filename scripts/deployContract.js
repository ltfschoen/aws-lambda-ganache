// https://www.trufflesuite.com/docs/truffle/getting-started/writing-external-scripts#file-structure
module.exports = async function(callback) {
  const Web3 = require('web3');
  const contract = require("truffle-contract");
  const { contractGet, createContractInstance, getAccounts,
    isListening, networkId } = require('../helpers/web3Api');
  const artifacts = require('../build/contracts/SimpleStorage.json');
  const WS_PROVIDER_ENDPOINT = "ws://127.0.0.1:8545";
  const SimpleStorage = contract(artifacts);
  const provider = Web3.givenProvider || new Web3.providers.WebsocketProvider(WS_PROVIDER_ENDPOINT);
  const web3 = new Web3(provider);

  console.log('Loading...');
  const SimpleStorageContractInstance = await SimpleStorage.deployed();
  console.log(`SimpleStorage Address: ${SimpleStorageContractInstance.address}`);
  const contractAddress = SimpleStorageContractInstance.address;

  isListening(web3);
  getAccounts(web3).then((accounts) => {
    let SimpleStorageContractInstance;

    SimpleStorage.setProvider(provider);
    // SimpleStorage.setProvider(web3.eth.currentProvider);
    // console.log('SimpleStorage: ', SimpleStorage);
    // console.log('SimpleStorage.deployed()', SimpleStorage.at(contractAddress))
    // SimpleStorage.deployed().then(function(instance) {

    networkId(web3);

    // console.log('web3.eth.Contract', web3.eth.Contract)
    // console.log('contractAddress', contractAddress)
    // console.log('SimpleStorage.address', SimpleStorage.address)

    // Load the contract schema from the abi
    // const SimpleStorageContract = new web3.eth.Contract(SimpleStorage.abi, SimpleStorage.address, {gasPrice: '12345678', from: account_one});
    // FIXME - this is not responding
    SimpleStorageContractInstance = createContractInstance(web3, accounts);
    console.log('SimpleStorageContract', SimpleStorageContract)
    SimpleStorageContractInstance.setProvider(provider);
    // Call contract function to retrieve data
    contractGet(web3, accounts, SimpleStorageContractInstance);
  });
}
