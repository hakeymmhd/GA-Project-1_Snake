
console.log("auxFunctions.js linked");

$(() => {

    const snake1 = new Reptile('Player1', 'red', 10, 0, false, 'ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown', 200, 200);
    const snake2 = new Reptile('Player2', 'yellow', 10 , 0, false, 'a', 'w', 'd', 's', 100, 100);

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
})