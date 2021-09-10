import React, { useEffect, useState } from 'react';
import './GameSnap.css';

const GameSnap = () => {

    const [ deckOfCards, setDeckOfCards ] = useState([])
    const [ computerScore, setComputerScore ] = useState(0)
    const [ playerScore, setPlayerScore ] = useState(0)
    const [ currentCardIndex, setCurrentCardIndex ] = useState(0)
    const [ isDealing, setIsDealing ] = useState(false)
    const [ displayedCard, setDisplayedCard ] = useState(null)
    const [ imageSize, setImageSize ] = useState("medium")
    const [ numberOfDecks, setNumberOfDecks ] = useState(1)

    useEffect(() => {
        fetchDecks()
    },[numberOfDecks])

    const fetchDecks = () => {
        fetch('https://deckofcardsapi.com/api/deck/new/shuffle?deck_count=' + numberOfDecks)
        .then(res => res.json())
        .then(results => {
            fetch('https://deckofcardsapi.com/api/deck/' + results.deck_id + '/draw/?count=' + (52 * numberOfDecks))
            .then(res => res.json())
            .then(results => setDeckOfCards(results.cards))
        })
    }


    useEffect(() => {       
        if(isDealing){
           setTimeout(() =>{
                console.log("current card index", currentCardIndex)
                if(currentCardIndex < (51 * numberOfDecks)){
                    setCurrentCardIndex(currentCardIndex + 1)
                } else {
                    alert("Game over")
                }
            }, 1500)
        }
    }, [displayedCard])

    let playerHasSnapped = false;
    let computerHasSnapped = false;

    useEffect(() => {
        const snapTime = Math.floor(Math.random() * (1400 - 600 + 1)) + 600
        console.log("SnapTime:", snapTime)
        setTimeout(() => {
            if(currentCardIndex >= 1 && !playerHasSnapped){
                handleComputerSnap(currentCardIndex)
            }
        }, snapTime)
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

            <select value={imageSize} onChange={(event) => {
				
				setImageSize(event.target.value)}}>
				<option selected="selected" value={"medium-snap"}>Card size</option>
				<option value={"small-snap"}>small</option>
				<option value={"medium-snap"}>medium</option>
				<option value={"large-snap"}>large</option>
			</select>

            <select value={numberOfDecks} onChange={(event) => {setNumberOfDecks(event.target.value)}}>
                <option value={1}>No. of decks</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
            </select>

            <button onClick={() => handleStartGame()}>Start Game</button>
            {/* {deckOfCards.length > 0 && <img src={ deckOfCards[currentCard].image} alt={currentCard.code}/>} */}
            {displayedCard && <img className={imageSize} src={ displayedCard.image} alt={displayedCard.code}/>}
            <button  disabled={!isDealing} onClick={() => handlePlayerSnap(currentCardIndex)}>Snap</button>
            <button onClick={() => handleContinue()}>Continue</button>
            <p>Player Score: {playerScore}</p>
            <p>Computer Score: {computerScore}</p>
        </div>
    )
}
export default GameSnap;