import React, { Component } from 'react';
import '../App.css';

class ShoppingHomePage extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div>
				<p>this is the Shopping home page </p>
				<p>More stuff will be writen here.</p>
				{this.props.component}
			</div>
		);
	}
}

export default ShoppingHomePage;