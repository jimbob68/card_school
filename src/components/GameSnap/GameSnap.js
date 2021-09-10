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
                console.log("current card index", currentCardIndex)
                setCurrentCardIndex(currentCardIndex + 1)
            }, 1500)
        }
    }, [displayedCard])

    let playerHasSnapped = false;
    let computerHasSnapped = false;

    useEffect(() => {
        setTimeout(() => {
            if(currentCardIndex >= 1 && !playerHasSnapped){
                handleComputerSnap(currentCardIndex)
            }
        }, 1400)
    },[displayedCard, isDealing])


    useEffect(() => {
        if(isDealing){
            setDisplayedCard(deckOfCards[currentCardIndex])
        }
    }, [currentCardIndex])

    const handleComputerSnap = (cardIndex) => {
        const pointsWon = cardIndex - (computerScore + playerScore)
        if(deckOfCards[cardIndex].value === deckOfCards[cardIndex - 1].value){
            setIsDealing(false)
            setComputerScore(computerScore + pointsWon)
            computerHasSnapped = true
        }
        // console.log("cardIndex:", cardIndex)
    }


    const handleStartGame = () => {
        setDisplayedCard(deckOfCards[0])
        setIsDealing(true)
    }


    const handlePlayerSnap = (card) => {
        playerHasSnapped = true
        setIsDealing(false)
        const pointsWon = card - (computerScore + playerScore)
        if(deckOfCards[card].value === deckOfCards[card -1].value && !computerHasSnapped){
            
            setPlayerScore(playerScore + pointsWon)
        } else {
            setComputerScore(computerScore + pointsWon)
        }
        console.log("score:", card - (computerScore + playerScore))
        console.log("currentCard", deckOfCards[card])
        console.log("previousCard", deckOfCards[card - 1])
    }


    const handleContinue = () => {
        computerHasSnapped = false
        playerHasSnapped = false
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
            <button  disabled={!isDealing} onClick={() => handlePlayerSnap(currentCardIndex)}>Snap</button>
            <button onClick={() => handleContinue()}>Continue</button>
            <p>Player Score: {playerScore}</p>
            <p>Computer Score: {computerScore}</p>
        </div>
    )
}
export default GameSnap;