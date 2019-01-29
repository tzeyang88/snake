const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const bacColor = 'black';
const snakeBacColor = 'white';
const snakeStrColor = 'red';

const foodBacColor = 'green';
const foodStrColor = 'yellow';

function clearCanvas() {
  ctx.fillStyle = bacColor;
  ctx.fillRect(0,0, canvas.clientWidth, canvas.height)
}

snake = [
  {x: 150, y: 150},
  {x: 140, y: 150},
  {x: 130, y: 150},
  {x: 120, y: 150},
  {x: 110, y: 150},
]

let dx = 10;
let dy = 0;

let foodX;
let foodY;

let score = 0;

let isGameOver = false;

function gameLoop() {
  if(didEndGame()) return
    clearCanvas();
    drawFood();
    advanceSnake();
    drawSnake();
    setTimeout(gameLoop, 100)
}

gameLoop();
createFood();

function randomTen(min, max) {
  return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function createFood() {
  foodX = randomTen(0, canvas.width - 10);
  foodY = randomTen(0, canvas.height - 10);
  snake.forEach(function isFoodOnSnake(part) {
    const foodIsOnSnake = part.x == foodX && part.y == foodY 
      if(foodIsOnSnake) {
        createFood() 
      }
  })
}

function drawFood() {
  ctx.fillStyle = foodBacColor;
  ctx.strokeStyle = foodStrColor;
  ctx.fillRect(foodX, foodY, 10, 10);
  ctx.strokeRect(foodX, foodY, 10, 10);
}

function drawSnake() {
  snake.forEach(drawSnakeParts);
}

function drawSnakeParts(snakePart) {
  ctx.fillStyle = snakeBacColor;
  ctx.strokeStyle = snakeStrColor;
  ctx.fillRect(snakePart.x,snakePart.y,10,10);
  ctx.strokeRect(snakePart.x,snakePart.y,10,10);
}

function advanceSnake() {
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  const didEatFood = snake[0].x === foodX && snake[0].y === foodY; 
  snake.unshift(head)
  if(didEatFood) {
    score += 10;
    createFood();
    document.querySelector('#score').innerHTML = score;
  } else {
    snake.pop()
  }
}

function didEndGame() {
  for(let i = 4; i < snake.length; i++) {
    const didCollide = snake[i].x === snake[0].x && snake[i].y === snake[0].y;
    if(didCollide) {
      isGameOver =  true
    }
  }

  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > canvas.width - 10;
  const hitTopWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > canvas.height - 10;
  return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall
}

document.addEventListener('keydown', direction);
function direction(e) {
  let key = e.keyCode;
  let moveLeft = dx === -10;
  let moveRight = dx === 10;
  let moveUp = dy === 10;
  let moveDown = dy === -10;
  if(key === 37 && !moveRight) {
    dx = -10;
    dy = 0
  }
  if(key === 39 && !moveLeft) {
    dx = 10;
    dy = 0
  }
  if(key === 38 && !moveUp) {
    dx = 0;
    dy = -10
  }
  if(key === 40 && !moveDown) {
    dx = 0;
    dy = 10
  }
}