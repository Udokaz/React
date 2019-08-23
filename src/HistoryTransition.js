import history from './history';

export const transition = event => {    
	event.preventDefault();
	history.push({      
		pathname: event.currentTarget.pathname,      
		search: event.currentTarget.search    
	});  
};