"use client"
import Link from 'next/link';
import './page.module.css';
import Image from 'next/image';
import { useState } from 'react';


export default function HigherOrLower() {

// array of cards (per suit)
let cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

const [playerChoice, setPlayerChoice] = useState("null")

function gameRound() {

  let card = cards[Math.floor(Math.random() * cards.length)]


  // pick next random card
  let newCard = cards[Math.floor(Math.random() * cards.length)]

  // if (newCard === card) {
  //   console.log("It's a tie! try again")
  // } else

  console.log(newCard)

  if (newCard > card && playerChoice === "higher" || newCard < card && playerChoice === "lower") {
    console.log("You win!")
  } else {
    console.log("You lose!")
  }

}


  return (
    <>
        <h1>Higher or Lower</h1>
        <button onClick={gameRound}>Play</button>
        <button onClick={() => { setPlayerChoice("higher")  }}>Higher</button>
        <button onClick={() => { setPlayerChoice("lower")  }}>Lower</button>

    </>
  );
}



