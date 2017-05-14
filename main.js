var imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);

var canvas = document.getElementById('imageCanvas');
var ctx = canvas.getContext('2d');


$('#imageCanvas').click(function(){
	$("#imageLoader").trigger("click");
});

var button = document.getElementById('bt-gerate');

button.addEventListener('click', function (e) {
   
});

function handleImage(e){

    var reader = new FileReader();
	
    reader.onload = function(event){
	  
        var img = new Image();
		
        img.onload = function(){
		
		canvas.width = 400;
		canvas.height = 400;
		
        ctx.drawImage(img,0,0,img.width,img.height,0,0,canvas.width,canvas.height);
		  
		var overimg = new Image();
		
		overimg.onload = function(){
		    ctx.drawImage(overimg, 0, 250, 400,150);
			
		   var dataURL = canvas.toDataURL('image/png');
		  $("#bt-gerate").attr("href", dataURL);
		  $("#bt-gerate").css("display","block");
		 
		}
		   
		   overimg.src = "over-image.png";
        }
        
		img.src = event.target.result;
		
		
		
		
    }
	
    reader.readAsDataURL(e.target.files[0]);     
}
