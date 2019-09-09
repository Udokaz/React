import React, { Component } from 'react';
import '../App.css';
import { transition } from '../HistoryTransition';
import { userSignIn, forgotMyPassword, logOut } from '../Authenticate/OktaAuth';
import history from '../history';

class Login extends Component {

	constructor(props){
		super(props);
		this.state = { 
			userName: "",
			userSignin: "",
			userNameEmpty: false,
			forgotPasswordActive: false,
		};
		this.handleChange = this.handleChange.bind(this);
		this.login = this.login.bind(this);
	}

	handleChange(event) {
		let target = event.target
		let value = target.value;
	    const name = target.name;
		this.setState({[name]: value});
	}

	login = () => {
		userSignIn(this.state.userName, this.state.userSignin);
		this.setState({userSignin: ""});
		history.push({ pathname: "/" }); 
	}

	forgotPassword = () => {
		if(this.state.userName === "")
			this.setState({userNameEmpty: true});
		else{
			this.setState({userNameEmpty: false, forgotPasswordActive: true});
			forgotMyPassword(this.state.userName);
		}
	}

	render() {
		if(this.props.loggedIn){
			return (
				<div>
					<p>You are already logged in.</p>
					<button type="submit" onClick={logOut}>Log Out</button>
				</div>
			);
		}else{
			return (
				<div className="text-align-center">
		      		<a href="/login" onClick={transition} className="col-l-2">Join Today!</a>
		      		<p>
		      			Already have an account? <br />
		      			mu$tasUngMess3r
		      		</p>
	      			<form>
		      			Sign in with us: <br />
		      			Username: 
		      			<input id="userName" type="text" name="userName" onChange={this.handleChange} ></input>
		      			<br /> Password: 
		      			<input id="userSignin" type="password" name="userSignin" onChange={this.handleChange}></input>
	      				{this.state.userNameEmpty ? <p>User Cannot Be Empty</p> : null}
	      				{this.state.forgotPasswordActive ? <p>If {this.state.userName} is a valid email, an will be sent to reset your password. </p> : null}
	      			</form>
	      			<button type="submit" onClick={this.login}>Log In</button>
	      			<button type="submit" onClick={this.forgotPassword}>Forgot Password</button>
		        </div>
		    );
		}
	}

}

export default Login;