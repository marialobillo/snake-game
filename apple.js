class Apple {
    constructor(){
        this.x = 0;
        this.y = 0;
    }

    getPosition(rows, columns, scale){
        this.x = (Math.floor(Math.random() * rows - 1) + 1) * scale;
        this.y = (Math.floor(Math.random() * columns - 1) + 1) * scale; 
    }
  
    draw(context, scale){
        context.fillStyle = '#FF0000';
        context.fillRect(this.x, this.y, scale, scale);
    }
}