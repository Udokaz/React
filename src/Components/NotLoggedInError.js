import React, { Component } from 'react';
import '../App.css';
import { transition } from '../HistoryTransition';

class NotLoggedInError extends Component {

	render() {
		return (
			<div>
				<p>You must be logged in to view this page. Please log in.</p>
	        	<a href="/login" onClick={transition} className="col-l-2">Login/Signup</a>
			</div>
	    );
	}
}
export default NotLoggedInError;