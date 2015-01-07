var SimpleSprite =  Class.extend({
	init:function(img){
		if(typeof(img) === "string")
		{
			this.texture = new PIXI.Texture.fromImage(img);
		}
		else
			this.texture = img;

		this.container = new PIXI.Sprite(this.texture);
		// this.container.cacheAsBitmap = true;
	},
	getContent:function(){
		return this.container;
	},
	setPosition:function(x,y){
		this.container.position.x = x;
		this.container.position.y = y;
	}
});
