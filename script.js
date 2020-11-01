let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];

//posicao da cobrinha
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

//direcao da cobrinha
let direction = "right";

//definir a comida
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

//background
function criarBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

//desenhar a cobrinha
function criarCobrinha(){
    for(i=0; i < snake.length; i++){
        context.fillStyle = "green"; 
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

//desenhar a comida
function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

//evento de escuta para captar movimento de clique do teclado
document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "up") direction = "down";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "down") direction = "up";
}

//funcao de tempo para iniciar o jogo
function iniciarJogo(){

    //logica para que cobrinha fique dentro do espaco do jogo (canvas)
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "up") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "down") snake[0].y = 16 * box;

    //gameover se cobrinha se chocar
    for(i=1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Game Over :(');
        }
    }

    //iniciar
    criarBG();
    criarCobrinha();
    drawFood();

    //ponto de partida da cobrinha
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //coordenadas da cobrinha, por onde ela vai seguir (vai acrescentar quadradinho em cada direcao)
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY += box;
    if(direction == "down") snakeY -= box;

    if(snakeX != food.x || snakeY != food.y){
  //retira ultimo elemento do array, para dar impressao de movimento
        snake.pop();
    }
    else{food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }
  

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

}

//passando intervalo de 100 milisegundos para iniciar jogo e atualizar sem travar
let jogo = setInterval(iniciarJogo, 100);

