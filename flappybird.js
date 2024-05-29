
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

    // Llamamos a la funcion update.
    requestAnimationFrame(update);
}

// Creamos una funcion que va a redibujar el canvas, esto para lograr movimiento en el juego
function update(){
    requestAnimationFrame(update);

    // Con esto, borramos el frame anterior para evitar que se sobrepongan
    context.clearRect(0, 0, board.width, board.Height);

    // Dibujamos el pajaro
    context.drawImage(birdImg,bird.x, bird.y, bird.width, bird.height);
}
