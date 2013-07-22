var Entity = Class.extend({

	init:function(){
		this.texture = '';
		this.sprite = '';
		this.velocity = { x:0, y:0 };
		this.gravity = 0;	
		this.kill = false;
		this.updateable = true;
		this.range = 10;
		this.collidable = true;
		this.layer;
		this.jumpPower = 2;		
	},
	//Constrói a entidade através de uma imagem
	build: function(img){
		this.texture = PIXI.Texture.fromImage(img);
		this.sprite = new PIXI.Sprite(this.texture);

		this.sprite.anchor.x = 0.5;
		this.sprite.anchor.y = 0.5;

		this.sprite.position.x = windowWidth/2;
		this.sprite.position.y = windowHeight/2;
		
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