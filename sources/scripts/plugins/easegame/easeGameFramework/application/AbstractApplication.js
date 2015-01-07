var AbstractApplication = Class.extend({
	//inicializa a aplicacao com o stage, um loader e uma screen manager
	init:function(canvasWidth, canvasHeight)
	{
		this.stage = new PIXI.Stage(0x66FF99, true);
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;
		this.screenManager = new ScreenManager();
		this.screenManager.build("MainScreenManager");
		this.screenManager.setCanvasArea(canvasWidth, canvasHeight);
		this.stage.addChild(this.screenManager.container);

		this.loader;
		this.loadPercent;
		this.loadText = new PIXI.Text("0%", {font:"20px Luckiest Guy", fill:"black", align:"center"});;
		this.stage.addChild(this.loadText);
		this.loadText.position.x = this.canvasWidth/2 - this.loadText.width/2;
		this.loadText.position.y = this.canvasHeight/2 - this.loadText.height/2;
	},
	build:function()
	{

	},
	//atualiza a screen manager
	update:function()
	{
		this.screenManager.update();
	},
	//inicia o carregamento dos assets
	initLoad:function()
	{
		var that = this;
		this.loader.onComplete = function() {
			that.onAssetsLoaded();
		};
		this.loader.onProgress = function() {
			that.onProgress();
		};
		this.loader.load();
	},
	//evento chamado quando os assets forem carregados
	onAssetsLoaded:function()
	{
		// this.stage.removeChild(this.loadText);
	},
	//onProgress do loader
	onProgress:function()
	{
		this.loadPercent = ((this.loader.assetURLs.length - this.loader.loadCount) / this.loader.assetURLs.length);
		this.stage.removeChild(this.loadText);
		//console.log(Math.floor(this.loadPercent* 100));
		this.loadText = new PIXI.Text(Math.floor(this.loadPercent* 100) + "%", {fill:"black", align:"center"});;
		this.stage.addChild(this.loadText);

		this.loadText.position.x = this.canvasWidth/2 - this.loadText.width/2;
		this.loadText.position.y = this.canvasHeight/2 - this.loadText.height/2;

	}
});