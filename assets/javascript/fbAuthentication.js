//Facebook SDK examples from:  https://developers.facebook.com/docs/facebook-login/web/

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  if (response.status === 'connected') {
  // Logged into the app and Facebook.
    testAPI();
  } else {
  // The person is not logged into the app or we are unable to tell.
    document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
  //If not signed on via facebook, sign into Firebase anonymously to be able to record data
    firebase.auth().signInAnonymously().catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + ": " + errorMessage);
    });
  }  
};

/* This function gets the state of the person visiting this page and can return one of three states to the callback function.  They can be:
  1. Logged into the app ('connected')
  2. Logged into Facebook, but not the app ('not_authorized')
  3. Not logged into Facebook and can't tell if they are logged into
  the app or not.
These three cases are handled in the callback function. */
window.fbAsyncInit = function() {
  FB.init({
    appId      : '159013001329609',
    cookie     : true,  // enable cookies to allow the server to access the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.8' // use graph api version 2.8
  });
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
  FB.Event.subscribe('auth.authResponseChange', checkLoginState);
};

/* Here we run a very simple test of the Graph API after login is
  successful.  See statusChangeCallback() for when this call is made. */  
function testAPI() {
  FB.api('/me', function(response) {
    document.getElementById('status').innerHTML = 'Thanks for logging in, ' + response.name + '!';
  });
};

//Function to check Firebase login status and reconcile with Facebook login status.  From Firebase documentation.
function checkLoginState(event) {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
  if (event.authResponse) {
  // User is signed-in to Facebook.
    var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!isUserEqual(event.authResponse, firebaseUser)) {
        // Build Firebase credential with the Facebook auth token.
        var credential = firebase.auth.FacebookAuthProvider.credential(
            event.authResponse.accessToken);
        // Sign in with the credential from the Facebook user.
        firebase.auth().signInWithCredential(credential).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message; 
          var credential = error.credential;  // The firebase.auth.AuthCredential type that was used.
          console.log(errorCode);
          console.log(errorMessage);
          console.log(credential);
        });
      } 
    });
  } else {
    // User is signed-out of Facebook.
    firebase.auth().signOut();
    console.log("Goodbye");
    firebase.auth().signInAnonymously().catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + ": " + errorMessage);
    });
  }
};

//Checks to see if the user is already signed in to Firebase.  From Firebase documentation.
function isUserEqual(facebookAuthResponse, firebaseUser) {
  if (firebaseUser) {
    var providerData = firebaseUser.providerData;
    for (var i = 0; i < providerData.length; i++) {
      if (providerData[i].providerId === firebase.auth.FacebookAuthProvider.PROVIDER_ID &&
          providerData[i].uid === facebookAuthResponse.userID) {
        return true;
      }
    }
  }
  return false;
};

//Signs in as anonymous user to start.
firebase.auth().signInAnonymously().catch(function(error) {
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(errorCode + ": " + errorMessage);
});