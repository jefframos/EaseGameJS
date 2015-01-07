/*jshint undef:false */
var WaitScreen = AbstractScreen.extend({
    init: function (label) {
        this._super(label);
    },
    destroy: function () {
        this._super();
    },
    build: function () {
        this._super();

        
        var assetsToLoader = ['_dist/img/ease.png',
        '_dist/img/UI/simpleButtonOver.png',
        '_dist/img/UI/simpleButtonUp.png',
        '_dist/img/spritesheet/cupcake.json'];

        if(assetsToLoader.length > 0){
            this.loader = new PIXI.AssetLoader(assetsToLoader);
            this.initLoad();
        }else{
            this.onAssetsLoaded();
        }

    },
    onAssetsLoaded:function()
    {
        this._super();

        this.easeImg = new SimpleSprite('_dist/img/ease.png');
        this.addChild(this.easeImg);
        this.easeImg.setPosition(50,50);

        this.cupcake = new Cupcake();
        this.cupcake.build();
        this.addChild(this.cupcake);
        this.cupcake.setPosition(windowWidth / 2, windowHeight / 2);
        this.cupcake.setScale(0.8,0.8);

        var self = this;

        this.buttonIdle = new DefaultButton('_dist/img/UI/simpleButtonUp.png', '_dist/img/UI/simpleButtonOver.png');
        this.buttonIdle.build();
        this.buttonIdle.setPosition( 50,windowHeight/2);
        this.addChild(this.buttonIdle);
        this.buttonIdle.addLabel(new PIXI.Text('idle', {font:'20px Arial'}),5,5);
        this.buttonIdle.clickCallback = function(){
            self.cupcake.spritesheet.play('idle');
        };

        this.buttonRun = new DefaultButton('_dist/img/UI/simpleButtonUp.png', '_dist/img/UI/simpleButtonOver.png');
        this.buttonRun.build();
        this.buttonRun.setPosition( 50,windowHeight/2 + 60);
        this.addChild(this.buttonRun);
        this.buttonRun.addLabel(new PIXI.Text('run', {font:'20px Arial'}),5,5);
        this.buttonRun.clickCallback = function(){
            self.cupcake.spritesheet.play('run');
        };

        this.buttonPounch = new DefaultButton('_dist/img/UI/simpleButtonUp.png', '_dist/img/UI/simpleButtonOver.png');
        this.buttonPounch.build();
        this.buttonPounch.setPosition( 50,windowHeight/2 + 120);
        this.addChild(this.buttonPounch);
        this.buttonPounch.addLabel(new PIXI.Text('pounch', {font:'20px Arial'}),5,5);
        this.buttonPounch.clickCallback = function(){
            self.cupcake.spritesheet.play('pounch');
        };

        this.buttonThrow = new DefaultButton('_dist/img/UI/simpleButtonUp.png', '_dist/img/UI/simpleButtonOver.png');
        this.buttonThrow.build();
        this.buttonThrow.setPosition( 50,windowHeight/2 + 180);
        this.addChild(this.buttonThrow);
        this.buttonThrow.addLabel(new PIXI.Text('throw', {font:'20px Arial'}),5,5);
        this.buttonThrow.clickCallback = function(){
            self.cupcake.spritesheet.play('throw');
        };

        this.buttonHurt = new DefaultButton('_dist/img/UI/simpleButtonUp.png', '_dist/img/UI/simpleButtonOver.png');
        this.buttonHurt.build();
        this.buttonHurt.setPosition( 50,windowHeight/2 + 240);
        this.addChild(this.buttonHurt);
        this.buttonHurt.addLabel(new PIXI.Text('hurt', {font:'20px Arial'}),5,5);
        this.buttonHurt.clickCallback = function(){
            self.cupcake.spritesheet.play('hurt');
        };
    },
});