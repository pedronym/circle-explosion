var Circle = function(e, options)
{
	if(options) {
		this.options = options;
	} else {
		this.options = {};
	}

	this.circleSize = this.getRandomNumber();
    this.circleColor = this.getRandomColor();
    this.circleOpacity = this.getRandomOpacity();
    this.targetX= this.getRandomX();
   	this.targetY = this.getRandomY();

    if(e.type === "keyup"){
		this.circleChar = KeyDecoder.decode(e.keyCode);
	}
	
	if(e.type === "mouseup"){
		this.circleOrigin = {x:e.clientX, y:e.clientY};
	}
	
	if(this.circleChar){
		this.circle = $('<div class="circle"><div class="circleChar"><h1>'+ this.circleChar +'</h1></div></div>');
	} else {
		this.circle = $('<div class="circle"><div class="circleChar"></div></div>');
	}
	
	if(e.type === "keyup"){
		TweenMax.set(this.circle, {scale:this.getRandomOpacity(), backgroundColor:this.circleColor, alpha:0, top:"50%", left:"50%"});
	} else if(e.type === "mouseup"){
		TweenMax.set(this.circle, {scale:this.getRandomOpacity(), left:this.circleOrigin.x, top:this.circleOrigin.y, backgroundColor:this.circleColor, alpha:0});
	}
    
    if(options && options.fade){
    	TweenMax.to(this.circle, this.getRandomTime(), {top:this.targetY, left:this.targetX, alpha:this.circleOpacity, ease:"Expo.easeOut", onComplete:this.fadeOut, onCompleteParams:this.circle});
    } else {
    	TweenMax.to(this.circle, this.getRandomTime(), {top:this.targetY, left:this.targetX, alpha:this.circleOpacity, ease:"Expo.easeOut"});
    }

    return this.circle;
};

Circle.prototype.getRandomNumber = function() { 
	return Math.floor(Math.random() * (150 - 25)) + 150; 
}

Circle.prototype.getRandomColor = function() { 
	return Utils.generateRandomColor();
}

Circle.prototype.getRandomOpacity = function() { 
	return (Math.random() * (1 - 0.5) + 0.5) 
};

Circle.prototype.getRandomTime = function() { 
	return (Math.random() * 3) + 1; 
}

Circle.prototype.getRandomX = function() { 
	return Math.floor(Math.random() * ($(window).width() - 1) + 1); 
}

Circle.prototype.getRandomY = function() { 
	return Math.floor(Math.random() * ($(window).height() - 1) + 1); 
}

Circle.prototype.fadeOut = function(circle) { 
	TweenMax.to(circle, 2, {delay:0.5, alpha:0, 
		onComplete:function(){
			TweenMax.killTweensOf(circle); circle.remove();
		}
	}); 
}