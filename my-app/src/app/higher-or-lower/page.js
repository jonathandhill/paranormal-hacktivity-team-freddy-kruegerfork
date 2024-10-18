"use client";
import './page.css';  // Ensure your CSS is linked
import { useState } from 'react';
import Link from 'next/link';

export default function HigherOrLower() {
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]; // 13 cards in a deck
  const [currentCard, setCurrentCard] = useState(null); 
  const [newCard, setNewCard] = useState(null); 
  const [resultMessage, setResultMessage] = useState("");

  function handlePlayerChoice(choice) {
    setCurrentCard(cards[Math.floor(Math.random() * cards.length)]); 
    setNewCard(cards[Math.floor(Math.random() * cards.length)]); 
    setCurrentCard(newCard);

    if (newCard > currentCard && choice === "higher") {
      setResultMessage("You win!");
    } else if (newCard < currentCard && choice === "lower") { 
      setResultMessage("You win!");
    } else if (newCard === currentCard) {
      setResultMessage("It's a draw!");
    } else {
      setResultMessage("You lose!");
    } 
  }

  return (
    <div className="game-container">
      <h1 className="game-title">Higher or Lower</h1>
      
      <h2 className="current-card">Current card: {currentCard}</h2>

      <div className="buttons-container">
        <button className="game-button" onClick={() => handlePlayerChoice("higher")}>Higher</button>
        <button className="game-button" onClick={() => handlePlayerChoice("lower")}>Lower</button>
      </div>

      {resultMessage && 
        <p className={`result-message ${resultMessage === "You lose!" ? 'lose' : 'win'}`}>
          The new card was {newCard}, {resultMessage}
        </p>
      }

      <Link href="/">
        <p className="home-link">Home</p>
      </Link>
    </div>
  );
}
