import history from './history';

export const transition = event => {    
	console.log("event", event.currentTarget.pathname)
	event.preventDefault();
	history.push({      
		pathname: event.currentTarget.pathname,      
		search: event.currentTarget.search    
	});  
};