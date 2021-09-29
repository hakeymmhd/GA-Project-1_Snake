console.log("links established");

$(() => {
    const canvas = document.getElementById("canvas1");
    const context = canvas.getContext("2d");
    let food_x = 300;
    let food_y = 300; 
    let pauseFlag = true;
    let gameMode = 0;
    
    let audioPoint = new Audio('./Audio/getPoint.wav');
    let audioGameOver = new Audio('./Audio/gameOver.wav');

    class Reptile {
        constructor(name, color, dx, dy, changing_direction, left, up, right, down, oriX, oriY) {
            this.name = name;
            this.color = color;
            this.dx = dx;           // snake horizontal movement
            this.dy = dy;           // snake vertical movement
            this.changing_direction = changing_direction; // for resetting flag after each dir change for subsequent changes
            this.score = 0;

            this.goLeft = left;
            this.goUp = up;
            this.goRight = right;
            this.goDown = down;
            
            this.body = [           // each player starts with body length 5
              {x: oriX, y: oriY},     // starts snake at middle of 400x400 canvas
              {x: oriX - 10, y: oriY},
              {x: oriX - 20, y: oriY},
              {x: oriX - 30, y: oriY},
              {x: oriX - 40, y: oriY},
            //   {x: 150, y: 200},
            //   {x: 140, y: 200},
            //   {x: 130, y: 200},
            ];
          }

          drawSnake() {
            this.body.forEach((cb) => {
              context.fillStyle = this.color;       // diff colors for each player
              context.strokestyle = 'black';
              context.fillRect(cb.x, cb.y, 10, 10);
              context.strokeRect(cb.x, cb.y, 10 , 10);
            });
          }

          move_snake() {
            
            const addHead = {x: this.body[0].x + this.dx, y: this.body[0].y + this.dy};
            this.body.unshift(addHead);  // prepends new head in front of body and then removes the tail end
            if (this.body[0].x === food_x && this.body[0].y === food_y) {
                audioPoint.play();
                foodGen(this);
                this.score += 10;
                document.getElementById(`${this.name}`).innerHTML = this.getScore();
            } else {
                this.body.pop();
            }
          }

          changeDirection(event) {    
            if (this.changing_direction) return;   // dont allow reverse direction

            this.changing_direction = true;
            const keyPressed = event.key;
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
                this.dx = 0;
                this.dy = 10;
            }
        }

        gameStatusFlag() {  
            for (let i = 3; i < this.body.length; i++) {  // check for self-collision
             if (this.body[i].x === this.body[0].x && this.body[i].y === this.body[0].y) return true  //checks if snake has hit itself
            }

            const leftLimit = this.body[0].x < 0;     // creates flag and returns it
            const rightLimit = this.body[0].x > canvas.width - 10;
            const topLimit = this.body[0].y < 0;
            const bottomLimit = this.body[0].y > canvas.height - 10;
            return leftLimit || rightLimit || topLimit || bottomLimit
        }   

        gameStatusFlag_Multi(competitor) {                  
            for (let i = 3; i < this.body.length; i++) {  // check for self-collision
                if (this.body[i].x === this.body[0].x && this.body[i].y === this.body[0].y) return true  //checks if snake has hit itself
            }
          
            for (let j = 0; j<competitor.length; j++) {    //check for inter-player collision
               
                if (this.body[0].x === competitor[j].x && this.body[0].y === competitor[j].y) return true; 
            }

            const leftLimit = this.body[0].x < 0;     // creates flag and returns it
            const rightLimit = this.body[0].x > canvas.width - 10;
            const topLimit = this.body[0].y < 0;
            const bottomLimit = this.body[0].y > canvas.height - 10;
            return leftLimit || rightLimit || topLimit || bottomLimit
        }   

        getSnakePos() {
            return this.body;
        }

        createScore() {
            let playerTag = $('<p>').text(`${this.name}`).addClass("player");
            let p1 = $('<p>').attr('id', `${this.name}`);
            $('#Score').append(playerTag, p1);
            document.getElementById(`${this.name}`).innerHTML = this.getScore();
        } 
        
        getScore () {
            return this.score;
        }

        removeScore() {
            let playerTag = $('.player');
            let p1 = $(`#${this.name}`);
            playerTag.detach();
            p1.detach();
        }
    }

    let snake1 = new Reptile('Player1', 'red', 10, 0, false, 'ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown', 200, 200);
    let snake2 = new Reptile('Player2', 'yellow', 10 , 0, false, 'a', 'w', 'd', 's', 100, 100);

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

    document.addEventListener("keydown", (e) => {
        if (e.code === 'Space') {
            if (pauseFlag === false) {
                pauseFlag = true;
                console.log(`false flag is now ${pauseFlag}`);
            } else {
                pauseFlag = false;
                console.log(`false flag is now ${pauseFlag}`);
            }
        }
      });

    const singlePl = document.getElementById("singlePlayer");
    const multiPl = document.getElementById("multiPlayer");
    const restartgame = document.getElementById("restart");

    singlePl.addEventListener("click", () => {      
        singleMode();
        console.log("single mode clicked");
    });

    multiPl.addEventListener("click", () => {
        multiMode();
        console.log("Multiplayer mode clicked");
    });

    restartgame.addEventListener("click", () => {
        if (gameMode === 2) {
            snake1 = new Reptile('Player1', 'red', 10, 0, false, 'ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown', 200, 200);
            snake2 = new Reptile('Player2', 'yellow', 10 , 0, false, 'a', 'w', 'd', 's', 100, 100);
            snake1.removeScore();
            snake2.removeScore();
            multiMode();
        }
        else {
            snake1 = new Reptile('Player1', 'red', 10, 0, false, 'ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown', 200, 200);
            snake1.removeScore();
            singleMode();
        }
    })

    const multiMode = () => {
        if (pauseFlag) return;
        else {
            gameMode = 2;
            snake1.createScore();
            snake2.createScore();
            const multiGame = setInterval(() => {
                if (snake1.gameStatusFlag_Multi(snake2.getSnakePos()) || snake2.gameStatusFlag_Multi(snake1.getSnakePos())) {
                    clearInterval(multiGame);
                    audioGameOver.play();
                }
                
                clearCanvas();
                drawFood(snake1, snake2);
                
                snake1.move_snake();
                snake1.drawSnake();

                snake2.move_snake();
                snake2.drawSnake();
            }, 100) 
        }
    }

    const singleMode = () => {
        if (pauseFlag) return 
        else {
            gameMode = 1;
            snake1.createScore();
            const singleGame = setInterval(() => {
                if (snake1.gameStatusFlag()) {  
                    clearInterval(singleGame);
                    audioGameOver.play();
                }
                clearCanvas();
                drawFood(snake1);
                
                snake1.move_snake();
                snake1.drawSnake();
        
            }, 100) 
        }
    }
})
