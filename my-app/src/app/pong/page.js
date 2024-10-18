'use client';

import { useEffect, useState } from 'react';
import './page.css';

export default function Pong() {
  let context;
  let canvas;
  let maxPadY;
  let paddleSpeed;
  let leftPaddle;
  let ball;
  let grid;
  const [leftScore, setLeftScore] = useState(0);
  const [ballSpeed, setBallSpeed] = useState(4);


  useEffect(() => {
    // Create canvas
    canvas = document.getElementById('game');
    context = canvas.getContext('2d');

   

    // Define grid, paddleheight, maxPadY
    grid = 15;
    const paddleHeight = grid * 5;

    // Lowest Y for paddle:
    maxPadY = canvas.height - paddleHeight - grid;

    // hardcode paddle&ball speed
    paddleSpeed = 6;
    // let ballSpeed = 4;

    // define left, right (keys: x, y, wid, hei, vel) & ball objects (x, y, velX, velY, reset)
    leftPaddle = {
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

    ball = {
      x: canvas.width - grid * 3,
      y: canvas.height / 2 - paddleHeight / 2, // middle
      wid: grid,
      hei: grid,
      velX: ballSpeed,
      velY: ballSpeed,
      reset: false,
    };

    //listen to keyboard events
    // 2 keys
    document.addEventListener('keydown', function (e) {
      // up arrow key
      if (e.which === 38) {
        leftPaddle.vel = -paddleSpeed;
      }
      // down arrow key
      else if (e.which === 40) {
        leftPaddle.vel = paddleSpeed;
      }
    });

    // listen for keys being released: stop
    document.addEventListener('keyup', function (e) {
      if (e.which === 38 || e.which === 40) {
        leftPaddle.vel = 0;
      }
    });

    // const ob1 = {
    //     x: 1,
    //     y: 4,
    //     width: 3,
    //     height: 3,
    // }
    // const ob2 = {
    //     x: 6,
    //     y: 7,
    //     width: 4,
    //     height: 4,
    // }
    // console.log(collision(ob1, ob2));


     //START GAME, call
        requestAnimationFrame(gameLoop);
  }, []);

  // define collision function. collision detection algorithm for axis-aligned bounding boxes (AABB)
  // true if the objects are colliding, false otherwise.
  function collision(obj1, obj2) {
        return (
            obj1.x < obj2.x + obj2.wid && // Checks if the left edge of obj1 is to the left of the right edge of obj2.
            obj1.x + obj1.wid > obj2.x && //Checks if the right edge of obj1 is to the right of the left edge of obj2.
            obj1.y < obj2.y + obj2.hei && //Checks if the top edge of obj1 is above the bottom edge of obj2.
            obj1.y + obj1.hei > obj2.y //Checks if the bottom edge of obj1 is below the top edge of obj2.
        )
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
        context.fillStyle = 'red';
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
        setLeftScore(0)
        setBallSpeed(3);

        //give players time before start again, ball back to middle
        setTimeout(() => {
            ball.reset = false;
            ball.x = canvas.width / 2;
            ball.y = canvas.height / 2;
        }, 400);
        }
        // check if ball collides with paddle
        if (collision(leftPaddle, ball)) {
            setLeftScore((prevScore) => prevScore + 1);
            ball.velX *= -1;

            // move ball next to paddle
            ball.x = leftPaddle.x + leftPaddle.wid;
        }

    //     // Increase ball speed when score reaches 5
    //   if (leftScore > 2) {
    //     setBallSpeed((prevSpeed) => prevSpeed + 7);
    //   }
        // else {
        //     console.log("ball:", ball)
        //     console.log("bat:", leftPaddle)
        // }
        
        // else if () right paddle

        //DRAW - ball, walls
        // ball
        context.fillStyle = 'orange';
        context.fillRect(ball.x, ball.y, ball.wid, ball.hei);

        // walls (x, y, width, height)
        context.fillStyle = 'lightgrey';
        context.fillRect(0, 0, canvas.width, grid);
        context.fillRect(0, canvas.height - grid, canvas.width, canvas.height);
        context.fillRect(canvas.width - grid, 0, grid, canvas.height); //right wall
    }

  return (
    
    <div
        style={{
          position: 'absolute',
          top: '16px',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          fontSize: '2.25rem',
          fontWeight: 'bold',
        }}
      >
    <span style={{ marginRight: '1rem' }}>{leftScore}</span>
      <canvas width="750" height="585" id="game"></canvas>
    </div>
  );
}
