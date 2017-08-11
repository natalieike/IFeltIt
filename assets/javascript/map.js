/* replace/merge the following with Jasmine's code */

//sample query URL to test getting data onto map
var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=10&offset=1"

//"https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2017-08-01&endtime=2017-08-05&limit=10";

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

  function getCircle(magnitude, color) {
        return {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: color,
          fillOpacity: .5,
          scale: Math.pow(2, magnitude) * 2,
          strokeColor: 'black',
          strokeWeight: .5
        };
      }

      //got this ection of code from jasmine. 
      var i,list,display;
var currentTime=moment(new Date()).format("MM/DD/YYYY HH:mm");
$.ajax({ 
  url: "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=10&offset=1",
  method: 'GET',
}).done(function(response) {
  console.log(response.features);
  list=response.features;
  //arr=response.features;
  for(i=0;i<list.length;i++){
    var t=moment(list[i].properties.time).format("MM/DD/YYYY HH:mm");
    var duration = moment(currentTime).diff(t,'minutes');
    console.log(t,currentTime,duration);
    if((duration/60)<=1){
      if(duration<2){
      display=duration+" minute ago";
    }
    else{
      display=duration+" minutes ago"
    }
    }
    else if(((duration/60)/24 <= 1)){
      display=Math.floor(duration/60);
      if(display<2){
        display=display+" hour ago";
      }
      else{
        display=display+" hours ago"
      }
    }
    else{
      display=Math.floor((duration/60)/24);
      if(display<2){
        display=display+" day ago";
      }
      else{
        display=display+" days ago";
      }
    }
  //console.log(duration.asMinutes());

    //var timeRemaining=moment.diff(list[i].properties.time)
    $("#list-wrapper").append('<li class="collection-item avatar grey darken-4" data_info="'+(i+1)+'"><div class="circle yellow darken-1 black-text center"><span class="magnitude">'+list[i].properties.mag+'</span></div><p class="list-of-eq white-text">'+list[i].properties.title+'</p><p class="time-from-current">'+display+'</p></li>');
  }

      for (var i = 0; i < list.length; i++) {
    
      var coords = list[i].geometry.coordinates;
      var latLng = new google.maps.LatLng(coords[1],coords[0]);
      var magnitude = list[i].properties.mag;

      var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        title: list[i].properties.title,

        icon: getCircle(magnitude, '#fdd835'),
      });
  
  };


  //sample ajax to get the data from usgs appear on the map.
  //merge the code with jasmine's version
/*
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
        title: eqArray[i].properties.title,

        icon: getCircle(magnitude, '#fdd835'),
      });
   
/*
    google.maps.event.addListener(marker, "click", function(){

      //this.setIcon(getCircle(magnitude, 'red'));
      map.setCenter(this.getPosition());

    })

    google.maps.event.addListener(marker, "mouseover", function(){

      this.setIcon(getCircle(this.getIcon().scale, 'red'));
      //map.setCenter(this.getPosition());

    })


    google.maps.event.addListener(marker, "mouseout", function(){

      this.setIcon(getCircle(this.getIcon().scale, '#fdd835'));
      //map.setCenter(this.getPosition());

    })

    };


  
    

  });

 */   


});
}
