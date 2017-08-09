/* replace the following with Jasmine's code */

//sample query URL to test getting data onto map
var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2017-08-01&endtime=2017-08-05&limit=10";

//var to hold the returned ajax
var eqArray = [];


//Stanley's code for google map
var map;
      
function initMap() {
  
  map = new google.maps.Map(document.getElementById('map'), {
    
    zoom: 2,
    center: new google.maps.LatLng(2.8,-187.3),
    mapTypeId: 'terrain'
        
    });

  function getCircle(magnitude) {
        return {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: 'red',
          fillOpacity: .5,
          scale: Math.pow(2, magnitude) * 2,
          strokeColor: 'black',
          strokeWeight: .5
        };
      }

  //sample ajax to get the data from usgs appear on the map.
  //merge the code with jasmine's version
  $.ajax({

    url: queryUrl,
    method:"GET",


  }).done(function(response){

    //the following code needs to be adopted/merged with Jasmine's to ensure the proper earthquake display
    eqArray = response.features;
    console.log(eqArray);

    for (var i = 0; i < eqArray.length; i++) {
    
      var coords = eqArray[i].geometry.coordinates;
      var latLng = new google.maps.LatLng(coords[1],coords[0]);
      var magnitude = eqArray[i].properties.mag;

      var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        icon: getCircle(magnitude),
      });
    
    };

  });

      
}
