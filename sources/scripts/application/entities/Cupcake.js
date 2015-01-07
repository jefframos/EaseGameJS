/*jshint undef:false */
var Cupcake = SpritesheetEntity.extend({
	init:function(){
		this._super( true );
	},
	build:function(){
		//the texture shoud be loaded before this class are instanced
		//the label, is the label on the json of texture loaded
		//the function 'getFramesByRange', is just a helper, this return one array with the labels of textures on json

		var self = this;
		var motionIdle = new SpritesheetAnimation();
		motionIdle.build('idle', this.getFramesByRange('cupcake10', 0, 13), 1, true, null);

		var motionRun = new SpritesheetAnimation();
		motionRun.build('run', this.getFramesByRange('cupcake10', 14, 37), 0, true, null);

		var motionPounch = new SpritesheetAnimation();
		motionPounch.build('pounch', this.getFramesByRange('cupcake10', 38, 59), -1, false, function(){
			self.spritesheet.play('idle');
		});

		var motionThrow = new SpritesheetAnimation();
		motionThrow.build('throw', this.getFramesByRange('cupcake10', 60, 107), -2, false, function(){
			self.spritesheet.play('idle');
		});

		var motionHurt = new SpritesheetAnimation();
		motionHurt.build('hurt', this.getFramesByRange('cupcake10', 108, 123), -2, false, function(){
			self.spritesheet.play('idle');
		});

		this.spritesheet = new Spritesheet();
		this.spritesheet.addAnimation(motionIdle);
		this.spritesheet.addAnimation(motionRun);
		this.spritesheet.addAnimation(motionPounch);
		this.spritesheet.addAnimation(motionThrow);
		this.spritesheet.addAnimation(motionHurt);
		this.spritesheet.play('idle');
	},
	update:function(){
		this._super();
	},
	destroy:function(){
		this._super();
	}
});