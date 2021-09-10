import React, { useEffect, useState } from 'react';
import './GameSnap.css';

const GameSnap = () => {

    const [ deckOfCards, setDeckOfCards ] = useState([])
    const [ computerScore, setComputerScore ] = useState(0)
    const [ playerScore, setPlayerScore ] = useState(0)
    const [ currentCardIndex, setCurrentCardIndex ] = useState(0)
    const [ isDealing, setIsDealing ] = useState(false)
    const [ displayedCard, setDisplayedCard ] = useState(null)

    useEffect(() => {
        fetch('https://deckofcardsapi.com/api/deck/new/shuffle?deck_count=1')
        .then(res => res.json())
        .then(results => {
            fetch('https://deckofcardsapi.com/api/deck/' + results.deck_id + '/draw/?count=52')
            .then(res => res.json())
            .then(results => setDeckOfCards(results.cards))
        })
    },[])


    useEffect(() => {
        if(isDealing){
            setTimeout(() =>{
                // console.log("current card index", currentCardIndex)
                setCurrentCardIndex(currentCardIndex + 1)
            }, 1500)
        }
    }, [displayedCard])


    useEffect(() => {
        if(isDealing){
            setDisplayedCard(deckOfCards[currentCardIndex])
        }
    }, [currentCardIndex])




    const handleStartGame = () => {
        setDisplayedCard(deckOfCards[0])
        setIsDealing(true)
    }


    const handleSnap = (card) => {
        setIsDealing(false)
        console.log("currentCard", deckOfCards[card])
        console.log("previousCard", deckOfCards[card - 1])
    }


    const handleContinue = () => {
        setTimeout(() => {
            setIsDealing(true)
            setDisplayedCard(deckOfCards[currentCardIndex])
        }, 1000)
        
    }

    return(
        <div>
            <p>Snap</p>
            <button onClick={() => handleStartGame()}>Start Game</button>
            {/* {deckOfCards.length > 0 && <img src={ deckOfCards[currentCard].image} alt={currentCard.code}/>} */}
            {displayedCard && <img src={ displayedCard.image} alt={displayedCard.code}/>}
            <button onClick={() => handleSnap(currentCardIndex)}>Snap</button>
            <button onClick={() => handleContinue()}>Continue</button>
        </div>
    )
}
export default GameSnap;