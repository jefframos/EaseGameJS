var windowWidth = 640,
    windowHeight = 960;

// cria o renter
var renderer = PIXI.autoDetectRenderer(windowWidth, windowHeight);
// adiciona o render
document.body.appendChild(renderer.view);

//inicia o game e da um build
//var game = new Game(windowWidth, windowHeight);
//game.build();

//chama o loop da aplicação
requestAnimFrame( update );

//loop da aplicação
function update() {
    requestAnimFrame( update );
    //game.update();
    renderer.render(game.stage);
}

// Optimize for Retina Display
var canvas = document.querySelector("canvas"),
	devicePixelRatio = window.devicePixelRatio;

canvas.style.width = (canvas.width / devicePixelRatio) + "px";
canvas.style.height = (canvas.height / devicePixelRatio) + "px";