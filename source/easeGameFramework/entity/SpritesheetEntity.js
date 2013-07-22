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
		
		this.spritesheet.position.x = x;
		this.spritesheet.position.y = y;
		this.spritesheet.setPosition(x,y);
	},

	getPosition: function(){
		return this.spritesheet.position;
	},

	getContent:function(){
		return this.spritesheet.container;
	},

	update: function(){
		this.spritesheet.update();
		this.spritesheet.position.x += this.velocity.x;
		this.spritesheet.position.y += this.velocity.y;
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