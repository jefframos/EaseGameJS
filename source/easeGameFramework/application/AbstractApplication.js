var AbstractApplication = Class.extend({
	//inicializa a aplicacao com o stage, um loader e uma screen manager
	init:function(canvasWidth, canvasHeight)
	{
		this.stage = new PIXI.Stage(0x66FF99, true);

		this.screenManager = new ScreenManager();
		this.screenManager.build("MainScreenManager");
		this.screenManager.setCanvasArea(canvasWidth, canvasHeight);
		this.stage.addChild(this.screenManager.container);

		this.loader;
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
		this.loader.load();
	},
	//evento chamado quando os assets forem carregados
	onAssetsLoaded:function()
	{
	}
});