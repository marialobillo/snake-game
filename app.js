(function(){

    const canvas = document.querySelector('#board');
    const context = canvas.getContext('2d');
    const scale = 15;
    const rows = canvas.height / scale;
    const columns = canvas.width / scale;

    let x = 0;
    let y = 0;
    let xSpeed = scale * 1;
    let ySpeed = 0;
    let width = 15;
    let height = 15;
    let appleX, appleY;

    context.rect(x, y, width, height);
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
        x += xSpeed;
        y += ySpeed;
    }

    function drawSnake(){
        context.fillStyle = '#FFFFFF';
        context.fillRect(x, y, scale, scale);
    }

    function getApplePosition(){
         // randomly x and y
         appleX = (Math.floor(Math.random() * rows - 1) + 1) * scale;
         appleY = (Math.floor(Math.random() * columns - 1) + 1) * scale;
    }
    function drawApple(){
       

        context.fillStyle = '#FF0000';
        context.fillRect(appleX, appleY, scale, scale);
    }

    function main(){
        document.onkeydown = move;

        getApplePosition();


        window.setInterval(() => {
            context.clearRect(0,0, canvas.width, canvas.height);
            drawApple();
            update();
            drawSnake();


            

        }, 250);
    }

    main();

})();