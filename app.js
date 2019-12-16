(function(){

    const canvas = document.querySelector('#board');
    const context = canvas.getContext('2d');
    const scale = 15;
    const rows = canvas.height / scale;
    const columns = canvas.width / scale;

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
    let score = 0;

    context.rect(snake.x, snake.y, snake.width, snake.height);
    context.stroke();


    function move(e){

        switch(e.keyCode){
            case 37:
                xSpeed = -scale * 1;
                ySpeed = 0; 
                break;
            case 38:
                xSpeed = 0;
                ySpeed = -scale * 1;
                break; 
            case 39:
                xSpeed = scale * 1;
                ySpeed = 0;
                break;
            case 40:
                xSpeed = 0;
                ySpeed = scale * 1;
                break;
        }
    }

    function update(){
        snake.x += xSpeed;
        snake.y += ySpeed;
    }

    function drawSnake(){
        context.fillStyle = '#FFFFFF';
        context.fillRect(snake.x, snake.y, scale, scale);
    }

    function getApplePosition(){
         // randomly x and y
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
       
        if(snake.x >= canvas.width || snake.x < 0 
            || snake.y >= canvas.height || snake.y < 0){
            console.log('GAME OVER!!');
            document.getElementById('status').innerText = 'GAME OVER!';
            restartGame();
            
        }
    }

    function restartGame(){
        score = 0;
        snake.tail = [];
        snake.x = 2 * scale;
        snake.y = 2 * scale;
        xSpeed = scale * 1;
        ySpeed = 0;
        document.getElementById('status').innerText = '';
    }

    function main(){
        document.onkeydown = move;

        getApplePosition();


        window.setInterval(() => {
            context.clearRect(0,0, canvas.width, canvas.height);
            document.getElementById('status').innertText = '';
            drawApple();
            update();
            drawSnake();

            if(eatApple()){
                //console.log('EATING!!!');
                getApplePosition();
                drawApple();
                score += 1;
                //console.log('score', score);

            }

            checkWalls();


            document.getElementById('score').innerText = score + ' apples';

        }, 250);
    }

    main();

})();