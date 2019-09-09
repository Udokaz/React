import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';

class App extends Component {

  render() {
    console.log("props", this.props)
    const { sub, loggedIn, component/*, exp, cid*/ } = this.props;
    return (
      <div className="App">
        <Header sub={sub} loggedIn={loggedIn} />
        <div className="App-body">
          {component}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
