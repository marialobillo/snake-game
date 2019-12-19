(function(){

    const canvas = document.querySelector('#canvas');
    const context = canvas.getContext('2d');
    const scale = 20;
    const rows = canvas.height / scale;
    const columns = canvas.width / scale;

    let snake = {
        x: 2 * scale,
        y: 2 * scale,
        width: scale,
        height: scale,
        tail: [],
        draw: function(){
             // snake head
            context.fillStyle = '#5076F9';
            context.fillRect(this.x, this.y, scale, scale);

             // drawing the snake tail
            this.tail.forEach( tail => {
                context.fillRect(tail.x, tail.y, scale, scale);
            })
            context.fillRect(this.x, this.y, scale, scale);
        },
        update: function(){
            // pause the game
            if(paused){
                alert('Press any key to continue.');
                paused = false;
            }
            // snake tail
            for(let i = 0; i < this.tail.length - 1; i++){
                this.tail[i] = this.tail[i + 1];
            }
            this.tail[score - 1] = {x: this.x, y: this.y};
            // moving the snake
            this.x += xSpeed;
            this.y += ySpeed;
        },
        checkWalls: function(){
            if(this.x > canvas.width || this.x < 0 
                || this.y >= canvas.height || this.y < 0){
                
                    // GAME OVER
                    alert(`YOU SCORE ${score} APPLES. GAME OVER!!`);
                restartGame();
            }
        },
        restartGame: function (){

        },
        checkCollision: function(){
            this.tail.forEach(tail => {
                if(this.x === tail.x && this.y === tail.y){
                    // GAME OVER
                    alert(`YOU SCORE ${score} APPLES. GAME OVER!!`);
                    restartGame();
                }
            })
        }
    }
 

    let apple = {
        x: 0,
        y: 0,
    }
    let xSpeed = scale * 1;
    let ySpeed = 0;
    // the snake is moving on axis x or y
    let xAxis = true;
    let yAxis = false;
    // score
    let score = 0;

    let paused = false;

    context.rect(snake.x, snake.y, snake.width, snake.height);
    context.stroke();


    function move(event){

        let code = event.keyCode;

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

   
   // Apple
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



 

    function restartGame(){
        score = 0;
        snake.tail = [];
        snake.x = 2 * scale;
        snake.y = 2 * scale;
        xSpeed = scale * 1;
        ySpeed = 0;
        xAxis = true;
        yAxis = false;
    }

    function main(){
        alert("Press Enter to play.");

        document.onkeydown = move;

        getApplePosition();


        window.setInterval(() => {
            context.clearRect(0,0, canvas.width, canvas.height);
            drawApple();
            snake.update();
            snake.draw();

            // eating apples
            if(eatApple()){
                getApplePosition();
                drawApple();
                score += 1;
            }

            // Check collitions walls and snake itself
            snake.checkWalls();
            snake.checkCollision();


            document.getElementById('score').innerText = score + ' Apples';

        }, 300);
    }

    // the game
    main();

})();