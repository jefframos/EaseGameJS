var Entity = Class.extend({

	init:function(){
		this.texture = '';
		this.sprite = '';
		this.velocity = { x:0, y:0 };
		this.centerPosition = { x:0, y:0 };
		this.gravity = 0;	
		this.kill = false;
		this.updateable = true;
		this.boundsCollision = false;
		this.range = 10;
		this.collidable = true;
        this.virtualVelocity = { x:0, y:0 };
		this.layer;
		this.jumpPower = 2;		
		this.life = 2;
		this.collisionPointsMarginDivide = 8;
		this.defaultVelocity = 0;
	},
	//Constrói a entidade através de uma imagem
	build: function(img){
		this.texture = PIXI.Texture.fromImage(img);
		this.sprite = new PIXI.Sprite(this.texture);

		this.sprite.anchor.x = 0.5;
		this.sprite.anchor.y = 0.5;

		//this.sprite.position.x = windowWidth/2;
		//this.sprite.position.y = windowHeight/2;
		
	},
	getBounds: function(){
        this.bounds = {x: this.getPosition().x - this.width *this.sprite.anchor.x, 
        	y: this.getPosition().y - this.height *this.sprite.anchor.y, 
        	w: this.sprite.width, 
        	h: this.sprite.height};
        return this.bounds;
    },
    debugPolygon: function(color, force){
        if(this.polygon && this.polygon.points){
            if(this.lastColorDebug !== color || force){
                if(this.debugGraphic.parent === null && this.getContent().parent !== null)
                {
                    this.getContent().parent.addChild(this.debugGraphic);
                }
                this.lastColorDebug = color;
                this.gambAcum ++;
                if(this.debugGraphic !== undefined){
                    this.debugGraphic.clear();
                }else{
                    this.debugGraphic = new PIXI.Graphics();
                }
                // console.log(this.polygon);
                this.debugGraphic.beginFill(color, 0.5);
                this.debugGraphic.lineStyle(1, 0xffd900);
                this.debugGraphic.moveTo(this.polygon.points[this.polygon.points.length - 1].x,this.polygon.points[this.polygon.points.length - 1].y);
                // console.log('this.polygon',this.polygon.points);

                for (var i = this.polygon.points.length - 2; i >= 0; i--) {
                    this.debugGraphic.lineTo(this.polygon.points[i].x, this.polygon.points[i].y);
                }
                this.debugGraphic.endFill();
            }
        }
    },
    updateCollisionPoints: function(makePoly){
        this.collisionPoints = {
            up:{x:this.bounds.x + this.bounds.w / 2, y:this.bounds.y},
            down:{x:this.bounds.x + this.bounds.w / 2, y:this.bounds.y + this.bounds.h},
            bottomLeft:{x:this.bounds.x, y:this.bounds.y+this.bounds.h - this.bounds.h/this.collisionPointsMarginDivide},
            topLeft:{x:this.bounds.x, y:this.bounds.y + this.bounds.h/this.collisionPointsMarginDivide},
            bottomRight:{x:this.bounds.x + this.bounds.w, y:this.bounds.y+this.bounds.h - this.bounds.h/this.collisionPointsMarginDivide},
            topRight:{x:this.bounds.x + this.bounds.w, y:this.bounds.y + this.bounds.h/this.collisionPointsMarginDivide}
        };
    	// console.log('updateCollisions', this.collisionPoints);
		if(makePoly)
        this.polygon = new PIXI.Polygon(new PIXI.Point(this.bounds.x + this.bounds.w / 2, this.bounds.y),
        	new PIXI.Point(this.bounds.x, this.bounds.y + this.bounds.h/this.collisionPointsMarginDivide),
        	new PIXI.Point(this.bounds.x, this.bounds.y+this.bounds.h - this.bounds.h/this.collisionPointsMarginDivide),
        	new PIXI.Point(this.bounds.x + this.bounds.w / 2, this.bounds.y + this.bounds.h),
        	new PIXI.Point(this.bounds.x + this.bounds.w, this.bounds.y+this.bounds.h - this.bounds.h/this.collisionPointsMarginDivide),
        	new PIXI.Point(this.bounds.x + this.bounds.w, this.bounds.y + this.bounds.h/this.collisionPointsMarginDivide));
    },
    //Seta a layer pai da entidade
	preKill: function(){
		this.kill = true;
	},
	//Seta a layer pai da entidade
	setParentLayer: function(parentLayer){
		this.layer = parentLayer;
	},
	//seta escala
	setScale: function(x,y){
		this.sprite.scale.x = x;
		this.sprite.scale.y = y;
	},
	//retorna o container que está a imagem
	getContent: function(){
		return this.sprite;
	},
	//retorna a posicao
	getPosition: function(){
		return this.sprite.position;
	},
	//seta a posicao
	setPosition: function(x,y){
		this.sprite.position.x = x;
		this.sprite.position.y = y;
	},
	//seta as velocidades
	setVelocity: function(x,y){
		this.velocity.x = x;
		this.velocity.y = y;
	},
	//atualiza a posicao da entidade através da velocidade
	update: function(){
		this.sprite.position.x += this.velocity.x;
		this.sprite.position.y += this.velocity.y;
	},
	//aplica a gravidade
	applyGravity: function(){
		this.velocity.y += this.gravity;	
	},
	//pula
	jump: function(){
		this.velocity.y = -this.jumpPower;
	},
	//seta a gravidade
	setGravity: function(gravity){
		this.gravity = gravity;
	},
	//callback chamada quando houver colisão
	collide: function(arrayCollide){
	}
});