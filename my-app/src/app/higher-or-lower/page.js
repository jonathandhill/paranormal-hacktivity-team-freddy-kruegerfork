
import Link from 'next/link';
import './page.module.css';
import Image from 'next/image';








export default function HigherOrLower() {

    // array of cards (per suit)
let cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

//  random card
let card = cards[Math.floor(Math.random() * cards.length)]

// let playerChoice = prompt("Higher or lower")

let newCard = cards[Math.floor(Math.random() * cards.length)]

if (newCard > card && playerChoice === "higher") {
  console.log("You win!")
}

  return (
    <>
        <h1>Higher or Lower</h1>
    </>
  );
}

