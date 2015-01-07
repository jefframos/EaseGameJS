/*jshint undef:false */
var DungeonGenerator = Class.extend({
	init:function(){
		this.random=0;
		this.numActivesNodes=0;
		this.maxDist=5;
		this.minNodes=5;
		this.seeds=1;
		this.rooms = [];//nodeModel
		this.maxNodes = 10;
		this.mostDistant = new NodeModel();
		this.nodeLock = new NodeModel();
		this.firstNode = new NodeModel();
		this.keyNode = new NodeModel();
		this.precision = 1;
		this.seed = 0;
		this.rooms = [];

	},
	generate:function(seed, precision, minMax, bounds,maxLenght, start)
	{
		this.seed = seed;
		//console.log('seed', seed);
		random = 0;
		if(maxLenght < 0){
			maxLenght = 99999;
		}
		this.minNodes = minMax[0];
		this.maxNodes = minMax[1];
		
		this.precision = precision;
		this.numActivesNodes = 0;
		this.maxDist = -999999999;
		this.seeds = 1;
		var i = 0;
		var j = 0;
		if(this.rooms.length <= 0)
		{
			for (i = 0; i < bounds[0]; i++)
			{
				var temp = [];
				for (j = 0; j < bounds[1]; j++)
				{
					var tempModel = new NodeModel();
					tempModel.position = [i, j];
					temp.push(tempModel);
				}
				this.rooms.push(temp);
			}
		}

		this.generateNodes(start?start[0]:Math.floor(bounds[0]/2), start?start[1]:Math.floor(bounds[1]/2),null,maxLenght);
		this.mostDistant.mode = 4;
		
		var keyDistance = -9999999999;

		for (k = 0; k < this.rooms.length; k++)
		{
			var item = this.rooms[k];
			for (i = 0; i < item.length; i++)
			{
				var dist = this.pointDistance(this.mostDistant.position[0], this.mostDistant.position[1], item[i].position[0], item[i].position[1]);
				if (keyDistance <= dist && item[i].active && item[i].parentId > 0)
				{
					keyDistance = dist;
					this.keyNode = item[i];
				}
				if(item[i].parentId > 0){
					if (item[i].position[0] === this.mostDistant.parentPosition[0] && item[i].position[1] === this.mostDistant.parentPosition[1]){
						this.nodeLock = item[i];
					}
				}
			}
		}
		
		if(this.nodeLock){
			this.nodeLock.mode = 5;
		}
		if (this.keyNode){
			this.keyNode.mode = 6;
		}

		//atribui os filhos
		// if (item[i].parentPosition[0] < item[i].position[0])
		// 						tempRoomView.a_left.visible = true;
		// 					if (item[i].parentPosition[0] > item[i].position[0])
		// 						tempRoomView.a_right.visible = true;
		// 					if (item[i].parentPosition[1] < item[i].position[1])
		// 						tempRoomView.a_up.visible = true;
		// 					if (item[i].parentPosition[1] > item[i].position[1])
		// 						tempRoomView.a_down.visible = true;
	},
	
	log:function()
	{
		for (var i = 0; i < this.rooms.length; i++)
		{
			var tempStr = '';
			var item = this.rooms[i];
			var temp = [];
			for (var j = 0; j < item.length; j++)
			{
				if(item[j].mode === 0)
				{
					tempStr += ('| - |');
				}
				if(item[j].mode === 1)
				{
					tempStr += ('| ♥ |');
				}
				if(item[j].mode === 2)
				{
					tempStr += ('| o |');
				}
				if(item[j].mode === 3)
				{
					tempStr += ('| c |');
				}
				if(item[j].mode === 4)
				{
					tempStr += ('| b |');
				}
				if(item[j].mode === 5)
				{
					tempStr += ('| l |');
				}
				if(item[j].mode === 6)
				{
					tempStr += ('| K |');
				}
			}
			console.log(tempStr + '   ' + i);
		}

		console.log(this.firstNode);

	},
	
	generateNodes:function(i, j, parent, maxLeght, forceAdd)
	{
		if ((this.numActivesNodes >= this.maxNodes || maxLeght <= 0) && !forceAdd){
			//console.log('maxLeght ', maxLeght, !forceAdd);

			return;
		}
		if (this.numActivesNodes > 50){
			return;
		}
		var node = null;
		for (var jj = 0; jj < this.rooms.length; jj++)
		{
			var item = this.rooms[jj];

			for (var ii = 0; ii < item.length; ii++)
			{
				if (item[ii].position[0] === i && item[ii].position[1] === j)
				{
					node = item[ii];
				}
			}
		}

		if (!node)
		{
			// if(forceAdd){
			// 	console.log('numActivesNodes', this.numActivesNodes);
			// }
			//minNodes ++;
			return;
		}

		// if ((!node.active || (node.active && node.id === 1)) || forceAdd)
		if (!node.active || forceAdd)
		{
			// if (node.id === 1){
			// 	return;
			// }
			
			this.minNodes--;
			node.mode = 2;
			this.numActivesNodes++;
			node.active = true;
			if(node.id < 0){
				node.id = this.numActivesNodes;
				node.seed = this.getNextFloat();
				node.applySeed();
			}
			if (parent && node.id !== 1)
			{
				//console.log('o id ', node.id, ' é filho de ', parent.id);
				node.parentPosition = parent.position;
				node.parentId = parent.id;
				node.parent = parent;
				var dist = this.pointDistance(parent.position[0], parent.position[1],this.firstNode.position[0], this.firstNode.position[1]);
				node.dist = dist;
				if (this.maxDist <= dist && node.parentId > 2)
				{
					this.maxDist = dist;
					this.mostDistant = node;
				}
				node.dist = dist;

				for (ri = this.rooms.length - 1; ri >= 0; ri--) {
					var tempNodeArray = this.rooms[ri];
					for (nj = tempNodeArray.length - 1; nj >= 0; nj--) {
						if(tempNodeArray[nj].id === node.parentId)
						{
							//o i e o j são invertidos
							if (tempNodeArray[nj].position[1] > node.position[1]){
								tempNodeArray[nj].childrenSides[0] = node;
							}
							else if (tempNodeArray[nj].position[1] < node.position[1]){
								tempNodeArray[nj].childrenSides[1] = node;
							}
							else if (tempNodeArray[nj].position[0] > node.position[0]){
								tempNodeArray[nj].childrenSides[2] = node;
							}
							else if (tempNodeArray[nj].position[0] < node.position[0]){
								tempNodeArray[nj].childrenSides[3] = node;
							}
								
						}
					}
				}

				//o i e o j são invertidos
				if (node.parent.position[1] < node.position[1]){
					node.childrenSides[0] = node.parent;
				}
				else if (node.parent.position[1] > node.position[1]){
					node.childrenSides[1] = node.parent;
				}
				else if (node.parent.position[0] < node.position[0]){
					//console.log('o node ', node.id,' tem um pai em cima');
					node.childrenSides[2] = node.parent;
				}
				else if (node.parent.position[0] > node.position[0]){
					node.childrenSides[3] = node.parent;
				}
			}
			else
			{
				node.id = 1;
				node.mode = 1;
				this.firstNode = node;
			}
		}
		else
		{
			// if(forceAdd){
			// 	console.log('forceAdd3', forceAdd);
			// }
			this.minNodes++;
			// console.log('return seed No node ', this.seed, node);
			return;
		}
		
		{
			var has = false;
			//if (random.nextNumber() < seeds || this.minNodes > 0)
			//if (Math.random() < this.seeds || this.minNodes > 0)
			if (this.getNextFloat() < this.seeds || this.minNodes > 0)
			{
				this.seeds *= this.precision;
				var tmpArr = [0, 0];
				var arrayGens = [];
				var rndTest = node.id === 1;// || this.getNextFloat() < 0.5;
				var rndValue = rndTest ? 0.9 : 0.4;
				for (var k = 0; k < 4; k++)
				{
					//if (random.nextNumber() < rndValue)
					//if (Math.random() < rndValue)
					if (this.getNextFloat() < rndValue)
					{
						has = true;
						if (k === 0)
						{
							tmpArr = [-1, 0];
						}
						else if (k === 1)
						{
							tmpArr = [1, 0];
						}
						else if (k === 2)
						{
							tmpArr = [0, 1];
						}
						else if (k === 3)
						{
							tmpArr = [0, -1];
						}
						var objGen = { };
						objGen.i = i + tmpArr[0];
						objGen.j = j + tmpArr[1];
						objGen.parentPosition = [i, j];
						objGen.parent = node;
						arrayGens.push(objGen);
					}
				}
				for (var n = arrayGens.length - 1; n >= 0; n--) {
					var obj = arrayGens[n];
					if(!rndTest)
					{
						maxLeght --;
					}
					this.generateNodes(obj.i, obj.j, obj.parent,maxLeght, rndTest);
				}
				if (this.minNodes > 0 || this.seeds >= 1)
				{
					var tempRnd = this.getNextFloat();// Math.random();//random.nextNumber();
					if (tempRnd < 0.25)
					{
						tmpArr = [-1, 0];
					}
					else if (tempRnd < 0.50)
					{
						tmpArr = [1, 0];
					}
					else if (tempRnd < 0.75)
					{
						tmpArr = [0, 1];
					}
					else
					{
						tmpArr = [0, -1];
					}

					this.generateNodes(i + tmpArr[0], j + tmpArr[1], node,--maxLeght);
				}
			}
			if (!has){
				node.mode = 3;
			}
		}
	},
	pointDistance: function(x, y, x0, y0){
	    return Math.sqrt((x -= x0) * x + (y -= y0) * y);
	},
	getNextFloat:function() {
	    var x = Math.sin(this.seed++) * 10000;
	    return x - Math.floor(x);
	}
});