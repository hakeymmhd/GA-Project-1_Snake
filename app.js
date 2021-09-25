console.log("links established");

$(() => {
    const canvas = document.getElementById("canvas1");
    const context = canvas.getContext("2d");
    let food_x = 200;
    let food_y = 200; 
    let foodFlag = false;

    class Reptile {
        constructor(name, color, dx, dy, changing_direction, left, up, right, down) {
            this.name = name;
            this.color = color;
            this.dx = dx;           // snake horizontal movement
            this.dy = dy;           // snake vertical movement
            this.changing_direction = changing_direction; // for resetting flag after each dir change for subsequent changes
            
            this.goLeft = left;
            this.goUp = up;
            this.goRight = right;
            this.goDown = down;
            
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
            console.log(`${food_x} - ${food_y}`);
            if (this.body[0].x === food_x && this.body[0].y === food_y) {
                foodGen(this);
            } else {
                this.body.pop();
            }
            
            
          }

          changeDirection(event) {    
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
            if (keyPressed === this.goLeft && !goingRight) {    // ! condition prevents reverse dir
                this.dx = -10;
                this.dy = 0;
            }
            if (keyPressed === this.goUp && !goingDown) {
                this.dx = 0;
                this.dy = -10;
            }
            if (keyPressed === this.goRight && !goingLeft) {
                this.dx = 10;
                this.dy = 0;
            }
            if (keyPressed === this.goDown && !goingUp) {
            //   console.log('TURN DOWN NOW!');
                this.dx = 0;
                this.dy = 10;
            }
        }

        gameStatusFlag() {  // figure how to implement inter-player collision detection 
                            // maybe a for loop outside the class and check snake1.body[0] against all of snake2.body
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

    class Game {
        
    }

    const snake1 = new Reptile('Player1', 'red', 10, 0, false, 'ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown');
    const snake2 = new Reptile('Player2', 'yellow', 10 , 10, false, 'a', 'w', 'd', 's');

    const clearCanvas = () => {        // removes the deleted tail from snake's array of objects
        context.fillStyle = 'white';
        context.strokestyle = 'black';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.strokeRect(0, 0, canvas.width, canvas.height);
      }

    const randomGen = (min, max) => {
        return Math.round((Math.random() * (max - min) + min) / 10) * 10;
    }
    const drawFood = () => {
        context.fillStyle = 'green';
        context.strokestyle = 'black';
        context.fillRect(food_x, food_y, 10, 10);
        context.strokeRect(food_x, food_y, 10, 10);
    }

    const foodGen = (obj) => {
        food_x = randomGen(0, canvas.width - 10);
        food_y = randomGen(0, canvas.height - 10);
        obj.body.forEach((cb1) => {
            if (cb1.x === food_x && cb1.y === food_y) foodGen();
        });
        
        obj.body.forEach((cb2) => {
            if (cb2.x === food_x && cb2.y === food_y) foodGen();
        });
    }

    document.addEventListener("keydown", (e) => {
        snake1.changeDirection(e);
        snake1.changing_direction = false;     // resets flag after each dir change for subsequent changes
      });

    document.addEventListener("keydown", (e) => {
        snake2.changeDirection(e);
        snake2.changing_direction = false;     // resets flag after each dir change for subsequent changes
    });

    const main = () => {
        if (snake1.gameStatusFlag() || snake2.gameStatusFlag()) return;
        
        else {
            setTimeout(() => {
                clearCanvas();
                drawFood(snake1, snake2);
                
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