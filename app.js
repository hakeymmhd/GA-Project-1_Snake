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
    
            this.body = [
              {x: 200, y: 200},
              {x: 190, y: 200},
              {x: 180, y: 200},
              {x: 170, y: 200},
              {x: 160, y: 200},
            ];
          }
    }
})