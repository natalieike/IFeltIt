var arr=[];
var limit=10;
var offset=1;
var page=['<',1,2,3,4,5,'>'];
var pageselected=1;
var detail;

//var to hold the markers for current page from Stanley
var markerArray = [];

$(document).ready(function(){
  $('.info-card').hide();
  loadList(limit,offset);
  loadPagination(1);
});
function loadList(limit,offset){
  var i,list,display;
  $("#list-wrapper").empty();
  var currentTime=moment(new Date()).format("MM/DD/YYYY HH:mm");
  $.ajax({ 
    url: "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit="+limit+"&offset="+offset,
    method: 'GET',
  }).done(function(response) {
    list=response.features;
    arr=response.features;
    for(i=0;i<list.length;i++){
      var t=moment(list[i].properties.time).format("MM/DD/YYYY HH:mm");
      var duration = moment(currentTime).diff(t,'minutes');
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
      };

    //add data-title attribute
    $("#list-wrapper").append('<li class="collection-item avatar grey darken-4" data_info="'+i+'"><div class="circle yellow darken-1 black-text center" data_clicked="n" data_title="'+list[i].properties.title+'"><span class="magnitude">'+list[i].properties.mag+'</span></div><p class="list-of-eq white-text">'+list[i].properties.title+'</p><p class="time-from-current">'+display+'</p></li>');
  }

//start of code from Stanley to draw circle marker on Gmap
createMarker(list,markerArray);
//end of code from Stanley

  });
};

function loadPagination(onpage){
  $(".pagination").empty();
  if(onpage < 3){
    page=['<',1,2,3,4,5,'>'];
    $(".pagination").append('<li class="disabled"><a href="#!">'+page[0]+'</a></li>');
    $(".pagination").append('<li class=""><a href="#!" onclick="update('+page[1]+')">'+page[1]+'</a></li>');
    $(".pagination").append('<li class=""><a href="#!" onclick="update('+page[2]+')">'+page[2]+'</a></li>');
    $(".pagination").append('<li class=""><a href="#!" onclick="update('+page[3]+')">'+page[3]+'</a></li>');
    $(".pagination").append('<li class=""><a href="#!" onclick="update('+page[4]+')">'+page[4]+'</a></li>');
    $(".pagination").append('<li class=""><a href="#!" onclick="update('+page[5]+')">'+page[5]+'</a></li>');
    $(".pagination").append('<li class=""><a href="#!" onclick="update('+"-1"+')">'+'&gt'+'</a></li>');

  }
  else if(onpage > 2000){
    page=['<',1996,1997,1998,1999,2000,'>'];
    $(".pagination").append('<li class=""><a href="#!" onclick="update('+"-2"+')">'+page[0]+'</a></li>');
    $(".pagination").append('<li class=""><a href="#!" onclick="update('+page[1]+')">'+page[1]+'</a></li>');
    $(".pagination").append('<li class=""><a href="#!" onclick="update('+page[2]+')">'+page[2]+'</a></li>');
    $(".pagination").append('<li class=""><a href="#!" onclick="update('+page[3]+')">'+page[3]+'</a></li>');
    $(".pagination").append('<li class=""><a href="#!" onclick="update('+page[4]+')">'+page[4]+'</a></li>');
    $(".pagination").append('<li class=""><a href="#!" onclick="update('+page[5]+')">'+page[5]+'</a></li>');
    $(".pagination").append('<li class="disabled"><a href="#!">'+page[6]+'</a></li>');
  }
  else{
    page=['<',onpage-2,onpage-1,onpage,onpage+1,onpage+2,'>'];
    $(".pagination").append('<li class=""><a href="#!" onclick="update('+"-2"+')">'+page[0]+'</a></li>');
    $(".pagination").append('<li class=""><a href="#!" onclick="update('+page[1]+')">'+page[1]+'</a></li>');
    $(".pagination").append('<li class=""><a href="#!" onclick="update('+page[2]+')">'+page[2]+'</a></li>');
    $(".pagination").append('<li class=""><a href="#!" onclick="update('+page[3]+')">'+page[3]+'</a></li>');
    $(".pagination").append('<li class=""><a href="#!" onclick="update('+page[4]+')">'+page[4]+'</a></li>');
    $(".pagination").append('<li class=""><a href="#!" onclick="update('+page[5]+')">'+page[5]+'</a></li>');
    $(".pagination").append('<li class=""><a href="#!" onclick="update('+"-1"+')">'+page[6]+'</a></li>');

  }

};

function update(x){

  if(x==(-2)){
    offset=((pageselected-2)*10)+1;
    pageselected=pageselected-1;
    loadPagination(pageselected);
  }
  else if(x==(-1)){
    offset=((pageselected)*10)+1;
    pageselected=pageselected+1;
    loadPagination(pageselected);
  }
  else if(x<pageselected){
    offset=offset-((pageselected-x)*10);
    pageselected=x;
    loadPagination(pageselected);
  }
  else if(x>pageselected){
    offset=offset+((x-pageselected)*10);
    pageselected=x;
    loadPagination(pageselected);
  }
  else{
    pageselected=x;
    loadPagination(pageselected);
    offset=offset;
  }
  loadList(limit,offset);
  
  //code from Stanley
  removeMarker(markerArray); // this will remove the current marker on when pagination change
  markerArray=[]; // reset markerArray so it doesnt grow bigger as user clicked more
  //end of code from Stanley

};
$("body").on('click','.collection-item',function(event){
  var v=$(this).attr("data_info");
  v=parseInt(v);
  response=arr[v];
  detail=arr[v];
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

  watchForNewData();
});