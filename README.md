# React
Grocery List in Reactjs

This ReactJS app uses History and Universal Router to allow the user to change to a different page, such as creating a new item.

It allows a user to add an item to a list, edit the item, have the item be in either a "Shopping List" or a "Avalible List". 

It uses API's to make calls to a Java Spring resource server.

Okta is used as the authorization and authentication server. Once the user logged into the app a JWT token is sent from Okta. This JWT token is then used in the authorization head of the API calls to the back-end.

