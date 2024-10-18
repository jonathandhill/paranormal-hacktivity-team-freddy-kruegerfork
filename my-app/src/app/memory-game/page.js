"use client";
import { useState, useEffect } from "react";
import "./memory-game.css";
import Link from "next/link";

export default function MemoryGame() {
  let cardsArray = [ "👹", "👹", "🎃", "🎃", "👻", "👻", "💀", "💀", "👽", "👽", "🦴", "🦴", "👺",
    "👺","👿", "👿",
  ];

  //set state variables 
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);

  function checkCards() {
    const [first, second] = flippedCards;
    if (cards[first] === cards[second]) {
      setMatchedCards([...matchedCards, first, second]);
      setScore(score + 1);
    }
    setFlippedCards([]); //reset flipped cards 
  }

  function handleClick(index) {
    if (
      flippedCards.length === 2 ||
      matchedCards.includes(index) ||
      flippedCards.includes(index)
    ) {
      return;
    }
    setFlippedCards([...flippedCards, index]);
  }

  //Effect to check when cards are flipped
  useEffect(() => {
    if (flippedCards.length === 2) {
      setTimeout(checkCards, 1000);
    }
  }, [flippedCards]);


  useEffect(() => {
    const shuffledCards = cardsArray.sort(() => Math.random() - 0.5); //0.5 to throw off sort by 0.5 so not in order
    setCards(shuffledCards);
  }, []);

  if (score === 1) {
    alert("You Win! Click Home to play the next game");
  }

  return (
    <div>
      <Link href="/ ">
        <h2 className="home">Home</h2>
      </Link>
      <h1>Memory Game</h1>
      <h3>Score: {score}</h3>
      <div className="cards">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${
                //check if current card index is flipped and in matched
              flippedCards.includes(index) || matchedCards.includes(index)
              //if either of above conditions are true, cards will be flipped, otherwise nothing
                ? "flipped" //dynamically set className 
                : ""
            }`}
            onClick={() => handleClick(index)}
          >
            {flippedCards.includes(index) || matchedCards.includes(index)
              ? card
              : "❓"}
          </div>
        ))}
      </div>
    </div>
  );
}
