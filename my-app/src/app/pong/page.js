import './page.module.css';


export default function Pong() {

    // Create canvas
    const canvas = document.getElementById("game");
    const context = canvas.getContext("2d");
    // Define grid, paddleheight, maxPadY
    const grid = 15;
    const paddleheight = grid * 5;
    const maxPadY = canvas.height - paddleheight - grid;

    // hardcode paddle&ball speed

    // define left, right (keys: x, y, wid, hei, vel) & ball objects (x, y, velX, velY, reset)

    // define collision function

    // define game loop
    // start animation with requestAnimationFrame
    // clear pixels

    // move paddles by velocity

    // prevent paddles going through walls

    // draw paddles

    // move ball by its velocity

    // prevent balls going through wall by changing velocity

    // reset ball if goes past paddle & reset is false
        //give players time before start again


    // check if ball collides with paddle

    //DRAW - ball, walls, middle line

    //listen to keyboard events
    // 4 keys

    // listen for keys being released: stop

    //START GAME, call function




    return (
        <>
            <body>
                <canvas width="750" height="585" id="game"></canvas>
            </body>
        </>
    )
}