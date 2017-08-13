/* replace/merge the following with Jasmine's code */

//sample query URL to test getting data onto map
//var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=10&offset=1"

//"https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2017-08-01&endtime=2017-08-05&limit=10";

//var to hold the returned ajax
//var eqArray = [];

//request geolocation
function getGeolocation() {

  if (navigator.geolocation != null) {
  /* geolocation is available */
    console.log("geo yes!");

    var positionArray = [];

    navigator.geolocation.getCurrentPosition(function(position){
      console.log("in function");

      var lat = position.coords.latitude;
      var lng = position.coords.longitude;

      console.log("lat is:" + position.coords.latitude);
      console.log("lat is:" + position.coords.longitude);

      positionArray.push(lat);
      positionArray.push(lng);

      pushUserDataToDb(positionArray);


    }, function(error){
      console.log(error);
    });

    return positionArray;

  } else {
  /* geolocation IS NOT available */
  console.log("geo no!");
  
  }


}

var test = getGeolocation();

//Stanley's code for google map
var map;
      
function initMap() {
  
  map = new google.maps.Map(document.getElementById('map'), {
    
    zoom: 3,
    center: new google.maps.LatLng(2.8,-187.3),
    mapTypeId: 'terrain',
    styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
        
    });



};

function createMarker(eqarray, holderarray) {

      function getCircle(magnitude, color) {
        return {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: color,
          fillOpacity: .5,
          scale: Math.pow(2, magnitude) * 1.2,
          strokeColor: 'black',
          strokeWeight: .5
        };
      }

    var tempMarker;

    for (var i = 0; i < eqarray.length; i++) {
    
      var coords = eqarray[i].geometry.coordinates;
      var latLng = new google.maps.LatLng(coords[1],coords[0]);
      var magnitude = eqarray[i].properties.mag;

      var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        title: eqarray[i].properties.title,

        icon: getCircle(magnitude, '#fdd835'),
      });

      holderarray.push(marker);

      google.maps.event.addListener(marker, "click", function(){
        //this.setIcon(getCircle(magnitude, 'red'));
        map.setCenter(this.getPosition());
        map.setZoom(6);

        resetMarkerColor(holderarray);

        tempMarker = this.getIcon();
        tempMarker.fillColor = '#40c4ff';
        //tempMarker.fillOpacity = 0.75;
        this.setIcon(tempMarker);

        //read data from the db and display data

      });

      google.maps.event.addListener(marker, "mouseover", function(){

        tempMarker = this.getIcon();

         if (tempMarker.fillColor === '#40c4ff') {

          } else {

        tempMarker.fillColor = 'red';
        //tempMarker.fillOpacity = 0.75;
        this.setIcon(tempMarker);
        //map.setCenter(this.getPosition());
        console.log("mouseover");
        //this.setIcon()
        //console.log(tempMarker);
      }

      });

      google.maps.event.addListener(marker, "mouseout", function(){

          if (tempMarker.fillColor === '#40c4ff') {

          } else {
            tempMarker.fillColor = '#fdd835';
        //tempMarker.fillOpacity = 0.5;
            this.setIcon(tempMarker);
        //map.setCenter(this.getPosition());
            console.log("mouseout");
        }
        //console.log(this.getIcon());

        //this.setIcon()

      });

    }

};

//function to remove marker
function removeMarker(mkrarray) {

  for (var i = 0; i < mkrarray.length; i++) {

    mkrarray[i].setMap(null);

  }

}


  function resetMarkerColor(array){
    
    
    
    for (var i = 0; i< array.length; i++) {

      var markerIconAttr = array[i].getIcon();
      markerIconAttr.fillColor = '#fdd835';
      array[i].setIcon(markerIconAttr);


    }


  };

  $("body").on('mouseover','.collection-item',function(event){

    $(this).children().eq(0).attr("class", "");
    $(this).children().eq(0).attr("class", "circle red darken-1 black-text center")

  })

  $("body").on('mouseout','.collection-item',function(event){

    $(this).children().eq(0).attr("class", "");
    $(this).children().eq(0).attr("class", "circle yellow darken-1 black-text center")

  })

//this will update list when user hover/click map
function updateList(){



}

//this will update map when user hover/click on list
function updateMap(){



}
