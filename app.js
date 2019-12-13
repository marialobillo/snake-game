let canvas = document.querySelector('#board');
let context = canvas.getContext('2d');

let xPos = 0;
let yPos = 0;
let width = 15;
let height = 15;

context.rect(xPos, yPos, width, height);
context.stroke();


function move(e){

    switch(e.keyCode){
        case 37:
            xPos -= 5;
            break;
        case 38:
            yPos -= 5;
            break; 
        case 39:
            xPos += 5;
            break;
        case 40:
            yPos += 5;
            break;
    }

    canvas.width = canvas.width;
    context.rect(xPos, yPos, width, height);
    context.stroke();
}

document.onkeydown = move;