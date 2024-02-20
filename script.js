canvas = document.getElementById("cnvs");
ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


class Rain{
    constructor(){
        this.vetRain = [];
        this.numRain = 1000;
        this.gravity = 0.1;

        this.vetWater = [];
       
        this.firstColor = `hsl(220, 100%, 50%, 1)`;
        this.secondColor = `hsl(220, 100%, 50%, 0)`;

        this.CreateRain();
        this.CreateWater();
    }

    CreateRain(){
        for (let i = 0; i < this.numRain; i++){
            var position = {'x': Math.random() * canvas.width, 'y': Math.random() * (-800)};
            var velocity = {'x': 0, 'y': (Math.random() * (20 - 10)) + 10}
            this.vetRain.push({'position': position, 'velocity': velocity});
        }
    }

    CreateWater(){
        for (let i = 0; i < 1000; i++){
            var positionWater = {'x': Math.floor(Math.random() * canvas.width), 'y': canvas.height}
            var water = {'position': positionWater, 'velocityX': Math.floor(Math.random() * 20), 'radius':  Math.floor(Math.random() * (150 - 100)) + 100, 'mass': 20};
            this.vetWater.push(water);
        }
    }

    DrawRain(){
        for (let i = 0; i < this.numRain; i++){
            ctx.strokeStyle = "blue";
            ctx.beginPath();
            ctx.moveTo(this.vetRain[i].position.x, this.vetRain[i].position.y);
            ctx.lineTo(this.vetRain[i].position.x, this.vetRain[i].position.y + 7);
            ctx.stroke(); 
            ctx.closePath();
        }
    }

    DrawWater(x, y, r){
        var gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
        gradient.addColorStop(0, this.firstColor);
        gradient.addColorStop(1, this.secondColor);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();

    }

    Update(){

        for (let i = 0; i < this.numRain; i++){
            this.vetRain[i].velocity.y += this.gravity;
            this.vetRain[i].position.y += this.vetRain[i].velocity.y;

            if (this.vetRain[i].position.y > canvas.height + 100){
                this.vetRain[i].position.x = Math.random() * canvas.width;
                this.vetRain[i].position.y = Math.random() * (-200);
                this.vetRain[i].velocity.y = (Math.random() * (50 - 10)) + 10;

            }
        }
        this.DrawRain();
        this.vetWater.forEach(water => {
            
            water.position.y += this.gravity  + water.mass;

            
            water.position.x += water.velocityX;

            if (water.position.x > canvas.width){
                water.velocityX *= -1;
            }

            if (water.position.x < 0){
                water.velocityX *= -1;
            }

            if (water.position.y > canvas.height){
                water.position.y = canvas.height;
            }
            
            water.radius+=0.05;
            
            

            this.DrawWater(water.position.x, water.position.y, water.radius);
        });
    }
}


var rain = new Rain();

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(animate);
    rain.Update();
    //app.update();
}
animate();
