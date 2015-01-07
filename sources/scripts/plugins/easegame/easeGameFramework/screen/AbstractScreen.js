var AbstractScreen = Class.extend({
	init:function(label)
	{
		this.screenLabel = label;
		this.screenManager = null;
		this.childs = [];
		this.outCallback = null;
		this.container = new PIXI.DisplayObjectContainer();
		this.updateable = true;
		this.layerManager = null;
		this.canvasArea = {x:0, y:0};

		this.loader;
		this.loadPercent;
		this.loadText = new PIXI.Text("0%", {font:"20px Luckiest Guy", fill:"black", align:"center"});;
		this.container.addChild(this.loadText);
		this.loadText.position.x = this.canvasWidth/2 - this.loadText.width/2;
		this.loadText.position.y = this.canvasHeight/2 - this.loadText.height/2;



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
	build:function()
	{
        if(AbstractScreen.debug)console.log('build',this.screenLabel);		
	},
	//calcula distancia entre dois pontos, utilizada para a colisão
	getContent: function(){
		return this.container;
	},
	//evento chamado quando os assets forem carregados
	onAssetsLoaded:function()
	{
		this.container.removeChild(this.loadText);
	},
	//onProgress do loader
	onProgress:function()
	{
		this.loadPercent = ((this.loader.assetURLs.length - this.loader.loadCount) / this.loader.assetURLs.length);
		if(this.loadText.parent)
			this.container.removeChild(this.loadText);
		this.loadText = new PIXI.Text(Math.floor(this.loadPercent* 100) + "%", {fill:"black", align:"center"});;
		this.container.addChild(this.loadText);
		this.loadText.position.x = this.canvasArea.x/2 - this.loadText.width/2;
		this.loadText.position.y = this.canvasArea.y/2 - this.loadText.height/2;

	},
	//adiciona uma entidade no palco
	addChild: function(child){
		this.childs.push(child);

		if(child.getContent != undefined)
			this.container.addChild(child.getContent());
		else
			this.container.addChild(child);

		
	},
	//remove a entidade da camada e do palco
	removeChild: function(child){
		if(child instanceof PIXI.Text)
		{
		}
		for(var i = 0; i < this.childs.length; i++){
			if(this.childs[i] == child){
				this.childs.splice(i,1);
				if(this.container)
				{
					if(child.getContent != undefined)
						this.container.removeChild(child.getContent());
					else
					{
						//console.log("REMOVEU DE BOAS");
						this.container.removeChild(child);
					}

				}
				return;
			}			
		}
	},
	//atualiza a camada e os filhos, verifica se alguma entidade está "kill", se estiver, remove do palco e da camada
	update: function(){

		for(var i = 0; i < this.childs.length; i++){
			if(this.childs[i].kill){
				this.removeChild(this.childs[i]);
			}
			
			if(this.childs[i]){
				if(this.childs[i].updateable){				
					this.childs[i].update();	
				}
			}				
		}
	},
	transitionIn:function()
	{
		if(AbstractScreen.debug)console.log('transitionIn', this.screenLabel);
		this.build();
	},
	transitionOut:function(nextScreen, container)
	{
		if(AbstractScreen.debug)console.log('transitionOut', this.screenLabel,'to', nextScreen.screenLabel);
		this.destroy();
		container.removeChild(this.getContent());
		nextScreen.transitionIn();
	},
	destroy:function()
	{    
		if(AbstractScreen.debug)console.log('destroy', this.screenLabel);
		while (this.childs.length > 0)
		{
			var temp = this.childs[0];
			
			//if(temp.parent)
			this.removeChild(this.childs[0]);
				//console.log(temp);
			//else
			//	this.childs.splice(0,1);

			if(typeof(temp.destroy)=="function")
				temp.destroy();

			delete temp;
		}
		this.childs = new Array();
	},
});