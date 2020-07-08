import React from 'react';
import './App.css';
import FormInp from "./FormInp" ; 
import Web3 from "web3" ; 


class App extends React.Component{
  constructor(){
    super(); 
    //var web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");
    this.state = {  
      user : 'Placeholder',
    }
  }

  isMetaMaskInstalled = () => {
    return Boolean(window.ethereum && window.ethereum.isMetaMask)
  }

  //isMetaMaskConnected = () => window.accounts && window.accounts.length > 0
  isWalletConnected =() => window.ethereum.selectedAddress !== null ; 

  login = async() => {
    //connect to metamask and return user ID
    if (!this.isMetaMaskInstalled){
      window.alert("please install metamask") ; 

      return 
    }

    this.setState({user: "XXXXXX"}) ; 
    try {
      await window.ethereum.enable()
      this.setState({user : "address : " + window.ethereum.selectedAddress})
      console.log(window.ethereum)

      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
      }

    } catch (error) {
      console.error(error)
      window.alert("meta mask is not connected or not installed, please try again.")
    }

      
      //console.log(window.web3.eth)
  }

  send = async(event, toAddress, amount, currency) => {
    //send money interface
    event.preventDefault();

    if (!(this.isMetaMaskInstalled() && this.isWalletConnected())) {
      window.alert("please login through metamask.") ; 
      return 
    }
    console.log("sending to address", toAddress, currency , amount)
    // let tp = this.state.transactionParameters ; 
    // tp.to = toAddress ; 
    // tp.value = String.toString(amount) ; 
    // console.log(tp)
    try {
      window.web3.eth.sendTransaction({
        from: window.ethereum.selectedAddress,
        to: toAddress,
        value: Number(amount)*1000000000000000000
    })
    .then(function(receipt){
        // add then here
        console.log(receipt)
    });
    }catch{
      window.alert("please use valid senders ID")
    }
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
