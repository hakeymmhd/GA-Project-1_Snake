console.log("links established");

$(() => {
    const canvas = document.getElementById("canvas1");
    const context = canvas.getContext("2d");
//    let changing_direction = false;

    class Reptile {
        constructor(name, color, dx, dy, changing_direction) {
            this.name = name;
            this.color = color;
            this.dx = dx;           // snake horizontal movement
            this.dy = dy;           // snake vertical movement
            this.changing_direction = changing_direction;
    
            this.body = [           // each player starts with body length 5
              {x: 200, y: 200},     // starts snake at middle of 400x400 canvas
              {x: 190, y: 200},
              {x: 180, y: 200},
              {x: 170, y: 200},
              {x: 160, y: 200},
            //   {x: 150, y: 200},
            //   {x: 140, y: 200},
            //   {x: 130, y: 200},
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

          changeDirection1(event) {    // need to put this in class and have sep dy/dx
            // console.log('KEY PRESSED!');
            // console.log(event.key);
                
            if (this.changing_direction) return;   // dont allow reverse direction
            // console.log('test here');
            
            // console.log(this.keyDown);
            this.changing_direction = true;
            const keyPressed = event.key;
            // console.log(this);
            const goingUp = this.dy === -10;    // boolean flag equating to true. axis downwards +ve
            const goingDown = this.dy === 10;
            const goingRight = this.dx === 10;
            const goingLeft = this.dx === -10;
            if (keyPressed === 'ArrowLeft' && !goingRight) {    // ! condition prevents reverse dir
                this.dx = -10;
                this.dy = 0;
            }
            if (keyPressed === 'ArrowUp' && !goingDown) {
                this.dx = 0;
                this.dy = -10;
            }
            if (keyPressed === 'ArrowRight' && !goingLeft) {
                this.dx = 10;
                this.dy = 0;
            }
            if (keyPressed === 'ArrowDown' && !goingUp) {
            //   console.log('TURN DOWN NOW!');
                this.dx = 0;
                this.dy = 10;
            }
        }

        changeDirection2(event) {    // for player 2
            if (this.changing_direction) return;   // dont allow reverse direction
            this.changing_direction = true;
            const keyPressed = event.key;
            const goingUp = this.dy === -10;    // boolean flag equating to true. axis downwards +ve
            const goingDown = this.dy === 10;
            const goingRight = this.dx === 10;
            const goingLeft = this.dx === -10;
            if (keyPressed === 'a' && !goingRight) {    // ! condition prevents reverse dir
                this.dx = -10;
                this.dy = 0;
            }
            if (keyPressed === 'w' && !goingDown) {
                this.dx = 0;
                this.dy = -10;
            }
            if (keyPressed === 'd' && !goingLeft) {
                this.dx = 10;
                this.dy = 0;

            }
            if (keyPressed === 's' && !goingUp) {
                this.dx = 0;
                this.dy = 10;
            }
        }

        gameStatusFlag() {
            for (let i = 1; i < this.body.length; i++) {  // check for self-collision
                if (this.body[i].x === this.body[0].x && this.body[i].y === this.body[0].y) return true  //checks if snake has hit itself
            }
            const leftLimit = this.body[0].x < 0;     // creates flag and returns it
            const rightLimit = this.body[0].x > canvas.width - 10;
            const topLimit = this.body[0].y < 0;
            const bottomLimit = this.body[0].y > canvas.height - 10;
            return leftLimit || rightLimit || topLimit || bottomLimit
        }   
    }
    const snake1 = new Reptile('Player1', 'red', 10, 0, false);
    const snake2 = new Reptile('Player2', 'yellow', 10 , 10, false);

    const clearCanvas = () => {        // removes the deleted tail from snake's array of objects
        context.fillStyle = 'white';
        context.strokestyle = 'black';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.strokeRect(0, 0, canvas.width, canvas.height);
      }

    // const gameStatusFlag = () => {
    //     for (let i = 1; i < snake1.body.length; i++) {  // check for self-collision
    //         if (snake1.body[i].x === snake1.body[0].x && snake1.body[i].y === snake1.body[0].y) return true  //checks if snake has hit itself
    //     }
    //     const leftLimit = snake1.body[0].x < 0;     // creates flag and returns it
    //     const rightLimit = snake1.body[0].x > canvas.width - 10;
    //     const topLimit = snake1.body[0].y < 0;
    //     const bottomLimit = snake1.body[0].y > canvas.height - 10;
    //     return leftLimit || rightLimit || topLimit || bottomLimit
    // }   

    document.addEventListener("keydown", (e) => {
        snake1.changeDirection1(e);
        snake1.changing_direction = false;     // resets flag after each dir change for subsequent changes
      });

    document.addEventListener("keydown", (e) => {
        snake2.changeDirection2(e);
        snake2.changing_direction = false;     // resets flag after each dir change for subsequent changes
    });

    const main = () => {
        if (snake1.gameStatusFlag() || snake2.gameStatusFlag()) return;
        
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