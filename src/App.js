import "./App.css";
import React from "react";
import web3 from './web3';
import lottery from './lottery';

class App extends React.Component {
 state = {
   manger: '',
   players: '',
   balance: '',
 };

  async componentDidMount(){
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
   this.setState({manager,players,balance});
  }

  render() {
    console.log(web3.version);
    return (
      <div className="App">
        <h2>Lottery App</h2>
        <p>This contract is managed by {this.state.manager}</p>
        <p>There are currently {this.state.players.length} players in the pool</p>
        <p>with a prize of {web3.utils.fromWei(this.state.balance,'ether')} ether</p>
      </div>
    );
  }
}
export default App;
