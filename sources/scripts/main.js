/*jshint undef:false */
var meter = new FPSMeter();
function testMobile() {
	return false;// Modernizr.touch || window.innerWidth < 600;
}
var resizeProportional = true;
var windowWidth = 820,
windowHeight = 600;

var realWindowWidth = 820,
realWindowHeight = 600;

if(testMobile()){
	windowWidth = 640;
	windowHeight = 960;
}
var renderer;
var windowWidthVar = window.innerWidth,
windowHeightVar = window.innerHeight;
var renderer = PIXI.autoDetectRenderer(realWindowWidth, realWindowHeight, null, false, true);

document.body.appendChild(renderer.view);

var APP;
APP = new Application();
APP.build();
APP.show();

function update() {
	requestAnimFrame(update );
	meter.tickStart();
	var tempRation =  (window.innerHeight/windowHeight);
	var ratio = resizeProportional ? tempRation < (window.innerWidth/realWindowWidth)?tempRation:(window.innerWidth/realWindowWidth) : 1;
	windowWidthVar = realWindowWidth * ratio;
	windowHeightVar = realWindowHeight * ratio;
	//proportional
	if(windowWidthVar > realWindowWidth)
	{
		windowWidthVar = realWindowWidth;
	}
	if(windowHeightVar > realWindowHeight)
	{
		windowHeightVar = realWindowHeight;
	}
	renderer.view.style.width = windowWidthVar+'px';
	renderer.view.style.height = windowHeightVar+'px';

	APP.update();
	renderer.render(APP.stage);
	meter.tick();
}

var initialize = function(){
	// //inicia o game e da um build
	PIXI.BaseTexture.SCALE_MODE = 2;
	requestAnimFrame(update);
};

(function () {
	var App = {
		init: function () {
			initialize();
		}
	};
	App.init();
})();