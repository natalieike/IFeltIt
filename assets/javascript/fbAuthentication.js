//Facebook SDK examples from:  https://developers.facebook.com/docs/facebook-login/web/
	// This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
    } else {
      // The person is not logged into your app or we are unable to tell.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    }
  }

  /* This function is called when someone finishes with the Login
  Button.  See the onlogin handler attached to it in the sample
  code below. */
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '159013001329609',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.8' // use graph api version 2.8
  });

  /* This function gets the state of the person visiting this page and can return one of three states to the callback function.  They can be:
  
  1. Logged into the app ('connected')
  2. Logged into Facebook, but not the app ('not_authorized')
  3. Not logged into Facebook and can't tell if they are logged into
  the app or not.

	These three cases are handled in the callback function. */

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  };

  /* Here we run a very simple test of the Graph API after login is
  successful.  See statusChangeCallback() for when this call is made. */
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }