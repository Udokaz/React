import React, { Component } from 'react';
import '../App.css';
import Grocery_Bag from '../Grocery_Bag.png';
import transition from '../HistoryTransition';

class Header extends Component {

	render() {
		return (
			<div className="App-header">
	        	<h2>Apollo Shopping List</h2>
	        	<img src={Grocery_Bag} className="App-logo" alt="logo" />
	        	<div className="row">
	        		<a href="/" onClick={transition} className="col-l-1"><i className="fa fa-home"></i></a>
	        		<a href="/shopping-list/" onClick={transition} className="col-l-2">Shopping List</a>
	        	</div>
	        </div>
	    );
	}
}

export default Header;