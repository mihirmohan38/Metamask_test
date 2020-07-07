import React from 'react';
import './App.css';
import FormInp from "./FormInp" ; 
import Web3 from "web3" ; 



//import detectEthereumProvider from '@metamask/detect-provider';

//const Web3 = require('web3');
class App extends React.Component{
  constructor(){
    super(); 
    //var web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");
    this.state = {  
      user : 'Placeholder',
      transactionParameters : {
        nonce: '0x00', // ignored by MetaMask
        gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
        gas: '0x2710', // customizable by user during MetaMask confirmation.
        to: '0x0000000000000000000000000000000000000000', // Required except during contract publications.
        from: window.ethereum.selectedAddress, // must match user's active address.
        value: '0x00', // Only required to send ether to the recipient from the initiating external account.
        data:
          '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
        chainId: 3, // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
      },
      //web3 :  new Web3(Web3.givenProvider || "ws://localhost:3000"), 
    }
  }

  isMetaMaskInstalled = () => {
    return Boolean(window.ethereum && window.ethereum.isMetaMask)
  }

  //isMetaMaskConnected = () => window.accounts && window.accounts.length > 0

  login = async() => {
    //connect to metamask and return user ID
    this.setState({user: "XXXXXX"}) ; 
    try {
      await window.ethereum.enable()
      //const accounts = await Web3.eth.getAccounts();
      //console.log(accounts)
    } catch (error) {
      console.error(error)
    }
      this.setState({user : "address : " + window.ethereum.selectedAddress})
      console.log(window.ethereum)
      //let piggybankContract = Web3.eth.contract([{ 'constant': false, 'inputs': [{ 'name': 'withdrawAmount', 'type': 'uint256' }], 'name': 'withdraw', 'outputs': [{ 'name': 'remainingBal', 'type': 'uint256' }], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'owner', 'outputs': [{ 'name': '', 'type': 'address' }], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': false, 'inputs': [], 'name': 'deposit', 'outputs': [{ 'name': '', 'type': 'uint256' }], 'payable': true, 'stateMutability': 'payable', 'type': 'function' }, { 'inputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'constructor' }])
      //console.log(piggybankContract)
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
      }
      
      console.log(window.web3.eth)
  }

  send = async(event, toAddress, amount, currency) => {
    //send money interface
    event.preventDefault();
    console.log("sending to address", toAddress, currency , amount)
    let tp = this.state.transactionParameters ; 
    tp.to = toAddress ; 
    tp.value = String.toString(amount) ; 
    console.log(tp)


    window.web3.eth.sendTransaction({
      from: window.ethereum.selectedAddress,
      to: toAddress,
      value: Number(amount)*1000000000000000000
  })
  .then(function(receipt){
      // add then here
      console.log(receipt)
  });
    //this.setState({transactionParameters : tp}) ; 
     
    // const txHash = await window.ethereum.request({
    //   method: 'eth_sendTransaction',
    //   params: [tp],
    // });
  }

  receive = () => {
    //receive money interface

  }





  render(){
    
    return(
      <div className="user">
        <text className="user">{this.state.user}</text>
        <text style={{paddingLeft:40}}></text>
        <button  onClick={this.login}>Connect to Metamask</button>
        <div style={{paddingTop:40, paddingLeft:140}}><FormInp className="user" onSubmit={this.send}></FormInp></div>

        
      </div>
    ); 
  }
}

export default App;
