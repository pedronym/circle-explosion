$(document).ready(function() {

    var stage           = $('#stage'),
        tools           = $('#tools'),
        appName         = $("#appName"),
        circles         = [],
        circlesPerBurst = 10,
        maxCircles      = circlesPerBurst * 10,
        holdCount       = 0,
        holdMax         = 5,
        holdInterval    = 500,
        holdTimer;

	function init () {
        $(window).on('keyup', keyPress);
    	stage.on('mouseup', mousePress);
        //stage.on('mousedown', mouseDown);
        tools.on('click', 'button', onToolsClick);
        setInterval(changeAppNameColor, 3000);
    }

	// Respondes to stage when a keyboard key is pressed
	function keyPress(e){
		if(KeyDecoder.decode(e.keyCode) && circles.length < maxCircles){
			createCircle(e);
		}
	}

    function mouseDown (e) {
        stage.on('mouseup', onHoldStop);
        holdTimer = setInterval(function () {
            if (holdCount < holdMax) {
                holdCount++;
                TweenMax.to(stage, holdInterval / 100, {
                    top: 0 - (100 * holdCount),
                    backgroundColor: Utils.generateRandomColor()
                });
            } else {
                onMaxHold();
            }
        }, holdInterval);
    }

    function onMaxHold () {
        TweenMax.to(stage, 0.1, { backgroundColor: '#FFFFFF', yoyo: true, repeat: -1 });
    }

    function onHoldStop (e) {
        holdCount = 0;
        TweenMax.to(stage, 0.5, { backgroundColor: '#212121' });
        clearInterval(holdTimer);
    }

	// Responds to clicks inside the stage
	function mousePress (e) {
		if(e.clientX && e.clientY && circles.length < maxCircles){
            console.log('Mouse Pressed - Generating Circle Burst');
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
            	fade: false
            });
            stage.append(circle);
            circles.push(circle);
        }
    }

	// Changes the app name color in a predefined interval
	function changeAppNameColor(e) {
		TweenMax.to(appName, 0.5, {color:Utils.generateRandomColor()})
	}

    function onToolsClick (e) {
		var dataClick = $(e.currentTarget).data('click');
		return (dataClick === 'action_flush') ? flushCircles() : circleFollow();
    }

    function circleFollow () {
        stage.off('mouseup', mousePress);

        $(stage).on('click', function () {
            stage.off('click');
            $(window).off('mousemove');
            stage.on('mouseup', mousePress);
            explodeCircles();
        });

        $(window).on('mousemove', function (e) {
            TweenMax.allTo(circles, 0.3, {top:e.clientY, left: e.clientX}, 0.02);
        });
    }

    function explodeCircles () {
        Array.prototype.forEach.call(circles, function (circle) {
            TweenMax.to( circle, 0.3, {
                left:    Utils.generateRandomX(),
                top:     Utils.generateRandomY(),
                opacity: 0,
                ease:    'Expo.easeInOut',
                onComplete: function () {
                    cleanCircles(this.target);
                }
            });
        });
    }

    function flushCircles () {
        TweenMax.allTo(circles, 0.3, {top:'45%', left:'45%', ease:'Expo.easeInOut', onComplete:function () {
            TweenMax.to(this.target, 0.15, {
                opacity:0
            })
        }}, 0.02, cleanCircles);
    }

    function cleanCircles (circle) {
        (circle) ? console.log('Cleaning Circle') : console.log('Cleaning Circles');
        if (circle) {
            $(circle).remove();
            circles.splice(circles.indexOf(circle), 1);
        } else {
            $(circles).remove();
            circles = [];
        }
    }

    init();
});

var Utils = function(){

	var generateRandomColor = function () {
		return '#'+Math.floor(Math.random() * 16777215).toString(16);
	};

	var generateRandomX = function () {
		return Math.floor(Math.random() * ($(window).width() - 1) + 1);
	};

	var generateRandomY = function () {
		return Math.floor(Math.random() * ($(window).height() - 1) + 1);
	};

	return {
		generateRandomColor: generateRandomColor,
		generateRandomX:     generateRandomX,
		generateRandomY:     generateRandomY
	}
}();
