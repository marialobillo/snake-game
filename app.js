(function(){

    const canvas = document.querySelector('#canvas');
    const context = canvas.getContext('2d');
    const scale = 20;
    const rows = canvas.height / scale;
    const columns = canvas.width / scale;
    console.log('rows: ', rows);
    console.log('columns: ', columns);

    let snake = {
        x: 2 * scale,
        y: 2 * scale,
        width: scale,
        height: scale,
        tail: [],
    }
    let apple = {
        x: 0,
        y: 0,
    }
    let xSpeed = scale * 1;
    let ySpeed = 0;
    let xAxis = true;
    let yAxis = false;
    let score = 0;

    let paused = false;

    context.rect(snake.x, snake.y, snake.width, snake.height);
    context.stroke();


    function move(e){

        let code = e.keyCode;

        if(xAxis){
            if(code == 38){
                ySpeed = -scale;
                xSpeed = 0;
                xAxis = false;
                yAxis = true;
            }
            if(code == 40){
                ySpeed = scale;
                xSpeed = 0;
                xAxis = false;
                yAxis = true;
            }
        }
        if(yAxis){
            if(code == 37){
                ySpeed = 0;
                xSpeed = -scale;
                xAxis = true;
                yAxis = false;
            }
            if(code == 39){
                ySpeed = 0;
                xSpeed = scale;
                xAxis = true;
                yAxis = false;
            }
        }

        if(code == 80){
            togglePause();
        }

    }

    function togglePause(){
        if(!paused){
            paused = true;
        } else if(paused){
            paused = false;
        }
    }

    function update(){
        // pause the game
        if(paused){
            alert('Press any key to continue.');
            paused = false;
        }
        // snake tail
        for(let i = 0; i < snake.tail.length - 1; i++){
            snake.tail[i] = snake.tail[i + 1];
        }
        snake.tail[score - 1] = {x: snake.x, y: snake.y};
        // moving the snake
        snake.x += xSpeed;
        snake.y += ySpeed;
    }

    function drawSnake(){
        // snake head
        context.fillStyle = '#5076F9';
        context.fillRect(snake.x, snake.y, scale, scale);

        // drawing the snake tail
        for(let i=0; i < snake.tail.length; i++){
            context.fillRect(snake.tail[i].x, snake.tail[i].y, scale, scale);
        }
        context.fillRect(snake.x, snake.y, scale, scale);
    }

    function getApplePosition(){
         // randomly x and y for apples position
         apple.x = (Math.floor(Math.random() * rows - 1) + 1) * scale;
         apple.y = (Math.floor(Math.random() * columns - 1) + 1) * scale;
    }
    function drawApple(){
        context.fillStyle = '#FF0000';
        context.fillRect(apple.x, apple.y, scale, scale);
    }

    function eatApple(){
        if(snake.x == apple.x && snake.y === apple.y){
            return true;
        } else {
            return false;
        }
    }

    function checkWalls(){
       
        if(snake.x > canvas.width || snake.x < 0 
            || snake.y >= canvas.height || snake.y < 0){
            
                // GAME OVER
                alert(`YOU SCORE ${score} APPLES. GAME OVER!!`);
            restartGame();
        }
    }

    function checkCollision(){
        for(let i = 0; i < snake.tail.length; i++){
            if(snake.x === snake.tail[i].x && snake.y === snake.tail[i].y){
                
                // GAME OVER
                alert(`YOU SCORE ${score} APPLES. GAME OVER!!`);
                restartGame();
            }
        }
    }

    function restartGame(){
        score = 0;
        snake.tail = [];
        snake.x = 2 * scale;
        snake.y = 2 * scale;
        xSpeed = scale * 1;
        ySpeed = 0;
        xAxis = true;
        yAxis = false;
        document.getElementById('status').innerText = '';
    }

    function main(){
        alert("Press Enter to play.");

        document.onkeydown = move;

        getApplePosition();


        window.setInterval(() => {
            context.clearRect(0,0, canvas.width, canvas.height);
            document.getElementById('status').innertText = '';
            drawApple();
            update();
            drawSnake();

            // eating apples
            if(eatApple()){
                getApplePosition();
                drawApple();
                score += 1;
            }

            // Check collitions walls and snake itself
            checkWalls();
            checkCollision();


            document.getElementById('score').innerText = score + ' Apples';

        }, 300);
    }

    main();

})();