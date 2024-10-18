import './page.module.css';


export default function Pong() {

    // Create canvas
    const canvas = document.getElementById("game");
    const context = canvas.getContext("2d");

    // Define grid, paddleheight, maxPadY
    const grid = 15;
    const paddleHeight = grid * 5;

    // Lowest Y for paddle:
    const maxPadY = canvas.height - paddleHeight - grid;

    // hardcode paddle&ball speed
    let paddleSpeed = 6;
    let ballSpeed = 4

    // define left, right (keys: x, y, wid, hei, vel) & ball objects (x, y, velX, velY, reset)
    const leftPaddle = {
        x: grid * 2,
        y: canvas.height / 2 - paddleHeight /2, // middle
        wid: grid,
        hei: paddleHeight,
        vel: 0,
    }

    const rightPaddle = {
        x: canvas.width - grid * 3,
        y: canvas.height / 2 - paddleHeight / 2, // middle
        wid: grid,
        hei: paddleHeight,
        vel: 0,
    }

    const ball = {
        x: canvas.width - grid * 3,
        y: canvas.height / 2 - paddleHeight / 2, // middle
        wid: grid,
        hei: grid,
        velX: ballSpeed,
        velY: ballSpeed,
        reset: false,
    }

    // define collision function. collision detection algorithm for axis-aligned bounding boxes (AABB)
    // true if the objects are colliding, false otherwise.
    function collision(obj1, obj2) {
        return obj1.x < obj2.x + obj2.width && // Checks if the left edge of obj1 is to the left of the right edge of obj2.
               obj1.x + obj1.width > obj2.x && //Checks if the right edge of obj1 is to the right of the left edge of obj2.
               obj1.y < obj2.y + obj2.height && //Checks if the top edge of obj1 is above the bottom edge of obj2.
               obj1.y + obj1.height > obj2.y //Checks if the bottom edge of obj1 is below the top edge of obj2.
    }

    // define game loop
    function gameLoop() {
        // start animation with requestAnimationFrame (tells the browser you wish to perform an animation)
        requestAnimationFrame(gameLoop);

        // clear pixels (context.clearRect(x, y, width, height))
        context.clearRect(0,0,canvas.width,canvas.height);

        // move paddles by velocity
        leftPaddle.y += leftPaddle.vel;
        rightPaddle.y += rightPaddle.vel;

        // prevent paddles going through walls
        // if y val is smaller than grid - move back to grid
        if (leftPaddle.y < grid) {
            leftPaddle.y = grid;
        }
        else if (leftPaddle.y > maxPadY) {
            leftPaddle.y = maxPadY;
        }

        if (rightPaddle.y < grid) {
            rightPaddle.y = grid;
        }
        else if (rightPaddle.y > maxPadY) {
            rightPaddle.y = maxPadY;
        }
        // draw paddles (context.fillRect(x, y, width, height))
        context.fillStyle = 'white';
        context.fillRect()

        // move ball by its velocity

        // prevent balls going through wall by changing velocity

        // reset ball if goes past paddle & reset is false
            //give players time before start again


        // check if ball collides with paddle

        //DRAW - ball, walls, middle line
    }
    //listen to keyboard events
    // 4 keys

    // listen for keys being released: stop

    //START GAME, call 
    requestAnimationFrame(gameLoop);





    return (
        <>
            <body>
                <canvas width="750" height="585" id="game"></canvas>
            </body>
        </>
    )
}