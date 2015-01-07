var DefaultButton = Class.extend({
	init:function(imgUp, imgOver, imgDown)
	{
		if(!imgDown)
			imgDown = imgOver;
		this.container = new PIXI.DisplayObjectContainer();
		this.textureButton = PIXI.Texture.fromImage(imgUp);
		this.textureButtonDown = PIXI.Texture.fromImage(imgDown);
		this.textureButtonOver = PIXI.Texture.fromImage(imgOver);
		this.shapeButton = new PIXI.Sprite(this.textureButton);
		this.isOver = false;
		this.isdown = false;
		this.width = 10;
		this.height = 10;
		this.clickCallback = null;
		this.mouseDownCallback = null;
		this.mouseUpCallback = null;
		this.container.addChild(this.shapeButton);
	},
    destroy:function(){
        this.textureButton.destroy();
        this.textureButtonDown.destroy();
        this.textureButtonOver.destroy();
        delete this.container;
    },
	build:function( width, height)
	{
		var that = this;

		if(width)
			this.width = width;
		else
			this.width = this.shapeButton.width;

		if(height)
			this.height = height;
		else
			this.height = this.shapeButton.height;



		this.shapeButton.buttonMode = true;

		//this.shapeButton.anchor.x = 0.5;
		//this.shapeButton.anchor.y = 0.5;

		this.shapeButton.position.x = 0;
		this.shapeButton.position.y = 0;

		if(width)
			this.shapeButton.width = this.width;
		if(height)
			this.shapeButton.height = this.height;

		this.shapeButton.setInteractive(true);

		this.shapeButton.mousedown = this.shapeButton.touchstart = function(data){
			if(that.mouseDownCallback != null)
				that.mouseDownCallback();
			that.isdown = true;
			that.shapeButton.setTexture(that.textureButtonDown);
			that.alpha = 1;
		}

        // set the mouseup and touchend callback..
        this.shapeButton.mouseup = this.shapeButton.touchend = this.shapeButton.touchoutside = this.shapeButton.mouseuoutside = this.shapeButton.touchendoutside = function(data){
           	this.isdown = false;
        	if(that.mouseUpCallback != null)
        		that.mouseUpCallback();

        	if(that.isOver)
        	{
        		that.shapeButton.setTexture(that.textureButtonOver);
        	}
        	else
        	{
        		that.shapeButton.setTexture(that.textureButton);
        	}

        }

        // set the mouseover callback..
        this.shapeButton.mouseover = function(data){

        	that.isOver = true;
        	//if(that.isdown)return
        	that.shapeButton.setTexture(that.textureButtonOver)
        }

        // set the mouseout callback..
        this.shapeButton.mouseout = function(data){

        	that.isOver = false;

        	//mouseDownCallback
        	//if(that.isdown)return
        	that.shapeButton.setTexture(that.textureButton)
        }

        this.shapeButton.click = function(data){
            // click!
            if(that.clickCallback != null)
            	that.clickCallback();
            
        //  alert("CLICK!")
    }

    this.shapeButton.tap = function(data){
            // click!
            if(that.clickCallback != null)
            	that.clickCallback();
            //this.alpha = 0.5;
        }
    },

    addLabel:function(text, marginX, marginY, autoAlign, acressX, acressY)
    {
    	this.container.addChild(text);
        if(!marginX){
            marginX = 0;
        }
        if(!marginY){
            marginY = 0;
        }
    	text.position.x = this.shapeButton.position.x;
    	text.position.y = this.shapeButton.position.y;
    	if(autoAlign)
    	{

    		var scaleFactorX = (this.shapeButton.width - marginX * 2) / text.width;
    		var scaleFactorY = (this.shapeButton.height - marginY * 2) / text.height;

    		if(scaleFactorX < scaleFactorY)
    		{
    			scaleFactorY = scaleFactorX;
    		}
    		else
    		{
    			scaleFactorX = scaleFactorY;
    		}


    		text.width*=scaleFactorX;
    		text.height*=scaleFactorY;

    		text.position.x = this.shapeButton.position.x + this.shapeButton.width / 2 - text.width / 2 +acressX;
    		text.position.y = this.shapeButton.position.y + this.shapeButton.height / 2 - text.height / 2+acressY;
    	}
        else
        {
            text.position.x = this.shapeButton.position.x + marginX;
            text.position.y = this.shapeButton.position.y + marginY;
        }
        // console.log(text);
    },
    setPosition:function(x,y)
    {
    	this.container.position.x = x;
    	this.container.position.y = y;
    },
    getContent:function()
    {
    	return this.container;
    },
    destroy:function()
    {

    }
});
