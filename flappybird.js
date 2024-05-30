
// Definimos las variables y caracteristicas del canvas con id "board"
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

// Definimos las caracteristicas del "Pajaro"
let birdWidth = 44; // ancho/alto ratio = 400/228 -> 17/12
let birdHeight = 34;
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
let velocityY = 0; // Velocidad a la que el pajaro salta
let gravity = 0.4; // Fuerza de gravedad que hace que el pajaro baje

let gameOver = false;
let score = 0;
let meruane;

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
    birdImg.src = './images/noctulo.png';
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

    // Añadimos este event listener para que cuando se presione una tecla, llama a la funcion que hace saltar al pajaro.
    document.addEventListener("keydown", moveBird);

}

// Creamos una funcion que va a redibujar el canvas, esto para lograr movimiento en el juego
function update(){
    requestAnimationFrame(update);

    if (gameOver){
        return;
    }

    // Con esto, borramos el frame anterior para evitar que se sobrepongan
    context.clearRect(0, 0, board.width, board.height);

    // Antes de dibujar al pajaro, cambiamos su posicion Y
    velocityY += gravity;
    // bird.y += velocityY;
    bird.y = Math.max(bird.y + velocityY, 0) // Este codigo aplica la gravedad al pajaro, pero tambien hace que no pueda subir fuera de la pantalla
    // Dibujamos el pajaro
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    // Logica que determina que si el pajaro se sale de la pantalla, el juego se acaba
    if (bird.y > board.height){
        gameOver = true
    }

    // Tuberias
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;    
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        // si la variable passed de la tuberia es false, ademas de que la posicion x del pajaro es mayor a la posicion x de la tuberia (le sumamos su ancho para asi calcule cuando haya pasado el pajaro al lado derecho de la tuberia).
        if (!pipe.passed && bird.x > pipe.x + pipeWidth){
            score += 0.5; // se aumenta en 0.5 por que el codigo cuenta tanto la tuberia de arriba como la de abajo para la puntuacion, por lo cual asi, al pasar por las tuberias se aumenta en 1 y no en 2
            pipe.passed = true;
        }

        // usamos la funcion de detectar colision para determinar el Game Over
        if (detectCollision(bird,pipe)){
            gameOver = true
        }
    }

    // Limpiamos las tuberia que estan fuera de la pantalla
    while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth){
        pipeArray.shift(); // Esto elimina el primer elemento del array 
    }

    // Puntuacion
    context.fillStyle = "white";
    context.font = "45px impact";
    context.fillText(score, 5, 45)

    // Game over
    if (gameOver){
        context.fillText("Game Over", 80, 90);
    }
}

function placePipes(){

    if (gameOver){
        return;
    }

    // este codigo permite randomizar la altura de la tuberia superior
    let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);

    // elegimos el tamaño del espacio entre tuberias
    let openingSpace = board.height/4;

    let topPipe = {
        img: topPipeImg,
        x: pipeX,
        y: randomPipeY,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }

    pipeArray.push(topPipe);

    let bottomPipe = {
        img: bottomPipeImg,
        x: pipeX,
        y: randomPipeY + pipeHeight + openingSpace,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }

    pipeArray.push(bottomPipe);
}

// Funcion encargada de hacer que el pajaro salte
function moveBird(e) {
    // en javascript, || significa "or"
    if (e.code == "Space" || e.code == "ArrowUp"){
        // Salto
        velocityY = -6;

        // Reiniciar el juego luego de un game over
        if (gameOver){
            bird.y = birdY;
            pipeArray = [];
            score = 0;
            gameOver = false;
        }

    }
}

// Funcion que detecta la colision con los objetos
function detectCollision(a, b){
    return a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y;
}

addEventListener("click", )