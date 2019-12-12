function checkSupported(){
    canvas = document.getElementById('board');

    if(canvas.getContext){
       drawSnake();
    } else {
        // Canvas is not supported
        alert("Sorry, your browser does not support the canvas.");
    }
}

function drawSnake(){
    ctx = canvas.getContext('2d');

    ctx.fillStyle = "rgb(0,0,200)";
    
    let x = 200;
    let y = 300;
    let width = 10;
    let height = 10;

    // draw a square on x,y position
    ctx.fillRect(x, y, width, height);
}

