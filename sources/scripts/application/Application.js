/*jshint undef:false */
var Application = AbstractApplication.extend({
	init:function(){

        this._super(windowWidth, windowHeight);
        this.stage.setBackgroundColor(0x301f42);
        // this.stage.setBackgroundColor(0xFF9387);
        this.stage.removeChild(this.loadText);
        this.isMobile = testMobile();
        this.appContainer = document.getElementById('rect');
        this.id = parseInt(Math.random() * 100000000000);
	},
    update:function(){
        this._super();
    },
    build:function(){
        this._super();
        var assetsToLoader = [];

        if(assetsToLoader.length > 0){
            this.assetsLoader = new PIXI.AssetLoader(assetsToLoader);
            var self = this;

            this.assetsLoader.onComplete = function() {
                self.onAssetsLoaded();
            };
            this.assetsLoader.onProgress = function() {
                console.log('onProgress');
            };
            this.assetsLoader.load();
        }else{
            this.onAssetsLoaded();
        }
    },
    initApplication:function(){
        this.waitScreen = new WaitScreen('Main');
        this.screenManager.addScreen(this.waitScreen);
        this.screenManager.change('Main');
    },
    onAssetsLoaded:function()
    {
        this.initApplication();
    },
    show:function(){
    },
    hide:function(){
    },
    destroy:function(){
    }
});