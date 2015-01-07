var SpritesheetEntity =  Entity.extend({
	init: function(){
		this._super( true );
		this.spritesheet;
	},

	build: function(spSheet){
	    this.spritesheet = spSheet;
	    this.spritesheet.setPosition(100,100);    
	    this.setVelocity(1,1);  
	},

	setPosition:function(x,y){	
		if(this.spritesheet){
			this.spritesheet.position.x = x;
			this.spritesheet.position.y = y;
			this.spritesheet.setPosition(x,y);
		}
	},
	//override temporario pra tentar resolver problemas na hora de dar o scale
    setScale: function(scaleX,scaleY){
        this.spritesheet.scale.x = scaleX;
        this.spritesheet.scale.y = scaleY;
        this.spritesheet.texture.scale.x = this.spritesheet.scale.x;
        this.spritesheet.texture.scale.y = this.spritesheet.scale.y;
        this.spritesheet.updateFrame();
    },
	getBounds: function(){
        this.bounds = {x: this.getPosition().x, y: this.getPosition().y, w: this.width, h: this.height};
        this.centerPosition = {x:this.width/2, y:this.height/2};
        this.collisionPoints = {
            up:{x:this.bounds.x + this.bounds.w / 2, y:this.bounds.y},
            down:{x:this.bounds.x + this.bounds.w / 2, y:this.bounds.y + this.bounds.h},
            bottomLeft:{x:this.bounds.x, y:this.bounds.y+this.bounds.h},
            topLeft:{x:this.bounds.x, y:this.bounds.y},
            bottomRight:{x:this.bounds.x + this.bounds.w, y:this.bounds.y+this.bounds.h},
            topRight:{x:this.bounds.x + this.bounds.w, y:this.bounds.y}
        };
        return this.bounds;
    },
	getPosition: function(){
		return this.spritesheet.position;
	},
	getTexture: function(){
		return this.spritesheet.texture.texture;		
	},

	getContent:function(){
		return this.spritesheet.container;
	},

	update: function(){
		// this.spritesheet.update();
		// this.spritesheet.position.x += this.velocity.x;
		// this.spritesheet.position.y += this.velocity.y;


		this.spritesheet.position.x += this.velocity.x;
		this.spritesheet.position.y += this.velocity.y;

		var temp = {x:this.spritesheet.position.x + this.velocity.x,
			y:this.spritesheet.position.y + this.velocity.y};

		this.spritesheet.setPosition(temp.x,temp.y);
		this.spritesheet.update();
	},
	getFramesByRange:function (label, init, end, type){
		var tempArray = new Array();
		var tempI = "";
		
		for (var i = init; i <= end; i++) {
			if(i < 10)
				tempI = "00" + i;
			else if(i < 100)
				tempI = "0" + i;
			else if(i < 1000)
				tempI =  i;
			tempArray.push(label+tempI);
		};
		if(type == "pingPong")
		{
			for (var i = end - 1; i > init; i--) {
				if(i < 10)
					tempI = "00" + i;
				else if(i < 100)
					tempI = "0" + i;
				else if(i < 1000)
					tempI =  i;
				tempArray.push(label+tempI);
			};
		}

		return tempArray;
	}
});