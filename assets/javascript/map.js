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

//var test = getGeolocation();

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

//takes an object array from the result of usga ajax call and use that data to generate markers on google map
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
    var tempTitle;

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

      //push each marker into an array for later use
      holderarray.push(marker);

      //add eventListener when user click on the marker on google map
      google.maps.event.addListener(marker, "click", function(){

        map.setCenter(this.getPosition());
        map.setZoom(6);

        resetMarkerColor(holderarray);

        tempMarker = this.getIcon();
        tempTitle = this.title;
        tempMarker.fillColor = '#40c4ff';

        resetClicked();
        setClicked(tempTitle);

        this.setIcon(tempMarker);

        //read data from the db and display data


      });

      //add eventListner to marker when mouse hover over the marker
      google.maps.event.addListener(marker, "mouseover", function(){

        tempMarker = this.getIcon();
        tempTitle = this.title;

         if (tempMarker.fillColor === '#40c4ff') {

          } else {

        tempMarker.fillColor = '#f9a825';

        this.setIcon(tempMarker);

        updateList(tempTitle,"mouseover");
      }

      });

      //add evenListener to marker when mouse move out of the marker
      google.maps.event.addListener(marker, "mouseout", function(){

          if (tempMarker.fillColor === '#40c4ff') {

          } else {
            tempMarker.fillColor = '#fdd835';

            this.setIcon(tempMarker);

            //console.log("mouseout");

            updateList(tempTitle,"mouseout");
        }

      });

    }

};

//function to remove marker
function removeMarker(mkrarray) {

  for (var i = 0; i < mkrarray.length; i++) {

    mkrarray[i].setMap(null);

  }

}

//function to reset marker color
  function resetMarkerColor(array){
    
    
    
    for (var i = 0; i< array.length; i++) {

      var markerIconAttr = array[i].getIcon();
      markerIconAttr.fillColor = '#fdd835';
      array[i].setIcon(markerIconAttr);


    }


  };

//add event to the list on the left hand side, when mouseover
  $("body").on('mouseover','.collection-item',function(event){

    if ($(this).children().eq(0).attr("data_clicked") === "n") {
    $(this).children().eq(0).attr("class", "");
    $(this).children().eq(0).attr("class", "circle yellow darken-3 black-text center");



    var hoverOver = $(this).children().eq(0).attr("data_title");

    updateMap(hoverOver,"mouseover");

    }

  })

//add event to the lsit on the left hand side when mouseout
  $("body").on('mouseout','.collection-item',function(event){
if ($(this).children().eq(0).attr("data_clicked") === "n") {
    $(this).children().eq(0).attr("class", "");
    $(this).children().eq(0).attr("class", "circle yellow darken-1 black-text center");

    var hoverOver = $(this).children().eq(0).attr("data_title");

    updateMap(hoverOver,"mouseout");
  }

  })

//add event when user click on the list on the left hnd side
    $("body").on('click','.collection-item',function(event){

        resetMarkerColor(markerArray);
        resetClicked();

        $(this).children().eq(0).attr("class","circle light-blue accent-2 black-text center");
        $(this).children().eq(0).attr("data_clicked", "y");

        var listNum=$(this).attr("data_info");

        var clickedMarkerIconAttr = markerArray[listNum].getIcon();
        clickedMarkerIconAttr.fillColor = "#40c4ff";
        markerArray[listNum].setIcon(clickedMarkerIconAttr);
        map.setCenter(markerArray[listNum].getPosition());
        map.setZoom(6);

  })

//this will update list on the left hand side when user mouse over/mouse out on marker on google map
function updateList(string, state){

  var element = $("#list-wrapper").children();

  //console.log(element);


  for(var i = 0; i < element.length; i++) {

      //console.log("data_title is:" + element[i].firstChild.attributes[2].nodeValue);
      //console.log("string is:" + string);
      //console.log("data_clicked is:" + element[i].firstChild.attributes[1].nodeValue);

      if (element[i].firstChild.attributes[1].nodeValue === "n") {

        if (element[i].firstChild.attributes[2].nodeValue === string && state === "mouseover") {

          element[i].firstChild.classList.value = "circle yellow darken-3 black-text center";
        }

        if (element[i].firstChild.attributes[2].nodeValue === string && state === "mouseout") {

          element[i].firstChild.classList.value = "circle yellow darken-1 black-text center";
        }

      } 
  }
  


}

//set clicked data state, data_clicked="y" means this element is selected, "n" otherwise
function setClicked(string) {

  var element = $("#list-wrapper").children();

  for (var i = 0; i < element.length; i++) {

    if (element[i].firstChild.attributes[2].nodeValue === string) {

      element[i].firstChild.attributes[1].nodeValue = "y";
      element[i].firstChild.classList.value = "circle light-blue accent-2 black-text center";

    }


  }


}

//reset all data_clicked to "n"
function resetClicked() {

  var element = $("#list-wrapper").children();

  for (var i = 0; i < element.length; i++) {


      element[i].firstChild.attributes[1].nodeValue = "n";
      element[i].firstChild.classList.value = "circle yellow darken-1 black-text center";



  }


}

//this will update map when user mouse over/mouse out on items on list
function updateMap(string, state){

  for (var i = 0; i < markerArray.length; i++) {

    if (markerArray[i].title === string && state === "mouseover") {

      var markerHolder = markerArray[i].getIcon();

      markerHolder.fillColor = "#f9a825";
      markerArray[i].setIcon(markerHolder);

    } 

    if (markerArray[i].title === string && state === "mouseout") {

      var markerHolder = markerArray[i].getIcon();

      markerHolder.fillColor = "#fdd835";
      markerArray[i].setIcon(markerHolder);

    }


  }



}
