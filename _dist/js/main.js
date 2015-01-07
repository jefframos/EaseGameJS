/*! jefframos 07-01-2015 */
function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    var h, s, max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2;
    if (max === min) h = s = 0; else {
        var d = max - min;
        switch (s = l > .5 ? d / (2 - max - min) : d / (max + min), max) {
          case r:
            h = (g - b) / d + (b > g ? 6 : 0);
            break;

          case g:
            h = (b - r) / d + 2;
            break;

          case b:
            h = (r - g) / d + 4;
        }
        h /= 6;
    }
    return {
        h: h,
        s: s,
        l: l
    };
}

function hslToRgb(h, s, l) {
    function hue2rgb(p, q, t) {
        return 0 > t && (t += 1), t > 1 && (t -= 1), 1 / 6 > t ? p + 6 * (q - p) * t : .5 > t ? q : 2 / 3 > t ? p + (q - p) * (2 / 3 - t) * 6 : p;
    }
    var r, g, b;
    if (0 === s) r = g = b = l; else {
        var q = .5 > l ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3), g = hue2rgb(p, q, h), b = hue2rgb(p, q, h - 1 / 3);
    }
    return {
        r: Math.round(255 * r),
        g: Math.round(255 * g),
        b: Math.round(255 * b)
    };
}

function toHex(n) {
    return n = parseInt(n, 10), isNaN(n) ? "00" : (n = Math.max(0, Math.min(n, 255)), 
    "0123456789ABCDEF".charAt((n - n % 16) / 16) + "0123456789ABCDEF".charAt(n % 16));
}

function rgbToHex(R, G, B) {
    return parseInt("0x" + toHex(R) + toHex(G) + toHex(B));
}

function hexToRgb(hex) {
    var r = hex >> 16, g = hex >> 8 & 255, b = 255 & hex;
    return {
        r: r,
        g: g,
        b: b
    };
}

function addSaturation(color, value) {
    var rgb = hexToRgb(color), hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    return hsl.s *= value, hsl.s > 1 && (hsl.s = 1), hsl.s < 0 && (hsl.s = 0), rgb = hslToRgb(hsl.h, hsl.s, hsl.l), 
    rgbToHex(rgb.r, rgb.g, rgb.b);
}

function pointDistance(x, y, x0, y0) {
    return Math.sqrt((x -= x0) * x + (y -= y0) * y);
}

function degreesToRadians(deg) {
    return deg * (Math.PI / 180);
}

function radiansToDegrees(rad) {
    return rad / (Math.PI / 180);
}

function testMobile() {
    return !1;
}

function update() {
    requestAnimFrame(update), meter.tickStart();
    var tempRation = window.innerHeight / windowHeight, ratio = resizeProportional ? tempRation < window.innerWidth / realWindowWidth ? tempRation : window.innerWidth / realWindowWidth : 1;
    windowWidthVar = realWindowWidth * ratio, windowHeightVar = realWindowHeight * ratio, 
    windowWidthVar > realWindowWidth && (windowWidthVar = realWindowWidth), windowHeightVar > realWindowHeight && (windowHeightVar = realWindowHeight), 
    renderer.view.style.width = windowWidthVar + "px", renderer.view.style.height = windowHeightVar + "px", 
    APP.update(), renderer.render(APP.stage), meter.tick();
}

