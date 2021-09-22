console.log("links established");

$(() => {
    const canvas = document.getElementById("canvas1");
    const context = canvas.getContext("2d");

    class Reptile {
        constructor(name, color, dx, dy) {
            this.name = name;
            this.color = color;
            this.dx = dx;
            this.dy = dy;
    
            this.body = [           // each player starts with body length 5
              {x: 200, y: 200},
              {x: 190, y: 200},
              {x: 180, y: 200},
              {x: 170, y: 200},
              {x: 160, y: 200},
            ];
          }

          drawSnake() {
            //console.log(this);
            this.body.forEach((cb) => {
              context.fillStyle = this.color;       // diff colors for each player
              context.strokestyle = 'black';
              context.fillRect(cb.x, cb.y, 10, 10);
              context.strokeRect(cb.x, cb.y, 10, 10);
            });
          }

          move_snake() {
            const addHead = {x: this.body[0].x + this.dx, y: this.body[0].y + this.dy};
            this.body.unshift(addHead);  // prepends new head in front of body and then removes the tail end
            this.body.pop();
          }

          
    }
    const snake1 = new Reptile('Player1', 'red', 10, 0);

    function clearCanvas() {        // removes the deleted tail from snake's array of objects
        context.fillStyle = 'white';
        context.strokestyle = 'black';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.strokeRect(0, 0, canvas.width, canvas.height);
      }

    function main() {
        setTimeout(() => {
            clearCanvas();
            snake1.move_snake();
            snake1.drawSnake();
            main();
        }, 100) 
    }

    main();
})