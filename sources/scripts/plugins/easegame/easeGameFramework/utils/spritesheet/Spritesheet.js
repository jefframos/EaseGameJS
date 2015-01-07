var Spritesheet =  Class.extend({
	init: function(){
		this.animations = [];
		this.currentAnimation = null;
		this.texture = null;
		this.timeElapsed = 0;
		this.currentFrame = 0;
		this.container = new PIXI.DisplayObjectContainer();
		this.position = {x:0, y:0};
		this.scale = {x:1, y:1};
	},

	build:function(){
		
	},
	//altera o frame da animacao
	setFrame: function(frame){
		this.currentAnimation = null;
		this.currentFrame = frame;
	},//altera o frame da animacao
	setScale: function(scaleX,scaleY){
		this.scale.x = scaleX;
		this.scale.y = scaleY;
		this.texture.scale.x = this.scale.x;
		this.texture.scale.y = this.scale.y;
		this.updateFrame();
	},
	//adiciona uma animacao na lista de animações
	addAnimation: function(animation){
		this.animations.push(animation);
		if(this.texture == null){
			this.currentAnimation = animation;
			this.texture = PIXI.Sprite.fromFrame(this.currentAnimation.frames[this.currentAnimation.currentID]);
			this.container.addChild(this.texture);
		}		
	},
	//executa a animação
	play: function(label){
		for (var i = 0; i < this.animations.length; i++)
		{
			if (this.animations[i].label == label)
				this.currentAnimation = this.animations[i];

			if (!this.currentAnimation.repeat)
				this.currentAnimation.currentID = 0;
		}
	},
	//altera a posicao do spritesheet
	setPosition:function(x,y){
		this.position.x = x;
		this.position.y = y;

		this.texture.position.x = this.position.x - this.texture.width / 2;
		this.texture.position.y = this.position.y - this.texture.height / 2;
		this.updateFrame();
	},
	//atualiza as animacoes
	update: function(){
		var stop = false;
		if (this.currentAnimation != null)
		{
			//this.timeElapsed++;
			if (this.timeElapsed > this.currentAnimation.timeFrame)
			{
				this.currentAnimation.currentID++;                
				if (this.currentAnimation.currentID >= this.currentAnimation.frames.length)
				{
					if (this.currentAnimation.repeat)
						this.currentAnimation.currentID = 0;
					else
						this.currentAnimation.currentID = this.currentAnimation.frames.length - 1;

					//console.log(this.currentAnimation.frames[this.currentAnimation.frames.length - 1]);
					if (this.currentAnimation.callback != null)
						this.currentAnimation.callback();
				}

				this.timeElapsed = 0;
				
				if(!stop)
					this.updateFrame();
			}
			else
				this.timeElapsed++;
		}
	},
	//atualiza o frame da animacao
	updateFrame: function(){
		this.container.removeChild(this.texture);
		var frameID = 0;
		if(this.currentAnimation == null){
			frameID = this.currentFrame;
		}else{
		 	frameID = this.currentAnimation.frames[this.currentAnimation.currentID];
		}
		this.texture =  PIXI.Sprite.fromFrame(frameID); 
		// this.texture =  PIXI.Sprite.fromFrame(this.currentAnimation.frames[this.currentAnimation.currentID]); 
		this.texture.scale.x = this.scale.x;
		this.texture.scale.y = this.scale.y;
		this.texture.position.x = this.position.x - this.texture.width / 2;
		//this.texture.position.x = Math.floor(this.position.x - this.texture.width / 2);
		this.texture.position.y = this.position.y - this.texture.height / 2; 
		//this.texture.position.y = Math.floor(this.position.y - this.texture.height / 2); 
		this.container.addChild(this.texture);	    
	}
});