var DungeonGenerator = Class.extend({
    init: function() {
        this.random = 0, this.numActivesNodes = 0, this.maxDist = 5, this.minNodes = 5, 
        this.seeds = 1, this.rooms = [], this.maxNodes = 10, this.mostDistant = new NodeModel(), 
        this.nodeLock = new NodeModel(), this.firstNode = new NodeModel(), this.keyNode = new NodeModel(), 
        this.precision = 1, this.seed = 0, this.rooms = [];
    },
    generate: function(seed, precision, minMax, bounds, maxLenght, start) {
        this.seed = seed, random = 0, 0 > maxLenght && (maxLenght = 99999), this.minNodes = minMax[0], 
        this.maxNodes = minMax[1], this.precision = precision, this.numActivesNodes = 0, 
        this.maxDist = -999999999, this.seeds = 1;
        var i = 0, j = 0;
        if (this.rooms.length <= 0) for (i = 0; i < bounds[0]; i++) {
            var temp = [];
            for (j = 0; j < bounds[1]; j++) {
                var tempModel = new NodeModel();
                tempModel.position = [ i, j ], temp.push(tempModel);
            }
            this.rooms.push(temp);
        }
        this.generateNodes(start ? start[0] : Math.floor(bounds[0] / 2), start ? start[1] : Math.floor(bounds[1] / 2), null, maxLenght), 
        this.mostDistant.mode = 4;
        var keyDistance = -9999999999;
        for (k = 0; k < this.rooms.length; k++) {
            var item = this.rooms[k];
            for (i = 0; i < item.length; i++) {
                var dist = this.pointDistance(this.mostDistant.position[0], this.mostDistant.position[1], item[i].position[0], item[i].position[1]);
                dist >= keyDistance && item[i].active && item[i].parentId > 0 && (keyDistance = dist, 
                this.keyNode = item[i]), item[i].parentId > 0 && item[i].position[0] === this.mostDistant.parentPosition[0] && item[i].position[1] === this.mostDistant.parentPosition[1] && (this.nodeLock = item[i]);
            }
        }
        this.nodeLock && (this.nodeLock.mode = 5), this.keyNode && (this.keyNode.mode = 6);
    },
    log: function() {
        for (var i = 0; i < this.rooms.length; i++) {
            for (var tempStr = "", item = this.rooms[i], j = 0; j < item.length; j++) 0 === item[j].mode && (tempStr += "| - |"), 
            1 === item[j].mode && (tempStr += "| ♥ |"), 2 === item[j].mode && (tempStr += "| o |"), 
            3 === item[j].mode && (tempStr += "| c |"), 4 === item[j].mode && (tempStr += "| b |"), 
            5 === item[j].mode && (tempStr += "| l |"), 6 === item[j].mode && (tempStr += "| K |");
            console.log(tempStr + "   " + i);
        }
        console.log(this.firstNode);
    },
    generateNodes: function(i, j, parent, maxLeght, forceAdd) {
        if (!((this.numActivesNodes >= this.maxNodes || 0 >= maxLeght) && !forceAdd || this.numActivesNodes > 50)) {
            for (var node = null, jj = 0; jj < this.rooms.length; jj++) for (var item = this.rooms[jj], ii = 0; ii < item.length; ii++) item[ii].position[0] === i && item[ii].position[1] === j && (node = item[ii]);
            if (node) {
                if (node.active && !forceAdd) return void this.minNodes++;
                if (this.minNodes--, node.mode = 2, this.numActivesNodes++, node.active = !0, node.id < 0 && (node.id = this.numActivesNodes, 
                node.seed = this.getNextFloat(), node.applySeed()), parent && 1 !== node.id) {
                    node.parentPosition = parent.position, node.parentId = parent.id, node.parent = parent;
                    var dist = this.pointDistance(parent.position[0], parent.position[1], this.firstNode.position[0], this.firstNode.position[1]);
                    for (node.dist = dist, this.maxDist <= dist && node.parentId > 2 && (this.maxDist = dist, 
                    this.mostDistant = node), node.dist = dist, ri = this.rooms.length - 1; ri >= 0; ri--) {
                        var tempNodeArray = this.rooms[ri];
                        for (nj = tempNodeArray.length - 1; nj >= 0; nj--) tempNodeArray[nj].id === node.parentId && (tempNodeArray[nj].position[1] > node.position[1] ? tempNodeArray[nj].childrenSides[0] = node : tempNodeArray[nj].position[1] < node.position[1] ? tempNodeArray[nj].childrenSides[1] = node : tempNodeArray[nj].position[0] > node.position[0] ? tempNodeArray[nj].childrenSides[2] = node : tempNodeArray[nj].position[0] < node.position[0] && (tempNodeArray[nj].childrenSides[3] = node));
                    }
                    node.parent.position[1] < node.position[1] ? node.childrenSides[0] = node.parent : node.parent.position[1] > node.position[1] ? node.childrenSides[1] = node.parent : node.parent.position[0] < node.position[0] ? node.childrenSides[2] = node.parent : node.parent.position[0] > node.position[0] && (node.childrenSides[3] = node.parent);
                } else node.id = 1, node.mode = 1, this.firstNode = node;
                var has = !1;
                if (this.getNextFloat() < this.seeds || this.minNodes > 0) {
                    this.seeds *= this.precision;
                    for (var tmpArr = [ 0, 0 ], arrayGens = [], rndTest = 1 === node.id, rndValue = rndTest ? .9 : .4, k = 0; 4 > k; k++) if (this.getNextFloat() < rndValue) {
                        has = !0, 0 === k ? tmpArr = [ -1, 0 ] : 1 === k ? tmpArr = [ 1, 0 ] : 2 === k ? tmpArr = [ 0, 1 ] : 3 === k && (tmpArr = [ 0, -1 ]);
                        var objGen = {};
                        objGen.i = i + tmpArr[0], objGen.j = j + tmpArr[1], objGen.parentPosition = [ i, j ], 
                        objGen.parent = node, arrayGens.push(objGen);
                    }
                    for (var n = arrayGens.length - 1; n >= 0; n--) {
                        var obj = arrayGens[n];
                        rndTest || maxLeght--, this.generateNodes(obj.i, obj.j, obj.parent, maxLeght, rndTest);
                    }
                    if (this.minNodes > 0 || this.seeds >= 1) {
                        var tempRnd = this.getNextFloat();
                        tmpArr = .25 > tempRnd ? [ -1, 0 ] : .5 > tempRnd ? [ 1, 0 ] : .75 > tempRnd ? [ 0, 1 ] : [ 0, -1 ], 
                        this.generateNodes(i + tmpArr[0], j + tmpArr[1], node, --maxLeght);
                    }
                }
                has || (node.mode = 3);
            }
        }
    },
    pointDistance: function(x, y, x0, y0) {
        return Math.sqrt((x -= x0) * x + (y -= y0) * y);
    },
    getNextFloat: function() {
        var x = 1e4 * Math.sin(this.seed++);
        return x - Math.floor(x);
    }
}), Float = Class.extend({
    init: function(seed) {
        this.seed = seed, this.tempAccSeed = this.seed;
    },
    applySeed: function() {
        this.tempAccSeed = this.seed;
    },
    getNextFloat: function() {
        var x = 1e4 * Math.sin(this.tempAccSeed++);
        return x - Math.floor(x);
    }
}), NodeModel = Class.extend({
    init: function() {
        this.position = [], this.dist = 0, this.parentPosition = [], this.childrenSides = [ null, null, null, null ], 
        this.parentId = -1, this.parent = null, this.active = !1, this.mode = 0, this.id = -1, 
        this.seed = -1, this.tempAccSeed = this.seed, this.bg = null, this.mapData = null, 
        this.topTile = {
            x: 0,
            y: 0
        }, this.bottomTile = {
            x: 0,
            y: 0
        }, this.leftTile = {
            x: 0,
            y: 0
        }, this.rightTile = {
            x: 0,
            y: 0
        }, this.placedTiles = [];
    },
    applySeed: function() {
        this.tempAccSeed = this.seed;
    },
    getNextFloat: function() {
        var x = 1e4 * Math.sin(this.tempAccSeed++);
        return x - Math.floor(x);
    }
}), SmartObject = Class.extend({
    init: function() {
        MicroEvent.mixin(this);
    },
    show: function() {},
    hide: function() {},
    build: function() {},
    destroy: function() {}
}), SmartSocket = Class.extend({
    init: function() {
        MicroEvent.mixin(this);
    },
    build: function() {},
    writeObj: function(obj) {
        this.trigger(SmartSocket.WRITE_OBJ, obj);
    },
    readSocketList: function(obj) {
        this.trigger(SmartSocket.READ_SOCKET_SNAPSHOT, obj);
    },
    readObj: function(obj) {
        this.trigger(SmartSocket.READ_OBJ, obj);
    },
    readLast: function(obj) {
        this.trigger(SmartSocket.READ_LAST, obj);
    },
    setReadCallback: function(callback) {
        this.readCallback = callback;
    },
    socketError: function() {
        this.trigger(SmartSocket.SOCKET_ERROR, obj);
    },
    setObj: function(obj) {
        this.trigger(SmartSocket.SET_OBJ, obj);
    },
    updateObj: function(obj) {
        this.trigger(SmartSocket.UPDATE_OBJ, obj);
    },
    destroy: function() {}
});

