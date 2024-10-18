import { useEffect } from 'react';
import './page.css';

export default function Pong() {
  useEffect(() => {
        // Create canvas
        const canvas = document.getElementById('game');
        const context = canvas.getContext('2d');
    }, []);

  // Define grid, paddleheight, maxPadY
  const grid = 15;
  const paddleHeight = grid * 5;

  // Lowest Y for paddle:
  const maxPadY = canvas.height - paddleHeight - grid;

  // hardcode paddle&ball speed
  let paddleSpeed = 6;
  let ballSpeed = 4;

  // define left, right (keys: x, y, wid, hei, vel) & ball objects (x, y, velX, velY, reset)
  const leftPaddle = {
    x: grid * 2,
    y: canvas.height / 2 - paddleHeight / 2, // middle
    wid: grid,
    hei: paddleHeight,
    vel: 0,
  };

  // const rightPaddle = {
  //     x: canvas.width - grid * 3,
  //     y: canvas.height / 2 - paddleHeight / 2, // middle
  //     wid: grid,
  //     hei: paddleHeight,
  //     vel: 0,
  // }

  const ball = {
    x: canvas.width - grid * 3,
    y: canvas.height / 2 - paddleHeight / 2, // middle
    wid: grid,
    hei: grid,
    velX: ballSpeed,
    velY: ballSpeed,
    reset: false,
  };

  // define collision function. collision detection algorithm for axis-aligned bounding boxes (AABB)
  // true if the objects are colliding, false otherwise.
  function collision(obj1, obj2) {
    return (
      obj1.x < obj2.x + obj2.width && // Checks if the left edge of obj1 is to the left of the right edge of obj2.
      obj1.x + obj1.width > obj2.x && //Checks if the right edge of obj1 is to the right of the left edge of obj2.
      obj1.y < obj2.y + obj2.height && //Checks if the top edge of obj1 is above the bottom edge of obj2.
      obj1.y + obj1.height > obj2.y
    ); //Checks if the bottom edge of obj1 is below the top edge of obj2.
  }

  // define game loop
  function gameLoop() {
    // start animation with requestAnimationFrame (tells the browser you wish to perform an animation)
    requestAnimationFrame(gameLoop);

    // clear pixels (context.clearRect(x, y, width, height))
    context.clearRect(0, 0, canvas.width, canvas.height);

    // move paddles by velocity
    leftPaddle.y += leftPaddle.vel;
    // rightPaddle.y += rightPaddle.vel;

    // prevent paddles going through walls
    // if y val is smaller than grid - move back to grid
    if (leftPaddle.y < grid) {
      leftPaddle.y = grid;
    } else if (leftPaddle.y > maxPadY) {
      leftPaddle.y = maxPadY;
    }

    // if (rightPaddle.y < grid) {
    //     rightPaddle.y = grid;
    // }
    // else if (rightPaddle.y > maxPadY) {
    //     rightPaddle.y = maxPadY;
    // }
    // draw paddles (context.fillRect(x, y, width, height))
    context.fillStyle = 'white';
    context.fillRect(
      leftPaddle.x,
      leftPaddle.y,
      leftPaddle.wid,
      leftPaddle.hei
    );
    // context.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.wid, rightPaddle.hei);

    // move ball by its velocity
    ball.x += ball.velX;
    ball.y += ball.velY;

    // prevent balls going through wall by changing velocity
    // TOP WALL with top of ball
    if (ball.y < grid) {
      ball.y = grid;
      ball.velY *= -1; //rebound 90 degree
    }
    // BOTTOM WALL with bottom of ball (ball.y + grid)
    else if (ball.y + grid > canvas.height - grid) {
      ball.y = canvas.height - grid * 2;
      ball.velY *= -1;
    } // RIGHT WALL with right of ball (ball.x + grid)
    else if (ball.x + grid > canvas.width - grid) {
      ball.x = canvas.width - grid * 2;
      ball.velX *= -1;
    }

    // reset ball if goes past paddle (ball.x < 0 or ball.x > canvas.width) & reset is false
    if ((ball.x < 0 || ball.x > canvas.width) && !ball.reset) {
      ball.reset = true;

      //give players time before start again, ball back to middle
      setTimeout(() => {
        ball.reset = false;
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
      }, 400);
    }
    // check if ball collides with paddle
    if (collision(leftPaddle, ball)) {
      ball.velX *= -1;

      // move ball next to paddle
      ball.x = leftPaddle.x + leftPaddle.wid;
    }
    // else if () right paddle

    //DRAW - ball, walls
    // ball
    context.fillRect(ball.x, ball.y, ball.wid, ball.hei);

    // walls (x, y, width, height)
    context.fillStyle = 'lightgrey';
    context.fillRect(0, 0, canvas.width, grid);
    context.fillRect(0, canvas.height - grid, canvas.width, canvas.height);
    context.fillRect(canvas.width - grid, 0, grid, canvas.height); //right wall
  }
  //listen to keyboard events
  // 2 keys
  document.addEventListener('keydown', function (e) {
    // up arrow key
    if (e.which === 38) {
      leftPaddle.dy = -paddleSpeed;
    }
    // down arrow key
    else if (e.which === 40) {
      leftPaddle.dy = paddleSpeed;
    }
  });

  // listen for keys being released: stop
  document.addEventListener('keyup', function (e) {
    if (e.which === 38 || e.which === 40) {
      leftPaddle.dy = 0;
    }
  });

  //START GAME, call
  requestAnimationFrame(gameLoop);

  return (
      <div>
        <canvas width="750" height="585" id="game"></canvas>
      </div>
  );
}
