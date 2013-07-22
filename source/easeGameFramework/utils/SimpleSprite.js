var SimpleSprite =  Class.extend({
	init:function(texURL){
		
		this.texture = new PIXI.Texture.fromImage(texURL);
		this.container = new PIXI.Sprite(this.texture);
	},
	getContent:function(){
		return this.container;
	}
});
