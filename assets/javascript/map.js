if (navigator.geolocation) {

  console.log("geolocation support");

} else {

  console.log("oh no!");

};

var lat;
var lng;

window.onload = function() {
  var startPos;
  var geoSuccess = function(position) {
    startPos = position;
    //console.log(startPos.coords.latitude);
    //console.log(startPos.coords.longitude);
    lat = startPos.coords.latitude;
    lng = startPos.coords.longitude;

      var latLng = new google.maps.LatLng(startPos.coords.latitude,startPos.coords.longitude);
      var marker = new google.maps.Marker({
        position: latLng,
        map: map
      });

  };
  navigator.geolocation.getCurrentPosition(geoSuccess);
};


var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2017-08-01&endtime=2017-08-05&limit=10";
var idMap = $('#map').html();
console.log(document.getElementById('map'));
console.log(idMap);
var eqArray = [];

var map;
      
function initMap() {
  
  map = new google.maps.Map(document.getElementById('map'), {
    
    zoom: 2,
    center: new google.maps.LatLng(2.8,-187.3),
    mapTypeId: 'terrain'
        
    });

  // Create a <script> tag and set the USGS URL as the source.
 // var script = document.createElement('script');
  
  // This example uses a local copy of the GeoJSON stored at
  // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
  //script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
  
  //document.getElementsByTagName('head')[0].appendChild(script);

  $.ajax({

    url: queryUrl,
    method:"GET",


  }).done(function(response){

    //console.log(response);
    eqArray = response.features;
    console.log(eqArray);

    for (var i = 0; i < eqArray.length; i++) {
    
      var coords = eqArray[i].geometry.coordinates;
      var latLng = new google.maps.LatLng(coords[1],coords[0]);
      var marker = new google.maps.Marker({
        position: latLng,
        map: map
      });
    
    };

    


  })

      
  }

  // Loop through the results array and place a marker for each
  // set of coordinates.
  /*
  window.eqfeed_callback = function(results) {
        
    for (var i = 0; i < results.features.length; i++) {
    
      var coords = results.features[i].geometry.coordinates;
      var latLng = new google.maps.LatLng(coords[1],coords[0]);
      var marker = new google.maps.Marker({
        position: latLng,
        map: map
      });
    
    }
  
  }
*/