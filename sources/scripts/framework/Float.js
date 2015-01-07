/*jshint undef:false */
var Float = Class.extend({
	init:function(seed){
		this.seed = seed;
		this.tempAccSeed = this.seed;
	},
	applySeed:function(){
		this.tempAccSeed = this.seed;
	},
	getNextFloat:function() {
	    var x = Math.sin(this.tempAccSeed++) * 10000;
	    return x - Math.floor(x);
	}
});