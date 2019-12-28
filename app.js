(function () {

    const canvas = document.querySelector('#canvas');
    const context = canvas.getContext('2d');
    const scale = 20;
    const rows = canvas.height / scale;
    const columns = canvas.width / scale;

    let xSpeed = scale * 1;
    let ySpeed = 0;
    // the snake is moving on axis x or y
    let xAxis = true;
    let yAxis = false;
    // score
    let score = 0;

    let paused = false;

    let snake = new Snake(scale);
    let apple = new Apple();


    function eatApple() {
        if (snake.x == apple.x && snake.y === apple.y) {
            return true;
        } else {
            return false;
        }
    }


    function move(event) {

        let code = event.keyCode;

        if (xAxis) {
            if (code == 38) {
                ySpeed = -scale;
                xSpeed = 0;
                xAxis = false;
                yAxis = true;
            }
            if (code == 40) {
                ySpeed = scale;
                xSpeed = 0;
                xAxis = false;
                yAxis = true;
            }
        }
        if (yAxis) {
            if (code == 37) {
                ySpeed = 0;
                xSpeed = -scale;
                xAxis = true;
                yAxis = false;
            }
            if (code == 39) {
                ySpeed = 0;
                xSpeed = scale;
                xAxis = true;
                yAxis = false;
            }
        }

        if (code == 80) {
            togglePause();
        }

    }

    function togglePause() {
        if (!paused) {
            paused = true;
        } else if (paused) {
            paused = false;
        }
    }

    function restartGame() {
        score = 0;
        snake.tail = [];
        snake.x = 2 * scale;
        snake.y = 2 * scale;
        xSpeed = scale * 1;
        ySpeed = 0;
        xAxis = true;
        yAxis = false;
    }

    function main() {
        alert("Press Enter to play.");

        document.onkeydown = move;

        apple.getPosition(rows, columns, scale);


        window.setInterval(() => {
            context.clearRect(0, 0, canvas.width, canvas.height);

            apple.draw(context, scale);

            snake.update(paused, score, xSpeed, ySpeed);
            snake.draw(context, scale);

            // eating apples
            if (eatApple()) {
                apple.getPosition(rows, columns, scale);
                apple.draw(context, scale);
                score += 1;
            }

            if (snake.isCollidingWithIfself()
                || snake.isCollidingWithWalls(canvas)) {
                // GAME OVER
                alert(`YOU SCORE ${score} APPLES. GAME OVER!!`);
                restartGame();
            }


            document.getElementById('score').innerText = score + ' Apples';

        }, 300);
    }

    // the game
    context.rect(snake.x, snake.y, snake.width, snake.height);
    context.stroke();

    main();

})();