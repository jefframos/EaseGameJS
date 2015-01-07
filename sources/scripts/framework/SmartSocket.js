/*jshint undef:false */
var SmartSocket = Class.extend({
	init:function(){
        MicroEvent.mixin(this);
	},
	build:function(){
	},
    writeObj:function(obj){
        this.trigger(SmartSocket.WRITE_OBJ, obj);
    },
    readSocketList:function(obj){
        this.trigger(SmartSocket.READ_SOCKET_SNAPSHOT, obj);
    },
    readObj:function(obj){
        this.trigger(SmartSocket.READ_OBJ, obj);
    },
    readLast:function(obj){
        this.trigger(SmartSocket.READ_LAST, obj);
    },
    setReadCallback:function(callback){
        this.readCallback = callback;
    },
    socketError:function(error){
        this.trigger(SmartSocket.SOCKET_ERROR, obj);
    },
    setObj:function(obj){
        this.trigger(SmartSocket.SET_OBJ, obj);
    },
    updateObj:function(obj){
        this.trigger(SmartSocket.UPDATE_OBJ, obj);
    },
    destroy:function(){
    }
});
SmartSocket.UPDATE_OBJ = 'updateObj';
SmartSocket.READ_OBJ = 'readObj';
SmartSocket.READ_SOCKET_SNAPSHOT = 'readSocketSnapshot';
SmartSocket.READ_LAST = 'readLast';
SmartSocket.WRITE_OBJ = 'writeObj';
SmartSocket.SET_OBJ = 'setObj';
SmartSocket.SOCKET_ERROR = 'socketError';