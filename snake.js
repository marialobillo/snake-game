class Snake{
    constructor(scale){
        this.x = 2 * scale;
        this.y = 2 * scale;
        this.width = scale;
        this.height = scale;
        this.tail = [];
    
    }
    draw(context, scale){
         // snake head
        context.fillStyle = '#5076F9';
        context.fillRect(this.x, this.y, scale, scale);

         // drawing the snake tail
        this.tail.forEach( tail => {
            context.fillRect(tail.x, tail.y, scale, scale);
        })
        context.fillRect(this.x, this.y, scale, scale);
    }
    update(paused, score, xSpeed, ySpeed){
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
    }
    isCollidingWithWalls(canvas){
        if(this.x > canvas.width || this.x < 0 
            || this.y >= canvas.height || this.y < 0){
                return true;
        }
        return false;
    }
    isCollidingWithIfself(){
        this.tail.forEach(tail => {
            if(this.x === tail.x && this.y === tail.y){
                return true;
            }
            return false;
        })
    }
}
