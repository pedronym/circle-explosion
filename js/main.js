$(document).ready(function() {
    
    var stage = $('#stage');
    var tools = $('#tools');
    var appName = $("#appName");
    
    var circles = [];
    var circlesPerBurst = 10;

	$(window).on('keyup', keyPress);
	stage.on('mouseup', mousePress);
	
	tools.on('click', 'button', function(e){
		var dataClick = $(e.currentTarget).data('click');
		
		if(dataClick === 'action_flush'){
			TweenMax.allTo(circles, 0.3, {top:'50%', left:'45%', ease:'Expo.easeInOut', onComplete:function(){
				TweenMax.to(this.target, 0.15, {opacity:0})
			}}, 0.02, function(){
				$(circles).remove();
				circles = [];
			});
		} else if(dataClick === 'action_follow'){
			stage.off('mouseup', mousePress);

			$(stage).on('click', function(){
				$(window).off('mousemove');

				TweenMax.allTo(circles, 0.3, {left:'-300px'}, 0.05, function(){
					$(circles).remove();
					circles = [];
					stage.off('click');
					stage.on('mouseup', mousePress);
				});
			});

			$(window).on('mousemove', function(e){
				TweenMax.allTo(circles, 0.3, {top:e.clientY, left: e.clientX}, 0.02);
			});
		} else {
			
		}
	});

	setInterval(changeAppNameColor, 3000);
	
	// Respondes to stage when a keyboard key is pressed
	function keyPress(e){
		if(KeyDecoder.decode(e.keyCode)){
			createCircle(e);
		}
	}
	
	// Responds to clicks inside the stage
	function mousePress(e){
		if(e.clientX && e.clientY){
			createCircleBurst(e);
		}
	}
	
	// Creates a single circle
	function createCircle(e){
		var circle = new Circle(e);
		stage.append(circle);
		circles.push(circle);
	}
	
	// Creates a circle burst 
	function createCircleBurst(e){
        for(var i = 0; i < circlesPerBurst; i++){
            var circle = new Circle(e, { 
            	fade:false
            });
            stage.append(circle);
            circles.push(circle);
        }
    }
	
	// Changes the app name color in a predefined interval
	function changeAppNameColor(e){
		TweenMax.to(appName, 0.5, {color:Utils.generateRandomColor()})
	}
});

var Utils = function(){

	var generateRandomColor = function(){
		return '#'+Math.floor(Math.random()*16777215).toString(16);
	};

	var generateRandomX = function(){
		return Math.floor(Math.random() * ($(window).width() - 1) + 1);
	};

	var generateRandomY = function(){
		return Math.floor(Math.random() * ($(window).height() - 1) + 1);
	};

	return {
		generateRandomColor: generateRandomColor,
		generateRandomX: generateRandomX,
		generateRandomY: generateRandomY
	}
}();