// JavaScript Document
var current = 0;
var num = 1;
var alpha = 0;
var previous = 0;
function startRotate(){
	var allRotates = $$('.z_rotate');
	num = allRotates.length;
	
	//num --;
	current = 1 + Math.floor(Math.random() * num);
	fade();
	setTimeout('next()',12000);
}
function next(){
	current++;
	if(current>num){ current = 1;}
	$('rotate'+current).setOpacity(0);
	//thisDiv.style.MozOpacity = 0;
	//thisDiv.style.opacity = 0;
	//thisDiv.style.filter = "alpha(opacity=0)";
	fade();
	setTimeout('next()',12000);
}
function fade(){
	alpha+=.1;
	if(alpha>1){alpha=1;}
	$('rotate'+current).setOpacity(alpha);
	//thisDiv.style.MozOpacity = alpha;
	//thisDiv.style.opacity = alpha;
	//thisDiv.style.filter = "alpha(opacity="+alpha*100+")";
	if(previous>0){
		$('rotate'+previous).setOpacity(1-alpha);
		//previousDiv.style.MozOpacity = 1-alpha;
		//previousDiv.style.opacity = 1-alpha;
		//previousDiv.style.filter = "alpha(opacity="+(1-alpha)*100+")";
	}
	if(alpha>=1){
		alpha=0;
		/*thisDiv.style.zIndex = 2;
		if(previous>0){
			previousDiv.style.zIndex = 1;
		}*/
		previous = current;
	}else{
		setTimeout('fade()',100);
	}
}
Event.observe(window, 'load', function() {
	startRotate();
});