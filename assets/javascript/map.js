/* replace/merge the following with Jasmine's code */

//sample query URL to test getting data onto map
var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2017-08-01&endtime=2017-08-05&limit=10";

//var to hold the returned ajax
var eqArray = [];


//Stanley's code for google map
var map;
      
function initMap() {
  
  map = new google.maps.Map(document.getElementById('map'), {
    
    zoom: 3,
    center: new google.maps.LatLng(2.8,-187.3),
    mapTypeId: 'terrain',
    styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
        
    });

  function getCircle(magnitude) {
        return {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: '#fdd835',
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

      var contentString = "test";

      var infowindow = new google.maps.InfoWindow({
          content: contentString
        });



      var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        title: eqArray[i].properties.title,
        icon: getCircle(magnitude),
      });

      marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
    
    };

    

  });

      
}
