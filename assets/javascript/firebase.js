// Initialize Firebase
var config = {
    apiKey: "AIzaSyAYJEs1lKNyyY3F4DmNECBFKuUek-F4-FI",
    authDomain: "ifeltit-9ad52.firebaseapp.com",
    databaseURL: "https://ifeltit-9ad52.firebaseio.com",
    projectId: "ifeltit-9ad52",
    storageBucket: "ifeltit-9ad52.appspot.com",
    messagingSenderId: "855093901815"
  };
  firebase.initializeApp(config);

var database = firebase.database(); //pointer to firebase database

//Decision function to push the user data either straight to the earthquake node or create the node and push the user data to it
function pushUserDataToDb(earthquakeKey, coordinates){
	var pushResult = tryToPushToCorrectNode(earthquakeKey, coordinates);
	if (pushResult === true){
		return;
	}
	else{
		console.log(pushResult);
	}
};

//Attempts to push straight to the earthquake node
function tryToPushToCorrectNode (earthquakeKey, coordinates){
	try {
		database.ref(earthquakeKey).push({
			user: currentUser
		});
		database.ref(userId).push({
			latitude: coordinates[0],
			longitude: coordinates[1]
		});
		return true;	
	}
	catch(err){
		return err.message;
	}
};



//Click Handler for I Felt It button
$("#feltIt").click(function(event){
	var eqKey = "lat" + Math.round(detail.geometry.coordinates[1]) + "long" + Math.round(detail.geometry.coordinates[0]) + "time" + detail.properties.time;
	//var location = getGeolocation();
	var location = [0, 0];
	pushUserDataToDb(eqKey, location);
});

