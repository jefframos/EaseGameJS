/*jshint undef:false */
var BoundCollisionSystem = Class.extend({
	init:function(container, debug){
		this.container = container;
		if(debug){
			this.graphDebug = new PIXI.Graphics();
			if(this.graphDebug){
	        	this.container.addChild(this.graphDebug);
	    	}
    	}
	},
	applyCollision:function(env, entities, colEntitiesTypes, precise){
		var tempEnv = null;
        var tempEntity = null;
        var isCollide = false;
        var tempEnvBounds = null;
        var tempEntityBounds = null;
        var countEnvs = 0;

        if(this.graphDebug){
            this.graphDebug.clear();
            this.graphDebug.beginFill(0xFF0000);
            // set the line style to have a width of 5 and set the color to red
            this.graphDebug.lineStyle(5, 0xFF0000);
        }
        

        for (var i = env.length - 1; i >= 0; i--) {
            var isTouch = false;

            //pega o ambiente
            tempEnv = env[i];
            if(tempEnv.type === 'environment' && tempEnv.collidable){
                tempEnvBounds = tempEnv.getBounds();
                for (var j = entities.length - 1; j >= 0; j--) {
                    tempEntity = entities[j];
                    //verifica se a entidade é colidivel
                    if(tempEntity.type !== 'environment' && tempEntity.collidable){
                        tempEntityBounds = tempEntity.getBounds();
                        tempEntityBounds.y += tempEntity.virtualVelocity.y;
                        tempEntityBounds.x += tempEntity.virtualVelocity.x;
                        // console.log(tempEntity.type);
                        if(this.testBoundsCollide(tempEnvBounds,tempEntityBounds))
                        {
                            var tempBounds = {x:0,y:0,w:1,h:1};
                            var touchCollection = {object:tempEnv,up:false, down:false,left:false, right:false, middleUp:false,middleDown:false,bottomLeft:false,bottomRight:false,topLeft:false,topRight:false};
                            if(tempEntity.boundsCollision){

                               	//console.log(tempEntity.collisionPoints);

                                tempBounds.x = tempEntityBounds.x + Math.abs(tempEntity.defaultVelocity*2);
                                tempBounds.y = tempEntity.collisionPoints.up.y + tempEntity.virtualVelocity.y * 2;
                                tempBounds.w = tempEntityBounds.w - Math.abs(tempEntity.defaultVelocity*2*2);
                                tempBounds.h = 1;

                                if(this.graphDebug) this.graphDebug.drawRect(tempBounds.x,tempBounds.y,tempBounds.w,tempBounds.h);
                                if(this.testBoundsCollide(tempEnvBounds,tempBounds) && tempEntity.virtualVelocity.y < 0){
                                    touchCollection.up = true;
                                }

                                tempBounds.x = tempEntityBounds.x + Math.abs(tempEntity.defaultVelocity*2);
                                tempBounds.y = tempEntity.collisionPoints.down.y + tempEntity.virtualVelocity.y * 2;
                                tempBounds.w = tempEntityBounds.w -  Math.abs(tempEntity.defaultVelocity*2*2);
                                tempBounds.h = 1;

                                if(this.graphDebug) this.graphDebug.drawRect(tempBounds.x,tempBounds.y,tempBounds.w,tempBounds.h);


                                if(this.testBoundsCollide(tempEnvBounds,tempBounds) && tempEntity.virtualVelocity.y > 0){
                                    touchCollection.down = true;
                                }

                                tempBounds.w = 1;
                                tempBounds.x = tempEntity.collisionPoints.topLeft.x + tempEntity.virtualVelocity.x * 2;
                                tempBounds.y = tempEntity.collisionPoints.topLeft.y +  Math.abs(tempEntity.defaultVelocity*2);
                                tempBounds.h = Math.abs(tempEntity.collisionPoints.topLeft.y - tempEntity.collisionPoints.bottomLeft.y)  - Math.abs(tempEntity.defaultVelocity*2*2);
                                
                                if(this.graphDebug) this.graphDebug.drawRect(tempBounds.x,tempBounds.y,tempBounds.w,tempBounds.h);

                                if(this.testBoundsCollide(tempEnvBounds,tempBounds) && tempEntity.virtualVelocity.x < 0){
                                    touchCollection.left = true;

                                }

                                tempBounds.w = 1;
                                tempBounds.x = tempEntity.collisionPoints.topRight.x + tempEntity.virtualVelocity.x * 2;
                                tempBounds.y = tempEntity.collisionPoints.topRight.y + Math.abs(tempEntity.defaultVelocity*2);
                                tempBounds.h = Math.abs(tempEntity.collisionPoints.topRight.y - tempEntity.collisionPoints.bottomRight.y)  - Math.abs(tempEntity.defaultVelocity*2*2);
                                
                                if(this.graphDebug) this.graphDebug.drawRect(tempBounds.x,tempBounds.y,tempBounds.w,tempBounds.h);
                                
                                if(this.testBoundsCollide(tempEnvBounds,tempBounds) && tempEntity.virtualVelocity.x > 0){
                                    touchCollection.right = true;
                                }
                                if(precise){
	                                tempBounds.w = 1;
	                                tempBounds.h = 1;
	                                tempBounds.x = tempEntity.collisionPoints.down.x;
	                                tempBounds.y = tempEntityBounds.y;
	                                if(this.testBoundsCollide(tempEnvBounds,tempBounds)){
	                                    touchCollection.middleUp = true;
	                                }
	                                tempBounds.w = 1;
	                                tempBounds.x = tempEntity.collisionPoints.down.x;
	                                tempBounds.y = tempEntity.collisionPoints.down.y;
	                                if(this.testBoundsCollide(tempEnvBounds,tempBounds)){
	                                    touchCollection.middleDown = true;
	                                }

	                                tempBounds.x = tempEntity.collisionPoints.bottomLeft.x;
	                                tempBounds.y = tempEntity.collisionPoints.bottomLeft.y;
	                                if(this.testBoundsCollide(tempEnvBounds,tempBounds)){
	                                    touchCollection.bottomLeft = true;

	                                }

	                                tempBounds.x = tempEntity.collisionPoints.bottomRight.x;
	                                tempBounds.y = tempEntity.collisionPoints.bottomRight.y;
	                                if(this.testBoundsCollide(tempEnvBounds,tempBounds)){
	                                    touchCollection.bottomRight = true;

	                                }

	                                tempBounds.x = tempEntity.collisionPoints.topLeft.x;
	                                tempBounds.y = tempEntity.collisionPoints.topLeft.y;
	                                if(this.testBoundsCollide(tempEnvBounds,tempBounds)){
	                                    touchCollection.topLeft = true;

	                                }

	                                tempBounds.x = tempEntity.collisionPoints.topRight.x;
	                                tempBounds.y = tempEntity.collisionPoints.topRight.y;
	                                if(this.testBoundsCollide(tempEnvBounds,tempBounds)){
	                                    touchCollection.topRight = true;
	                                }
                            	}
                                tempEntity.touch(touchCollection);
                            }
                            else if(tempEntity && tempEntity.touch){
                                tempEntity.touch(touchCollection);
                            }
                            isTouch = true;
                        }
                        tempEntity.isTouch = isTouch;
                    }
                }
            }
        }
	},
	testBoundsCollide:function(bound1, bound2){
        return (bound1.x + bound1.w) > bound2.x &&
                    (bound1.x) < (bound2.x + bound2.w) &&
                    (bound1.y + bound1.h) > bound2.y &&
                    (bound1.y) < (bound2.y + bound2.h);
    }
});