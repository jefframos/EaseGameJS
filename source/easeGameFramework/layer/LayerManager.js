var LayerManager =  Class.extend({
	init: function(){
		this.childs = new Array();
		this.name;	
		this.container = new PIXI.DisplayObjectContainer();
		this.updateable = true;
	},
	build: function(name){
		this.name = name;	
	},
	addLayer: function(layer){
		this.childs.push(layer);
		this.container.addChild(layer.container);
		layer.setManager(this);
	},
	getContent:function()
	{
		return this.container;
	},
	//remove a entidade da camada e do palco
	removeChild: function(child){
		for(var i = 0; i < this.childs.length; i++){
			if(this.childs[i] == child){
				this.childs.splice(i,1);
				this.container.removeChild(child.getContent());
				return;
			}			
		}
	},
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
});