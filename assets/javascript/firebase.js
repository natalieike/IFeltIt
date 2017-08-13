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
var childCallback; //Stores the reference to the .on child_added callback, so it can be removed later

//Calculates the database key for a specific earthquake
function calculateEqKey(){
	var key = "lat" + Math.round(detail.geometry.coordinates[1]) + "long" + Math.round(detail.geometry.coordinates[0]) + "time" + detail.properties.time;
	return key;
}

//Decision function to push the user data either straight to the earthquake node (if it exists) or create the node and push the user data to it
function pushUserDataToDb(coordinates){
	var eqKey = calculateEqKey();
	var pushResult = tryToPushToCorrectNode(eqKey, coordinates);
	if (pushResult === true){
		console.log("User Data in Db");
		return;
	}
	else if (pushResult == "Reference.push failed: first argument contains undefined in property '" + earthquakeKey + "'"){
		console.log("creating earthquake in Db");
		database.ref().child(earthquakeKey).push({
			latitude: coordinates[0],
			longitude: coordinates[1]
		});
	}
	else{
		console.log(pushResult);
	}
};

//Attempts to push straight to the earthquake node.  If it fails, an error message is returned
function tryToPushToCorrectNode (earthquakeKey, coordinates){
	try {
		console.log("earthquakeKey: " + earthquakeKey);
		console.log("currentUser: " + currentUser);
		console.log("coordinates: " + coordinates);
		database.ref(earthquakeKey).push({
			latitude: coordinates[0],
			longitude: coordinates[1]
		});
		return true;	
	}
	catch(err){
		return err.message;
	}
};

//Function to attach a data handler to the selected earthquake. New I Felt It data points will be plotted to the map.
function watchForNewData(){
	var eqkey = calculateEqKey();
	childCallback = database.ref(eqkey).on('child_added', function(snapshot){
		console.log("watching for new data");
		console.log(snapshot.val());
	});
};

//Function to detach a data handler when the user navigates away from an earthquake
function quitWatchingThisEarthquake(){
	var eqkey = calculateEqKey();
	console.log("quit watching for new data");
	database.ref(eqkey).off('child_added', childCallback);
};

//Click Handler for I Felt It button
$("#feltIt").click(function(event){
	var location = getGeolocation();
	console.log(location);
});

