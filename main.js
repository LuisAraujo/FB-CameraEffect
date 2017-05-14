var zoomwidth = 1;
var zoomheight = 1;

var mode_click = "load-image";
var mode_mouse = "";

var img = new Image();
var overimg = new Image();

var  movex = 0;
var  movey = 0;
 var moveXAmount = 200;
 var moveYAmount = 200;
 var isDragging=false;
 
var src_effect = "over-image.png";

var imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);

var canvas = document.getElementById('imageCanvas');
var ctx = canvas.getContext('2d');

setInterval(function(){

	if(mode_mouse == "down-zoomin"){
		if ( (img.width* (zoomwidth-0.05) >= 400) && (img.height* (zoomheight -0.05) >= 400) ){
			zoomwidth-=0.05;
			zoomheight-=0.05;
		}
		
		redrawImage();	
	
	} else if(mode_mouse == "down-zoomout"){
	
    	zoomwidth+=0.05;
	    zoomheight+=0.05;

	    redrawImage();
		
	} else if(mode_mouse == "down-left"){
	    
		if ( (-400 / 2 + moveXAmount+10) > 0)
			moveXAmount +=15;
		
		redrawImage();
	
	} else if(mode_mouse == "down-right"){
	   
		if ( (-400 / 2 + moveXAmount-10) > 0)
		   moveXAmount -=15;
		redrawImage();
	
	}else if(mode_mouse == "down-up"){
	   
	    moveYAmount +=10;
		redrawImage();
	
	}else if(mode_mouse == "down-down"){
	   
	    moveYAmount -=10;
		redrawImage();
	
	}
	
}, 100);

$(".choose-effect").click(function(){
   src_effect = $(this).attr("effect")+".png";
   $("#cont-choose-effect").hide();
   $("#cont-imageCanvas").show();
});

$(window).mouseup(function(evt){
	isDragging = false;
	prevX = 0;
	prevY = 0;
});

$('#imageCanvas').mousedown(function(evt){
	isDragging = true;
	prevX = 0;
	prevY = 0;
});


$("#bt-zoomin").mousedown(function(){
	if ( (img.width* (zoomwidth-0.05) >= 400) && (img.height* (zoomheight -0.05) >= 400) ){
		zoomwidth-=0.05;
		zoomheight-=0.05;
	}
	redrawImage();	
	
	mode_mouse  = "down-zoomin";
});


$("#bt-zoomin").mouseup(function(){
	mode_mouse  = "out-zoomin";
});



$("#bt-zoomout").mousedown(function(e){
	zoomwidth+=0.05;
	zoomheight+=0.05;

	redrawImage();
	
	mode_mouse  = "down-zoomout";
});


$("#bt-zoomout").mouseup(function(e){
	mode_mouse  = "out-zoomout";
});


$("#bt-left").mousedown(function(e){
	moveXAmount +=5;
	redrawImage();
	
	mode_mouse  = "down-left";
});


$("#bt-left").mouseup(function(e){

	mode_mouse  = "out-left";
});

$("#bt-right").mousedown(function(e){
	if ( (-400 / 2 + moveXAmount-5) > 0)
		moveXAmount -= 5;
	
	redrawImage();
	
    mode_mouse  = "down-right";
});

$("#bt-right").mouseup(function(e){

    mode_mouse  = "out-right";
});



$("#bt-up").mousedown(function(e){
	
	moveYAmount += 10;
	
	redrawImage();
	
    mode_mouse  = "down-up";
});

$("#bt-up").mouseup(function(e){

    mode_mouse  = "out-up";
});



$("#bt-down").mousedown(function(e){
	
	moveYAmount -= 10;
	
	redrawImage();
	
    mode_mouse  = "down-down";
});

$("#bt-down").mouseup(function(e){

    mode_mouse  = "out-down";
});


$('#imageCanvas').click(function(evt){
	if(mode_click == "load-image")
		$("#imageLoader").trigger("click");
	
	else{
		
		
		$('#imageCanvas').mousemove(function(evt){
			  
					  
			if( isDragging == true ) {

					if( prevX>0 || prevY>0)
					{
						moveXAmount += event.pageX - prevX;
						moveYAmount += event.pageY - prevY;
						canvas = document.getElementById('imageCanvas');
						ctx = canvas.getContext('2d');
						redrawImage();
						
					}
				   
				   prevX = event.pageX;
				   prevY = event.pageY;
				   				   
				
				   
			  }
			   
			   
		});
	}
	
	
});




var button = document.getElementById('bt-gerate');

function handleImage(e){

    var reader = new FileReader();
	
    reader.onload = function(event){
	  
       
		
        img.onload = function(){
		
		canvas.width = 400;
		canvas.height = 400;
		
       ctx.drawImage(img,-400 / 2 + moveXAmount, -400 / 2 + moveYAmount,img.width,img.height,0,0,img.width*zoomwidth,img.height*zoomheight);
		  
		
		
		overimg.onload = function(){
		    ctx.drawImage(overimg, 0, 250, 400,150);
			
			$('#imageCanvas').bind('mousewheel', function(e) {
				if(e.originalEvent.wheelDelta / 120 > 0) {
					zoomwidth+=0.05;
					zoomheight+=0.05;
				} else {
					if ( (img.width* (zoomwidth-0.05) >= 400) && (img.height* (zoomheight -0.05) >= 400) ){
						zoomwidth-=0.05;
						zoomheight-=0.05;
					}
				}
				
			   redrawImage();
			   
			    	   
				
			});
			mode_click = "move-image";		
		   var dataURL = canvas.toDataURL('image/png');
		   $("#bt-gerate").attr("href", dataURL);
		   $("#cont-download").css("display","block");
		   $("#cont-btn").css("display", "block");
		 
		}
		   
		   overimg.src = src_effect;
        }
        
		img.src = event.target.result;
		
    }
	
    reader.readAsDataURL(e.target.files[0]);     
}



function redrawImage(){

ctx.save();

ctx.clearRect(0, 0, canvas.width, canvas.height);		  

ctx.drawImage(img, -400 / 2 + moveXAmount, -400 / 2 + moveYAmount,img.width,img.height,0,0,img.width*zoomwidth,img.height*zoomheight);

ctx.drawImage(overimg, 0, 250, 400,150);
  
   ctx.restore();
 var dataURL = canvas.toDataURL('image/png');
 $("#bt-gerate").attr("href", dataURL);
}