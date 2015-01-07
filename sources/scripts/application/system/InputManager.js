/*jshint undef:false */
var InputManager = Class.extend({
	init: function (parent){
		var game = parent;
		var self = this;
		this.vecPositions = [];
		document.body.addEventListener('mouseup', function(e){
			if(game.player){
				game.mouseDown = false;
			}
		});
		document.body.addEventListener('mousedown', function(e){
			//só atira se não tiver na interface abaixo
			//TODO: melhorar isso
			if(game.player && APP.getMousePos().x < windowWidth && APP.getMousePos().y < windowHeight - 70){
				game.mouseDown = true;
			}
		});
		document.body.addEventListener('keyup', function(e){
			if(game.player){
				if(e.keyCode === 87 || e.keyCode === 38 && game.player.velocity.y < 0){
					self.removePosition('up');
				}
				else if(e.keyCode === 83 || e.keyCode === 40 && game.player.velocity.y > 0){
					self.removePosition('down');
				}
				else if(e.keyCode === 65 || e.keyCode === 37 && game.player.velocity.x < 0){
					self.removePosition('left');
				}
				else if(e.keyCode === 68 || e.keyCode === 39 && game.player.velocity.x > 0){
					self.removePosition('right');
				}
				else if(e.keyCode === 32){
					// game.useShortcut(5);
					game.player.hurt(5);
				}
				else if(e.keyCode === 49 || e.keyCode === 50 || e.keyCode === 51 || e.keyCode === 52 || e.keyCode === 81  || e.keyCode === 69){
					var id = 1;
					if(e.keyCode === 50){
						id = 2;
					}else if(e.keyCode === 51){
						id = 3;
					}else if(e.keyCode === 52){
						id = 4;
					}
					// else if(e.keyCode === 81){ Q
					// 	id = 4;
					// }else if(e.keyCode === 69){ E
					// 	id = 5;
					// }


					game.useShortcut(id - 1);
				}
				game.player.updatePlayerVel(self.vecPositions);
			}
		});
		document.body.addEventListener('keydown', function(e){
			var vel = 6;
			//console.log('keydown');
			if(game.player){
				if(e.keyCode === 87 || e.keyCode === 38){
					self.removePosition('down');
					self.addPosition('up');
				}
				else if(e.keyCode === 83 || e.keyCode === 40){
					self.removePosition('up');
					self.addPosition('down');
				}
				else if(e.keyCode === 65 || e.keyCode === 37){
					self.removePosition('right');
					self.addPosition('left');
				}
				else if(e.keyCode === 68 || e.keyCode === 39){
					self.removePosition('left');
					self.addPosition('right');
				}
				game.player.updatePlayerVel(self.vecPositions);
			}
		});
	},
	//
    removePosition:function(position){
        for (var i = this.vecPositions.length - 1; i >= 0; i--) {
            if(this.vecPositions[i] === position)
            {
                this.vecPositions.splice(i,1);
            }
        }
    },
    //
    addPosition:function(position){
        var exists = false;

        for (var i = this.vecPositions.length - 1; i >= 0; i--) {
            if(this.vecPositions[i] === position)
            {
                exists = true;
            }
        }

        if(!exists){
            this.vecPositions.push(position);
        }
    },
    // updatePlayerVel:function()
    // {
    //     if(this.player && this.vecPositions){
    //         var hasAxysY = false;
    //         var hasAxysX = false;
    //         if(this.vecPositions.length === 0){
    //             this.player.virtualVelocity.x = 0;
    //             this.player.virtualVelocity.y = 0;
    //         }
    //         for (var i = this.vecPositions.length - 1; i >= 0; i--) {

    //             if(this.vecPositions[i] === 'up'){
    //                 this.player.virtualVelocity.y = -this.player.defaultVelocity;
    //                 hasAxysY = true;
    //             }
    //             else if(this.vecPositions[i] === 'down'){
    //                 this.player.virtualVelocity.y = this.player.defaultVelocity;
    //                 hasAxysY = true;
    //             }

    //             if(this.vecPositions[i] === 'left'){
    //                 this.player.virtualVelocity.x = -this.player.defaultVelocity;
    //                 hasAxysX = true;
    //             }
    //             else if(this.vecPositions[i] === 'right'){
    //                 this.player.virtualVelocity.x = this.player.defaultVelocity;
    //                 hasAxysX = true;
    //             }
    //         }

    //         if(!hasAxysY){
    //             this.player.virtualVelocity.y = 0;
    //         }
    //         if(!hasAxysX){
    //             this.player.virtualVelocity.x = 0;
    //         }

    //     }
    // },
});