SmartSocket.UPDATE_OBJ = "updateObj", SmartSocket.READ_OBJ = "readObj", SmartSocket.READ_SOCKET_SNAPSHOT = "readSocketSnapshot", 
SmartSocket.READ_LAST = "readLast", SmartSocket.WRITE_OBJ = "writeObj", SmartSocket.SET_OBJ = "setObj", 
SmartSocket.SOCKET_ERROR = "socketError";

var Application = AbstractApplication.extend({
    init: function() {
        this._super(windowWidth, windowHeight), this.stage.setBackgroundColor(3153730), 
        this.stage.removeChild(this.loadText), this.isMobile = testMobile(), this.appContainer = document.getElementById("rect"), 
        this.id = parseInt(1e11 * Math.random());
    },
    update: function() {
        this._super();
    },
    build: function() {
        this._super();
        var assetsToLoader = [];
        if (assetsToLoader.length > 0) {
            this.assetsLoader = new PIXI.AssetLoader(assetsToLoader);
            var self = this;
            this.assetsLoader.onComplete = function() {
                self.onAssetsLoaded();
            }, this.assetsLoader.onProgress = function() {
                console.log("onProgress");
            }, this.assetsLoader.load();
        } else this.onAssetsLoaded();
    },
    initApplication: function() {
        this.waitScreen = new WaitScreen("Main"), this.screenManager.addScreen(this.waitScreen), 
        this.screenManager.change("Main");
    },
    onAssetsLoaded: function() {
        this.initApplication();
    },
    show: function() {},
    hide: function() {},
    destroy: function() {}
}), Cupcake = SpritesheetEntity.extend({
    init: function() {
        this._super(!0);
    },
    build: function() {
        var self = this, motionIdle = new SpritesheetAnimation();
        motionIdle.build("idle", this.getFramesByRange("cupcake10", 0, 13), 1, !0, null);
        var motionRun = new SpritesheetAnimation();
        motionRun.build("run", this.getFramesByRange("cupcake10", 14, 37), 0, !0, null);
        var motionPounch = new SpritesheetAnimation();
        motionPounch.build("pounch", this.getFramesByRange("cupcake10", 38, 59), -1, !1, function() {
            self.spritesheet.play("idle");
        });
        var motionThrow = new SpritesheetAnimation();
        motionThrow.build("throw", this.getFramesByRange("cupcake10", 60, 107), -2, !1, function() {
            self.spritesheet.play("idle");
        });
        var motionHurt = new SpritesheetAnimation();
        motionHurt.build("hurt", this.getFramesByRange("cupcake10", 108, 123), -2, !1, function() {
            self.spritesheet.play("idle");
        }), this.spritesheet = new Spritesheet(), this.spritesheet.addAnimation(motionIdle), 
        this.spritesheet.addAnimation(motionRun), this.spritesheet.addAnimation(motionPounch), 
        this.spritesheet.addAnimation(motionThrow), this.spritesheet.addAnimation(motionHurt), 
        this.spritesheet.play("idle");
    },
    update: function() {
        this._super();
    },
    destroy: function() {
        this._super();
    }
}), AppModel = Class.extend({
    init: function() {
        this.id = 0;
    },
    build: function() {},
    destroy: function() {},
    serialize: function() {}
}), WaitScreen = AbstractScreen.extend({
    init: function(label) {
        this._super(label);
    },
    destroy: function() {
        this._super();
    },
    build: function() {
        this._super();
        var assetsToLoader = [ "_dist/img/ease.png", "_dist/img/UI/simpleButtonOver.png", "_dist/img/UI/simpleButtonUp.png", "_dist/img/spritesheet/cupcake.json" ];
        assetsToLoader.length > 0 ? (this.loader = new PIXI.AssetLoader(assetsToLoader), 
        this.initLoad()) : this.onAssetsLoaded();
    },
    onAssetsLoaded: function() {
        this._super(), this.easeImg = new SimpleSprite("_dist/img/ease.png"), this.addChild(this.easeImg), 
        this.easeImg.setPosition(50, 50), this.cupcake = new Cupcake(), this.cupcake.build(), 
        this.addChild(this.cupcake), this.cupcake.setPosition(windowWidth / 2, windowHeight / 2), 
        this.cupcake.setScale(.8, .8);
        var self = this;
        this.buttonIdle = new DefaultButton("_dist/img/UI/simpleButtonUp.png", "_dist/img/UI/simpleButtonOver.png"), 
        this.buttonIdle.build(), this.buttonIdle.setPosition(50, windowHeight / 2), this.addChild(this.buttonIdle), 
        this.buttonIdle.addLabel(new PIXI.Text("idle", {
            font: "20px Arial"
        }), 5, 5), this.buttonIdle.clickCallback = function() {
            self.cupcake.spritesheet.play("idle");
        }, this.buttonRun = new DefaultButton("_dist/img/UI/simpleButtonUp.png", "_dist/img/UI/simpleButtonOver.png"), 
        this.buttonRun.build(), this.buttonRun.setPosition(50, windowHeight / 2 + 60), this.addChild(this.buttonRun), 
        this.buttonRun.addLabel(new PIXI.Text("run", {
            font: "20px Arial"
        }), 5, 5), this.buttonRun.clickCallback = function() {
            self.cupcake.spritesheet.play("run");
        }, this.buttonPounch = new DefaultButton("_dist/img/UI/simpleButtonUp.png", "_dist/img/UI/simpleButtonOver.png"), 
        this.buttonPounch.build(), this.buttonPounch.setPosition(50, windowHeight / 2 + 120), 
        this.addChild(this.buttonPounch), this.buttonPounch.addLabel(new PIXI.Text("pounch", {
            font: "20px Arial"
        }), 5, 5), this.buttonPounch.clickCallback = function() {
            self.cupcake.spritesheet.play("pounch");
        }, this.buttonThrow = new DefaultButton("_dist/img/UI/simpleButtonUp.png", "_dist/img/UI/simpleButtonOver.png"), 
        this.buttonThrow.build(), this.buttonThrow.setPosition(50, windowHeight / 2 + 180), 
        this.addChild(this.buttonThrow), this.buttonThrow.addLabel(new PIXI.Text("throw", {
            font: "20px Arial"
        }), 5, 5), this.buttonThrow.clickCallback = function() {
            self.cupcake.spritesheet.play("throw");
        }, this.buttonHurt = new DefaultButton("_dist/img/UI/simpleButtonUp.png", "_dist/img/UI/simpleButtonOver.png"), 
        this.buttonHurt.build(), this.buttonHurt.setPosition(50, windowHeight / 2 + 240), 
        this.addChild(this.buttonHurt), this.buttonHurt.addLabel(new PIXI.Text("hurt", {
            font: "20px Arial"
        }), 5, 5), this.buttonHurt.clickCallback = function() {
            self.cupcake.spritesheet.play("hurt");
        };
    }
}), FirebaseSocket = SmartSocket.extend({
    init: function(url) {
        this._super(), this.dataRef = new Firebase(url), this.dataRef.limit(1);
    },
    build: function() {
        var self = this;
        this.lastMessagesQuery = this.dataRef.endAt().limit(2), this.lastMessagesQuery.on("child_added", function(snapshot) {
            self.readLast(snapshot.val());
        }, function(errorObject) {
            self.socketError(errorObject);
        }), this.dataRef.on("child_added", function(snapshot) {
            self.readSocketList(snapshot.val());
        }, function(errorObject) {
            self.socketError(errorObject);
        }), this.dataRef.on("value", function(data) {
            self.readObj(data.val());
        }, function(errorObject) {
            self.socketError(errorObject);
        });
    },
    writeObj: function(obj) {
        this._super(obj), this.dataRef.push(obj);
    },
    setObj: function(obj) {
        this._super(obj), this.dataRef.set(obj);
    },
    updateObj: function(obj) {
        this._super(obj), this.dataRef.update(obj);
    },
    destroy: function() {}
}), InputManager = Class.extend({
    init: function(parent) {
        var game = parent, self = this;
        this.vecPositions = [], document.body.addEventListener("mouseup", function() {
            game.player && (game.mouseDown = !1);
        }), document.body.addEventListener("mousedown", function() {
            game.player && APP.getMousePos().x < windowWidth && APP.getMousePos().y < windowHeight - 70 && (game.mouseDown = !0);
        }), document.body.addEventListener("keyup", function(e) {
            if (game.player) {
                if (87 === e.keyCode || 38 === e.keyCode && game.player.velocity.y < 0) self.removePosition("up"); else if (83 === e.keyCode || 40 === e.keyCode && game.player.velocity.y > 0) self.removePosition("down"); else if (65 === e.keyCode || 37 === e.keyCode && game.player.velocity.x < 0) self.removePosition("left"); else if (68 === e.keyCode || 39 === e.keyCode && game.player.velocity.x > 0) self.removePosition("right"); else if (32 === e.keyCode) game.player.hurt(5); else if (49 === e.keyCode || 50 === e.keyCode || 51 === e.keyCode || 52 === e.keyCode || 81 === e.keyCode || 69 === e.keyCode) {
                    var id = 1;
                    50 === e.keyCode ? id = 2 : 51 === e.keyCode ? id = 3 : 52 === e.keyCode && (id = 4), 
                    game.useShortcut(id - 1);
                }
                game.player.updatePlayerVel(self.vecPositions);
            }
        }), document.body.addEventListener("keydown", function(e) {
            game.player && (87 === e.keyCode || 38 === e.keyCode ? (self.removePosition("down"), 
            self.addPosition("up")) : 83 === e.keyCode || 40 === e.keyCode ? (self.removePosition("up"), 
            self.addPosition("down")) : 65 === e.keyCode || 37 === e.keyCode ? (self.removePosition("right"), 
            self.addPosition("left")) : (68 === e.keyCode || 39 === e.keyCode) && (self.removePosition("left"), 
            self.addPosition("right")), game.player.updatePlayerVel(self.vecPositions));
        });
    },
    removePosition: function(position) {
        for (var i = this.vecPositions.length - 1; i >= 0; i--) this.vecPositions[i] === position && this.vecPositions.splice(i, 1);
    },
    addPosition: function(position) {
        for (var exists = !1, i = this.vecPositions.length - 1; i >= 0; i--) this.vecPositions[i] === position && (exists = !0);
        exists || this.vecPositions.push(position);
    }
}), meter = new FPSMeter(), resizeProportional = !0, windowWidth = 820, windowHeight = 600, realWindowWidth = 820, realWindowHeight = 600;

testMobile() && (windowWidth = 640, windowHeight = 960);

var renderer, windowWidthVar = window.innerWidth, windowHeightVar = window.innerHeight, renderer = PIXI.autoDetectRenderer(realWindowWidth, realWindowHeight, null, !1, !0);

document.body.appendChild(renderer.view);

var APP;

APP = new Application(), APP.build(), APP.show();

var initialize = function() {
    PIXI.BaseTexture.SCALE_MODE = 2, requestAnimFrame(update);
};

!function() {
    var App = {
        init: function() {
            initialize();
        }
    };
    App.init();
}();