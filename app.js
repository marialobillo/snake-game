(function(){

    const canvas = document.querySelector('#board');
const context = canvas.getContext('2d');
const scale = 15;

let x = 0;
let y = 0;
let xSpeed = scale * 1;
let ySpeed = 0;
let width = 15;
let height = 15;

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

function draw(){
    context.fillStyle = '#FFFFFF';
    context.fillRect(x, y, scale, scale);
}

document.onkeydown = move;

window.setInterval(() => {
    context.clearRect(0,0, canvas.width, canvas.height);
    update();
    draw();
}, 250);




})();