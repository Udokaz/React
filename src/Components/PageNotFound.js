import React, { Component } from 'react';
import '../App.css';
import { transition } from '../HistoryTransition';

class PageNotFound extends Component {

	render() {
		return (
			<div>
				<h2>Page Not Found</h2>
				<p>We are sorry. The page you were looking for does not exist.</p>
	        	<a href="/" onClick={transition} className="col-l-1">Home</a>
	        </div>
	    );
	}
}

export default PageNotFound;