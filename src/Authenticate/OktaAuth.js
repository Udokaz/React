const OktaAuth = require('@okta/okta-auth-js');
const JSCookie = require('js-cookie');

export const authClient = new OktaAuth({
  //company: "dev-483373",
  pkce: true,
  issuer: 'https://dev-483373.okta.com/oauth2/default',
  clientId: '0oa1aajnpvUdF4cfr357',
  redirectUri: 'http://localhost:3000/login',
});

export const getTokenWithoutPrompt = (transaction = null) => {
    let sessionToken;
    if(transaction == null)
      sessionToken = JSCookie.get("user").sessionToken;
    else
      sessionToken = transaction;
    
    authClient.token.getWithoutPrompt({
      sessionToken: sessionToken,
      responseType: 'id_token'
    })
    .then( token => {
      console.log("token", token)
      JSCookie.set('user', token[0].accessToken)
    })
    .catch( err => {
      console.log("Error getting token", err)
    });
  }

export const userSignIn = (username, password) => {
  authClient.signIn({
    username: username,
    password: password
  })
  .then( transaction => {
    if(transaction.status === 'SUCCESS'){
      console.log("trans", transaction)
      getTokenWithoutPrompt(transaction.data.sessionToken);  
    } else {
      throw new Error("Cannot handle the " + transaction.status + ' status');
    }
  })
  .fail( err => {
    console.log("error: ", err);
  })
}

export const decodeJWT = () => {
  let jwt = JSCookie.get('user');
  console.log("jwt", jwt)
  if(jwt === undefined)
    return {};
  let base64Url = jwt.split('.')[1];
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

export const forgotMyPassword = user => {
  authClient.forgotPassword({
    username: user,
    factorType: 'EMAIL',
  })
  .fail( err => {
    console.error("Error with forgotMyPassword", err);
  });
}

export const logOut = () => {
  authClient.signOut()
  .then( () => {
    console.log("Successful log out")
  })
  .fail( err => {
    console.log("error logging out", err)
  });
  JSCookie.remove('user');
}

export const isExpired = (exp) => {
  let currentTime = Math.floor(new Date().getTime() / 1000);
  console.log("currentTime",currentTime);
  console.log("exp", exp)
  if(currentTime >= exp)
    return true;
  else
    return false;
}

export const inactivityTime = () => {
    let time;
    window.onload = resetTimer;
    // DOM Events
    document.onclick = resetTimer;
    document.onkeypress = resetTimer;

    function logout() {
      if(confirm("You have been ideal for 10 minutes. Press OK to exit! or press Cancel to stay logged in!"))
        logOut();
      else
        return;
    }

    function resetTimer() {
        clearTimeout(time);
        time = setTimeout(logout, 600000)//10 mins = 600000
    }
};