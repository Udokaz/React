import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from './history';
import router from './routes';
import App from './App.js';

const history = createBrowserHistory;
const location = history.location;

function render(location){
	router.resolve(location)
		.then( component => {
			ReactDOM.render( <App component={component} />, document.getElementById('root'))
		})
		.catch(error => 
			console.log("Unable to load component", error)
		);
}

render(location);
history.listen(render);