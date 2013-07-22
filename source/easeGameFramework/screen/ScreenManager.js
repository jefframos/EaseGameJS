var ScreenManager = Class.extend({
init:function()
	{
		this.label = "";
        this.childs = [];
        this.container = new PIXI.DisplayObjectContainer();
        this.currentScreen = null;
        this.canvasArea = {x:0, y:0};
	},
	build:function(label)
	{
		this.label = label;
	},
	addScreen:function(screen)
	{
		if(this.currentScreen === null)
			this.currentScreen = screen;

		this.childs.push(screen);
		screen.canvasArea = this.canvasArea;
		screen.screenManager = this;
	},
	change:function(screenLabel)
	{
		//if(this.currentScreen.screenLabel != screenLabel)
		{
			for(var i = 0; i < this.childs.length; i++){
				if(this.childs[i].screenLabel == screenLabel){
					if(this.currentScreen.getContent().parent)
					{
						this.container.removeChild(this.currentScreen.getContent());
						this.currentScreen.destroy();
					}
					this.currentScreen = this.childs[i];
					this.container.addChild(this.currentScreen.getContent());
					this.currentScreen.build();
				}			
			}
		}
	},
	update:function()
	{
		if(this.currentScreen != null)
			this.currentScreen.update();
	},
	setCanvasArea:function(canvasWidth, canvasHeight)
	{
		this.canvasArea.x = canvasWidth;
		this.canvasArea.y = canvasHeight;
	}

});