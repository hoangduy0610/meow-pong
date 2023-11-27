// Get the canvas element
const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");

// Create the paddle
const paddleWidth = 10, paddleHeight = 100;
const paddle = {
    x: 0,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: "#000"
};

// Create the ball
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 30,
    speed: 1,
    dx: 4,
    dy: 4,
    image: new Image()
};
ball.image.src = "cat2.png";

// Create the score
let score = 0;

// Create the game over flag
let gameOver = false;

// Move the paddle with the mouse
canvas.addEventListener("mousemove", movePaddle);

function movePaddle(event) {
    let rect = canvas.getBoundingClientRect();
    paddle.y = event.clientY - rect.top - paddleHeight / 2;
}

// Draw the paddle
function drawPaddle() {
    context.fillStyle = paddle.color;
    context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

// Draw the ball
function drawBall() {
    context.drawImage(ball.image, ball.x - ball.radius, ball.y - ball.radius, ball.radius * 2, ball.radius * 2);
}

// Draw the score
function drawScore() {
    context.font = "20px Arial";
    context.fillText("Score: " + score, 20, 30);
}

// Draw the game over announcement
function drawGameOver() {
    context.font = "30px Arial";
    context.fillText("Game Over", canvas.width / 2 - 80, canvas.height / 2);
}

function catTouch() {
    ball.image.src = "cat.png";
    drawBall();
    setTimeout(()=>{
        ball.image.src = "cat2.png"
        drawBall();
    }, 200);
}

// Update the canvas
function update() {
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the paddle
    drawPaddle();

    // Draw the ball
    drawBall();

    // Draw the score
    drawScore();

    // Move the ball
    ball.x += ball.dx * ball.speed;
    ball.y += ball.dy * ball.speed;

    // Check collision with the paddle
    if (
        ball.x + ball.radius > paddle.x &&
        ball.x - ball.radius < paddle.x + paddle.width &&
        ball.y + ball.radius > paddle.y &&
        ball.y - ball.radius < paddle.y + paddle.height
    ) {
        ball.dx *= -1;
        score++;
        ball.speed += 0.05;
        catTouch();
    }

    // Check collision with the walls
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy *= -1;
        catTouch();
    }

    // Check game over
    if (ball.x + ball.radius > canvas.width) {
        ball.dx *= -1;
        catTouch();
    }

    if (ball.x - ball.radius < 0) {
        gameOver = true;
        ball.image.src = "cat.png";
        drawBall();
    }

    // Draw game over announcement
    if (gameOver) {
        drawGameOver();
    } else {
        requestAnimationFrame(update);
    }
}

update();