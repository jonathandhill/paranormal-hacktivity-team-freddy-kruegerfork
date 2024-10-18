'use client'
import { useState } from "react";
import { useEffect } from "react";
import "./memory-game.css"

export default function MemoryGame() {
    let cardsArray = ["👹", "👹", "🎃", "🎃", "👻", "👻", "💀", "💀", "👽", "👽", "🦴", "🦴", "👺", "👺", "👿", "👿"]; 
    
    // 
    const [cards, setCards] = useState([]);

    useEffect(() => {
        //used range of -0.5 and 0.5 to set off array when sorting to randomising
        const shuffledCards = cardsArray.sort(() => Math.random() - 0.5);
        setCards(shuffledCards);
    }, []);

    return (
        <div>
            <h1>Memory Game</h1>
            <div className="cards">
                {cards.map((card, index) => (
                    //assigns unique key to each div, based on index
                    <div key={index}>
                        {card}
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