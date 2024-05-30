
// Definimos las variables y caracteristicas del canvas con id "board"
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

// Definimos las caracteristicas del "Pajaro"
let birdWidth = 34; // ancho/alto ratio = 400/228 -> 17/12
let birdHeight = 24;
let birdImg;

// definimos la posicion inicial del pajaro
let birdX = boardWidth/8;
let birdY = boardHeight/2;

// Definimos el objeto bird
let bird = {
    x : birdX,
    y : birdY,
    width: birdWidth,
    height: birdHeight
}

// Tuberias
let pipeArray = [];
let pipeWidth = 64; //width/ height ratio = 384/3072 -> 1/8 
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

// Fisicas del juego
let velocityX = -2; // Velocidad a la que las tuberia se mueven a la izquierda

window.onload = function(){
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;   
    context = board.getContext("2d"); //Esto se usa para dibujar en el canvas

    // Dibujamos el pajaro en el canvas
    // context.fillStyle = "green";
    // Recuperamos la informacion del objeto "bird"
    // context.fillRect(bird.x, bird.y, bird.width, bird.height);

    // Asignamos una imagen al pajaro
    birdImg = new Image();
    birdImg.src = './images/flappybird.png';
    // Hacemos que cuando la variable birdImg cargue, esta funcion dibuje el pajaro en el canvas
    birdImg.onload = function() {
        context.drawImage(birdImg,bird.x, bird.y, bird.width, bird.height);
    }

    topPipeImg = new Image();
    topPipeImg.src = './images/toppipe.png';

    bottomPipeImg = new Image();
    bottomPipeImg.src= './images/bottompipe.png';

    // Llamamos a la funcion update.
    requestAnimationFrame(update);

    // Este codigo hace que se ejecute la funcion "placePipes" cada 1.5 segundos
    setInterval(placePipes, 1500);
}

// Creamos una funcion que va a redibujar el canvas, esto para lograr movimiento en el juego
function update(){
    requestAnimationFrame(update);

    // Con esto, borramos el frame anterior para evitar que se sobrepongan
    context.clearRect(0, 0, board.width, board.height);

    // Dibujamos el pajaro
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    // Tuberias
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;    
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
    }
}

function placePipes(){

    let topPipe = {
        img: topPipeImg,
        x: pipeX,
        y: pipeY,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }

    pipeArray.push(topPipe);
}