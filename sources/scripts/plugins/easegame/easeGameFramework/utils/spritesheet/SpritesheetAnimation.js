var SpritesheetAnimation =  Class.extend({
	init: function(){
                this.label = "";
                this.frames = [];
                this.timeFrame = 0;
                this.currentID = 0; 
                this.callback = null; 
                this.repeat = true; 
	},

	build:function(label, frames, timeFrame, repeat, callback){
		this.callback = callback;
                this.label = label;
                this.frames = frames;
                this.timeFrame = timeFrame;
                this.repeat = repeat;
	}
});