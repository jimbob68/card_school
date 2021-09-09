import React, { useEffect, useState } from 'react';
import './GameSnap.css';

const GameSnap = () => {

    const [ deckOfCards, setDeckOfCards ] = useState([])
    const [ computerScore, setComputerScore ] = useState(0)
    const [ playerScore, setPlayerScore ] = useState(0)
    const [ currentCard, setCurrentCard ] = useState(0)
    const [ isDealing, setIsDealing ] = useState(false)

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
        console.log("currentCard:", currentCard)
        if(isDealing){
            setTimeout(() => {
            setCurrentCard(currentCard + 1)
        }, 2000)
        }
    }, [currentCard, isDealing])

    // useEffect(() => {
    //     console.log("currentCard:", currentCard)
    //     setTimeout(() => {
    //         console.log("currentCard2:", currentCard)
    //         setCurrentCard(deckOfCards[0])
    //         setDeckOfCards(deckOfCards.slice(1))
    //     }, 2000)
    // }, [deckOfCards])

    const handleStartGame = () => {

        // for(let i = 0; i < deckOfCards.length;){
        //     setTimeout(() => {
        //         setCurrentCard(deckOfCards[i])
        //         i++
            // }, 2000)
        // }
        setIsDealing(true)
        // setDeckOfCards(deckOfCards.slice(1))
    }

    const handleSnap = () => {
        setIsDealing(false)
        setTimeout(() => {
        setCurrentCard(currentCard - 1)
        }, 1000)
    }

    return(
        <div>
            <p>Snap</p>
            <button onClick={() => handleStartGame()}>Start Game</button>
            {deckOfCards.length > 0 && <img src={ deckOfCards[currentCard].image} alt={currentCard.code}/>}
            <button onClick={() => handleSnap()}>Snap</button>
        </div>
    )
}
export default GameSnap;