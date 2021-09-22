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
    const snake2 = new Reptile('Player2', 'yellow', 10 , 10);

    const clearCanvas = () => {        // removes the deleted tail from snake's array of objects
        context.fillStyle = 'white';
        context.strokestyle = 'black';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.strokeRect(0, 0, canvas.width, canvas.height);
      }

    const gameStatusFlag = () => {
        for (let i = 1; i < snake1.body.length; i++) {  // check for self-collision
            if (snake1.body[i].x === snake1.body[0].x && snake1.body[i].y === snake1.body[0].y) return true  //checks if snake has hit itself
        }
        const leftLimit = snake1.body[0].x < 0;     // creates flag and returns it
        const rightLimit = snake1.body[0].x > canvas.width - 10;
        const topLimit = snake1.body[0].y < 0;
        const bottomLimit = snake1.body[0].y > canvas.height - 10;
        return leftLimit || rightLimit || topLimit || bottomLimit
    }   

    const main = () => {
        if (gameStatusFlag()) return;
        else {
            setTimeout(() => {
                clearCanvas();
                snake1.move_snake();
                snake1.drawSnake();

                snake2.move_snake();
                snake2.drawSnake();
                main();
            }, 100) 
        }


    }

    main();
})