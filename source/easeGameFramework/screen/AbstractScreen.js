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
	},
	build:function()
	{
		
	},
	//calcula distancia entre dois pontos, utilizada para a colisão
	getContent: function(){
		return this.container;
	},
	//adiciona uma entidade no palco
	addChild: function(child){
		this.childs.push(child);

		if(child instanceof PIXI.Text)
		{
			console.log("add texto");
			this.container.addChild(child);
		}
		else
			this.container.addChild(child.getContent());
	},
	//remove a entidade da camada e do palco
	removeChild: function(child){
		console.log(child);

		if(child instanceof PIXI.Text)
		{
			console.log("remove texto");
		}
		for(var i = 0; i < this.childs.length; i++){
			if(this.childs[i] == child){
				this.childs.splice(i,1);
				
				if(child instanceof PIXI.Text)
				{
					console.log("remove texto");
					this.container.removeChild(child);
				}
				else
					this.container.removeChild(child.getContent());
				
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
		build();
	},

	transitionOut:function(callback)
	{
		outCallback = callback;
		callback();
	},
	destroy:function()
	{    
		while (this.childs.length > 0)
		{
			this.removeChild(this.childs[0]);
		}
		this.childs = new Array();
	},
});