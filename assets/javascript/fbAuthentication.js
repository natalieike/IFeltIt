//Facebook SDK examples from:  https://developers.facebook.com/docs/facebook-login/web/

//From Facebook SDK: Checks the login state
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

//Function to determine status of login
function statusChangeCallback(response){

};


