/*jshint undef:false */
var NodeModel = Class.extend({
	init:function(){
		this.position = [];
		this.dist = 0;
		this.parentPosition = [];
		this.childrenSides = [null,null,null,null];
		this.parentId = -1;
		this.parent = null;
		this.active = false;
		this.mode = 0;
		this.id = -1;
		this.seed = -1;
		this.tempAccSeed = this.seed;
		this.bg = null;
		this.mapData = null;
		this.topTile = {x:0,y:0};
		this.bottomTile = {x:0,y:0};
		this.leftTile = {x:0,y:0};
		this.rightTile = {x:0,y:0};
		this.placedTiles = [];
	},
	applySeed:function(){
		this.tempAccSeed = this.seed;
	},
	getNextFloat:function() {
	    var x = Math.sin(this.tempAccSeed++) * 10000;
	    return x - Math.floor(x);
	}
});