import "./App.css";
import React from "react";
import web3 from './web3';
import lottery from './lottery';

class App extends React.Component {
 state = {
   manger: '',
   players: [],
   balance: '',
   value:'',
   message:''
 };

  async componentDidMount(){
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
   this.setState({manager,players,balance});
  }

  onSubmit = async(event) =>{
    event.preventDefault();
    this.setState({message : 'Waiting on trasaction'});
    const accounts = await web3.eth.getAccounts();
    try{
      await lottery.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value,'ether')
      });
      this.setState({message : 'Trasaction sucess'});
    }
    catch(err){
      this.setState({message : 'Trasaction Failed'});
    }
  };

  onClick = async()=>{
    const accounts = await web3.eth.getAccounts();
    this.setState({message : 'Waiting on trasaction'});
    try{
      await lottery.methods.pickWinner().send({
        from:accounts[0]
      });
      this.setState({message : "Trasaction sucess check you Balance to see if it's you !!!!!!"});
    }
    catch(err){
      this.setState({message : 'Trasaction Failed'});
    }

  }

  render() {
    console.log(web3.version);
    return (
      <div className="App">
        <h2>Lottery App</h2>
        <p>This contract is managed by {this.state.manager}</p>
        <p>There are currently {this.state.players.length} players in the pool</p>
        <p>with a prize of {web3.utils.fromWei(this.state.balance,'ether')} ether</p>
        <hr/>
        <form onSubmit={this.onSubmit}>
          <h4>
            Want to try your luck?
          </h4>
          <div>
           <label>Amount to enter</label> 
           <input 
            value = {this.state.value}
            onChange = {event=>this.setState({value:event.target.value})}
           />
          </div>
          <button>Enter</button>
        </form>
        <hr/>
        <h1>{this.state.message}</h1>
        <hr/>
        <h4>Ready to pick a winner?</h4>
        <button onClick={this.onClick}>Pick winner</button>
        <hr/>
      </div>
    );
  }
}
export default App;
