(function( $ ) {
  $.fn.gotop = function(options) {
  
  	var settings = $.extend( {
  		'content':	960,
  		'bottom' : 	30,
  		'margin' :	"none",
  		'position':	"right",
  		'scrollTop':	100,
  		'duration':	700
  	}, options);
        
        var win = $(window);
        var top = this;
        
        //is there some place for my return to the top button?
        function hasPlace() {
        	var place = true;
        	if(settings.margin == "none")
        	{
        		if( win.width() < (settings.content + (top.width() * 2 ) + 4 ) ) place = false;
        	}
        	else
        	{
        		if( win.width() < (settings.content + ( ( top.width() + settings.right ) * 2 ) + 4 ) ) place = false;
        	}
        	return place;
        }
        
        //Put our return to top button at his place
        function placeTop() {
        	var pos = ( ( ( win.width() - settings.content ) / 2 ) - top.width() ) / 2;
        	if(settings.position == "left" || settings.position == "l") top.css({"left": pos+"px"});
        	else top.css({"right": pos+"px"});
        }
        
        //Can we show this button?
        function showTop() {
        	if(win.scrollTop() > settings.scrollTop) top.fadeIn();
        	else top.fadeOut();
        }
        
        if(!hasPlace()) this.hide();
        if(settings.margin == "none") placeTop();
        else if(settings.position == "left" || settings.position == "l") top.css({"left": settings.margin+"px"});
        else top.css({"right": settings.margin+"px"});
        showTop();
        
        //RESIZE
        win.resize(function(){
        	if(hasPlace()) top.fadeIn();
        	else top.fadeOut();
        	
        	if(settings.margin == "none") placeTop();
        });
        
        //SCROLL
        win.scroll(function(){
        	showTop();
        });
        
        return this
        .css({"position": "fixed", "cursor": "pointer", "bottom" : settings.bottom + "px"})
        .click(function(){
        	$('body,html').animate({scrollTop: 0}, settings.duration);
        });
  };
})( jQuery );