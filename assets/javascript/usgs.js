$(document).ready(function(){
	$('.info-card').hide();
	loadList();


});
var arr;

function loadList(){
	var i,list,display;
var currentTime=moment(new Date()).format("MM/DD/YYYY HH:mm");
$.ajax({ 
  url: "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=10&offset=1",
  method: 'GET',
}).done(function(response) {
  console.log(response.features);
  list=response.features;
  arr=response.features;
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



});
};

$("body").on('click','.collection-item',function(event){
      // var time = $
      // $('.info-card').show();
      var v=$(this).attr("data_info");
      console.log(v);
      $.ajax({ 
  url: "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=1&offset="+v,
  method: 'GET',
}).done(function(response) {
	console.log(response.features[0]);
	var detail=response.features[0];
	var lat=detail.geometry.coordinates[1];
	if(lat<0){
		lat=Math.abs(lat)+" °S";
	}
	else{
		lat=lat+" °N";
	}
	var lng=detail.geometry.coordinates[0];
	if(lng<0){
		lng=Math.abs(lng)+" °W";
	}
	else{
		lng=lng+" °E";
	}
	$("#cardTitle").text(detail.properties.title);
	$("#eq-time").text(moment(detail.properties.time).format("YYYY/MM/DD HH:mm:ss"));
	$("#eq-location").text(lat+", "+lng);
	$("#eq-magitude").text(detail.properties.mag);
	$("#eq-depth").text(detail.geometry.coordinates[2]+" km");

	$('.info-card').show();
	});
    });

