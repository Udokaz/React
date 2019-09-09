import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from './history';
import router from './routes';
import App from './App.js';
import PageNotFound from './Components/PageNotFound.js';
import { decodeJWT, isExpired, getTokenWithoutPrompt } from './Authenticate/OktaAuth';
const history = createBrowserHistory;
const location = history.location;

function render(location){
	let loggedIn = false;
	const { sub, exp, cid } = decodeJWT();
	if(sub !== undefined && exp !== undefined && cid !== undefined){
		if(!isExpired(exp))
			loggedIn = true;
		else
			getTokenWithoutPrompt()
	}else
		loggedIn = false;

	router.resolve({
		pathname: location.pathname,
		loggedIn: loggedIn,
	}).then( 
		component => {
			ReactDOM.render( 
				<App 
					component={component} 
					sub={sub}
					exp={exp}
					cid={cid}
					loggedIn={loggedIn}
				/>, 
				document.getElementById('root')
			)
		}
	).catch(
		error => {
			if(error.message === 'Route not found'){
				ReactDOM.render(
					<PageNotFound />,
					document.getElementById('root')
				)
			} else {
				console.log(error)
			}
		}
	);
}

render(location);
history.listen(render);