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
    }

})