var Layer =  Class.extend({
	init: function(){
		this.childs = new Array();
		this.name;	
		this.container = new PIXI.DisplayObjectContainer();
		this.updateable = true;
		this.layerManager = null;
		this.kill = false;
	},
	build: function(name){
		this.name = name;	
	},
	//calcula distancia entre dois pontos, utilizada para a colisão
	getContent: function(){
	    return this.container;
	},
	//adiciona uma entidade na camada e no palco
	addChild: function(child){
		this.childs.push(child);
		this.container.addChild(child.getContent());
		child.setParentLayer(this);
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
	//aplica colisão de uma entidade com os outros filhos da camada, a colisão é baseada em coordenadas euclidianas
	collideChilds: function(child){
		var isCollide = false;
		var objectCollided = new Array();
		for(var i = 0; i < this.childs.length; i++){
			if(this.childs[i] != child){
				if(this.pointDistance(child.getPosition().x, child.getPosition().y, this.childs[i].getPosition().x, this.childs[i].getPosition().y) < (child.range + this.childs[i].range)){
					
					objectCollided.push(this.childs[i]);
					isCollide = true;
				}											
			}
		}

		if(isCollide){
			child.collide(objectCollided);
		}

	},
	//calcula distancia entre dois pontos, utilizada para a colisão
	pointDistance: function(x, y, x0, y0){
	    return Math.sqrt((x -= x0) * x + (y -= y0) * y);
	},
	setManager: function(layerManager){
	   this.layerManager = layerManager;
	},
});