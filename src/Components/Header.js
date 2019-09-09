import React, { Component } from 'react';
import '../App.css';
import Grocery_Bag from '../Grocery_Bag.png';
import { transition } from '../HistoryTransition';
import { logOut } from '../Authenticate/OktaAuth'; 

class Header extends Component {

	h2Style = {
		color: "#091534"
	}

	render() {
		const { sub, loggedIn } = this.props;
		return (
			<div className="App-header">
	        	{sub ? <p>{sub}</p> : null}
	        	<div className="row">
	        	</div>
	        	<div className="row">
		        	<img src={Grocery_Bag} className="App-logo" alt="logo" />
		        	<h2 style={this.h2Style} >Apollo Shopping</h2>
	        		<a href="/" onClick={transition} className="col-l-1"><i className="fa fa-home"></i></a>
	        		{ loggedIn ? <a href="/shopping-list/" onClick={transition} className="col-l-2">Shopping List</a>
	        			: null }
	        		{
	        			loggedIn 
	        			? <a href="/" onClick={logOut} className="col-l-2">Log Out</a>
	        			: <a href="/login" onClick={transition} className="col-l-2">Login/Signup</a>
	        		}
	        	</div>
	        </div>
	    );
	}
}

export default Header;