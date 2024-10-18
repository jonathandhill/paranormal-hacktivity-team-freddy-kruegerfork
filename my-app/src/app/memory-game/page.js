'use client'
import { useState } from "react";
import { useEffect } from "react";
import "./memory-game.css"

export default function MemoryGame() {
    let cardsArray = ["👹", "👹", "🎃", "🎃", "👻", "👻", "💀", "💀", "👽", "👽", "🦴", "🦴", "👺", "👺", "👿", "👿"]; 
    let score = 0;
    
    // 
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);

    // function increaseScore() {
        
    // }

    function checkCards() {
        const [first, second] = flippedCards;
        if (cards[first] === cards[second]) {
            setMatchedCards([...matchedCards, first, second])
            setScore(score + 1);
        }
        setFlippedCards([])

    }

    function handleClick(index) {
        if (flippedCards.length === 2 || matchedCards.includes(index) || flippedCards.includes(index)) {
            return;
        }

    }

    useEffect(() => {
        //used range of -0.5 and 0.5 to set off array when sorting to randomising
        const shuffledCards = cardsArray.sort(() => Math.random() - 0.5);
        setCards(shuffledCards);
    }, []);

    return (
        <div>
            <h1>Memory Game</h1>
            <h2>Score: {score}</h2>
            <div className="cards">
                {cards.map((card, index) => (
                    //assigns unique key to each div, based on index
                    <div key={index}
                    className={`card ${flippedCards.includes(index) || matchedCards.includes(index) ? 'flipped' : ''}`} 
                    onClick={() => handleClick(index)}
                    >
                        {flippedCards.includes(index) || matchedCards.includes(index) ? card : "Choose a Card"}
                    </div>
                ))}
            </div>
        </div>
    );
}

//memory game
//create an array of random pairs
//display randomly 4x4 grid
// onclick of card, flip cards, need to flip 2 and compare 
//if matches, score counter goes up by 1
// if != flip back over
//when all cards turned over, wins game