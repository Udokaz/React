import React, { Component } from 'react';
import { logOut } from './Authenticate/OktaAuth';

class Popout extends Component {

	render() {
		const opacityDiv = {
			background: "#c6c6c6b9",
		    position: "fixed",
		    width: "100%",
		    height: "100%",
		    top: "0px",
		    left: '0px',
		    zIndex:1000,
		}

		const popout = {
			opacity:"1",
			width: "200px",
			height: "150px",
			margin: "0 auto",
			backgroundColor: "red",
			position: "relative",
			top: "50%",
			transform: "translateY(-50%)",
			padding: "10px",
		}

		return (
			<div style={opacityDiv}>
	        	<div style={popout}>
	        		<p>{message}</p>
	        		<button></button>
	        		<button>Exit</button>
	        	</div>
	        </div>
	    );
	}
}

export default Popout;