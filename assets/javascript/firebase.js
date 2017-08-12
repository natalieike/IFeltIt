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

//Send all new earthquakes to Firebase
function sendNewEqs(){
	for var(i = 0; i < arr.length; i++){
		var title = arr[i].properties.title;
		database.ref(title).once('value').then(function(snapshot) {
			if(snapshot.val() === null){
				database.ref().push({
					
				})
			}
		});
	}
}

/*

//Click Handler for I Felt It button
$("#feltIt").click(function(event){
	var title = $("#cardTitle").text();
	var time = $("#eq-time").text();
	var location = $("#eq-location").text();
	var magnitude = $("#eq-magnitude").text();
	var depth = $("#eq-depth").text();

	database.ref(title).push({
		time: time,
		location: location,
		magnitude: magnitude,
		depth: depth
	});

});

*/