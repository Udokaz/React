import { createBrowserHistory } from 'history';
export default createBrowserHistory();

// export transition = event => {
// 	event.preventDefault();
// 	history.push({
// 		pathname: event.currentTarget.pathname,      
// 		search: event.currentTarget.search,
// 	});
// };