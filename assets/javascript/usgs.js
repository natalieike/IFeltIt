var arr=[];
var limit=10;
var offset=1;
var page=['<',1,2,3,4,5,'>'];
var pageselected=1;
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

    $("#list-wrapper").append('<li class="collection-item avatar grey darken-4" data_info="'+i+'"><div class="circle yellow darken-1 black-text center"><span class="magnitude">'+list[i].properties.mag+'</span></div><p class="list-of-eq white-text">'+list[i].properties.title+'</p><p class="time-from-current">'+display+'</p></li>');
  }



});
};
function loadPagination(onpage){
  $(".pagination").empty();
  console.log(onpage);
  if(onpage < 3){
    page=['<',1,2,3,4,5,'>'];
    $(".pagination").append('<li class="disabled"><a href="#!">'+page[0]+'</a></li>');
    $(".pagination").append('<li class=""><a href="#!" onclick=update('+page[1]+')>'+page[1]+'</a></li>');
    $(".pagination").append('<li class=""><a href="#!" onclick=update('+page[2]+')>'+page[2]+'</a></li>');
    $(".pagination").append('<li class=""><a href="#!" onclick=update('+page[3]+')>'+page[3]+'</a></li>');
    $(".pagination").append('<li class=""><a href="#!" onclick=update('+page[4]+')>'+page[4]+'</a></li>');
    $(".pagination").append('<li class=""><a href="#!" onclick=update('+page[5]+')>'+page[5]+'</a></li>');
    $(".pagination").append('<li class=""><a href="#!" onclick=update('+page[6]+')>'+page[6]+'</a></li>');

  }
  else if(onpage > 2000){
    page=['<',1996,1997,1998,1999,2000,'>'];
    $(".pagination").append('<li class=""><a href="#!" onclick=update('+page[0]+')>'+page[0]+'</a></li>');
    $(".pagination").append('<li class=""><a href="#!" onclick=update('+page[1]+')>'+page[1]+'</a></li>');
    $(".pagination").append('<li class=""><a href="#!" onclick=update('+page[2]+')>'+page[2]+'</a></li>');
    $(".pagination").append('<li class=""><a href="#!" onclick=update('+page[3]+')>'+page[3]+'</a></li>');
    $(".pagination").append('<li class=""><a href="#!" onclick=update('+page[4]+')>'+page[4]+'</a></li>');
    $(".pagination").append('<li class=""><a href="#!" onclick=update('+page[5]+')>'+page[5]+'</a></li>');
    $(".pagination").append('<li class="disabled"><a href="#!">'+page[6]+'</a></li>');
  }
  else{
    page=['<',onpage-2,onpage-1,onpage,onpage+1,onpage+2,'>'];
    $(".pagination").append('<li class=""><a href="#!" onclick=update('+page[0]+')>'+page[0]+'</a></li>');
    $(".pagination").append('<li class=""><a href="#!" onclick=update('+page[1]+')>'+page[1]+'</a></li>');
    $(".pagination").append('<li class=""><a href="#!" onclick=update('+page[2]+')>'+page[2]+'</a></li>');
    $(".pagination").append('<li class=""><a href="#!" onclick=update('+page[3]+')>'+page[3]+'</a></li>');
    $(".pagination").append('<li class=""><a href="#!" onclick=update('+page[4]+')>'+page[4]+'</a></li>');
    $(".pagination").append('<li class=""><a href="#!" onclick=update('+page[5]+')>'+page[5]+'</a></li>');
    $(".pagination").append('<li class=""><a href="#!" onclick=update('+page[6]+')>'+page[6]+'</a></li>');

  }

  console.log(onpage,page,offset);
  //   i=0;
  // for(i=0;i<7;i++){
  //   if(i==1){
  //     $(".pagination").append('<li class="disabled"><a href="#!">'+page[i]+'</a></li>');
  //     $(".pagination").append('<li class="active"><a href="#!">'+page[i+1]+'</a></li>');
  //     console.log("here");
  //     i=i+1;
  //   }
  //   else{
  //     $(".pagination").append('<li class=""><a href="#" onclick='+update(page[i])+'>'+page[i]+'</a></li>');
  //   }
    // else if(onpage > 2000){
    //   page=['<',1996,1997,1998,1999,2000,'>'];
    // }
    // else{
    //   page=['<',onpage-2,onpage-1,onpage,onpage+1,onpage+2,'>'];
    // }
  //};

};

  function plot(){

  };
  function update(x){
    console.log(x,pageselected);

  if(x=='<'){
    offset=offset-((pageselected-1)*10);
    pageselected=pageselected-1;
    loadPagination(pageselected);
  }
  else if(x=='>'){
    offset=offset+((pageselected+1)*10);
    pageselected=pageselected+1;
    loadPagination(pageselected);
  }
  else if(x<pageselected){
    offset=offset-((pageselected-(x))*10);
    pageselected=x;
    loadPagination(pageselected);
  }
  else if(x>pageselected){
    offset=offset+((x-(pageselected))*10);
    pageselected=x;
    loadPagination(pageselected);
  }
  else{
    pageselected=x;
    loadPagination(pageselected);
    offset=offset;
    //loadPagination(x);
  }
  console.log(offset);
  loadList(limit,offset);
 
};
$("body").on('click','.collection-item',function(event){
      // var time = $
      // $('.info-card').show();
      var v=$(this).attr("data_info");
      v=parseInt(v);
      console.log(v,offset);
//       $.ajax({ 
//   url: "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=1&offset="+v,
//   method: 'GET',
// }).done(function(response) {
  response=arr[v];
	console.log(response);
	var detail=arr[v];
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

