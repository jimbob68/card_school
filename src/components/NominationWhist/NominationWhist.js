import React, { useEffect, useState } from 'react'
import './NominationWhist.css'

const NominationWhist = () => {

    const [ deckOfCards, setDeckOfCards ] = useState([])
    const [ numberOfPlayers, setNumberOfPlayers ] = useState(2)
    const [ playerOneHand, setPlayerOneHand ] = useState([])
    const [ playerTwoHand, setPlayerTwoHand ] = useState([])
    const [ imageSize, setImageSize ] = useState("whist-medium")
    const [ activePlayer, setActivePlayer ] = useState(1)
    const [ cardPot, setCardPot ] = useState([])
    const [ currentRound, setCurrentRound ] = useState(0)
    const [ playerOneScore, setPlayerOneScore ] = useState(0)
    const [ playerTwoScore, setPlayerTwoScore ] = useState(0)

    const trumpSuits = ["CLUBS", "DIAMONDS", "HEARTS", "SPADES", "", "CLUBS", "DIAMONDS", "HEARTS", "SPADES", "" ]

    useEffect(() => {
		
        fetchCards()
		
	}, []);

    useEffect(() => {
        if(cardPot.length === numberOfPlayers){
        handleEndHand()
        }
    }, [cardPot])

    useEffect(() => {
        if(playerOneHand.length === 0 && playerTwoHand.length === 0 && currentRound > 0){
            fetchCards()
            const currentRoundVariable = currentRound 
            
            setTimeout(() => {
                setCurrentRound(currentRoundVariable + 1)
                handleDealCards(currentRoundVariable + 1)
            }, 1000)
        }
    }, [playerOneHand, playerTwoHand])

    const fetchCards = () => {
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle?deck_count=1')
            .then((res) => res.json())
            .then((results) => {
                console.log('deck info', results);
                return results.deck_id;
            })
            .then((deck_id) => {
                fetch('https://deckofcardsapi.com/api/deck/' + deck_id + '/draw/?count=52')
                    .then((res) => res.json())
                    .then((results) => setDeckOfCards(results.cards));
            })
            .catch(err => console.log(err))
        }

    const handleDealCards = (currentRoundVariable) => {
        if(currentRound === 0) setCurrentRound(1)
        let deck = deckOfCards;
        console.log("currentRound:", currentRound)
        setPlayerOneHand(deck.slice(0, (10 - currentRoundVariable + 1)));
        // setPlayerTwoHand(deck.slice((10 - currentRoundVariable + 1), (20 - currentRoundVariable + 1)))
        setPlayerTwoHand(deck.slice((10 - currentRoundVariable + 1), (10 - currentRoundVariable + 1) + 10 - currentRoundVariable + 1))
    }

    const handleSelectCard = (card, cardIndex) => {
        let cardPotVariable = cardPot
        if(cardPotVariable.length === numberOfPlayers) cardPotVariable = []
        if(activePlayer === 1){
            card.player = 1
            playerOneHand.splice(cardIndex, 1)
            setPlayerOneHand([...playerOneHand])
        }
        else if (activePlayer === 2){
            card.player = 2
            playerTwoHand.splice(cardIndex, 1)
            setPlayerTwoHand([...playerTwoHand])
        }
        if(activePlayer < numberOfPlayers){
            setActivePlayer(activePlayer + 1)
        } else {
            setActivePlayer(1)

        }
        setCardPot([...cardPotVariable, card])
    }

    



    const handleEndHand = () => {
        const trumpSuit = trumpSuits[currentRound - 1]
        const selectedSuit = cardPot[0].suit
        let highestTrumpCard = {value: 0}
        let highestSuitCard = {value: 0}
        cardPot.forEach(card => {
            if(card.value === "JACK")card.value = "11"
            if(card.value === "QUEEN")card.value = "12"
            if(card.value === "KING")card.value = "13"
            if(card.value === "ACE")card.value = "14"

            if(card.suit === trumpSuit && parseInt(card.value) > parseInt(highestTrumpCard.value)){
                highestTrumpCard = card
            }
            if(card.suit === selectedSuit && parseInt(card.value) > parseInt(highestSuitCard.value)){
                highestSuitCard = card
            }
        })
        console.log("highest Trump Card:", highestTrumpCard)
        console.log("highest Suit Card:", highestSuitCard)
        if(highestTrumpCard.value > 0){
            if(highestTrumpCard.player === 1) {
                setPlayerOneScore(playerOneScore + 1)
                setActivePlayer(1)
            }
            if(highestTrumpCard.player === 2) {
                setPlayerTwoScore(playerTwoScore + 1) 
                setActivePlayer(2)
            }
        } else {

            if(highestSuitCard.player === 1) {
                setPlayerOneScore(playerOneScore + 1)
                setActivePlayer(1)
            }
            if(highestSuitCard.player === 2) {
                setPlayerTwoScore(playerTwoScore + 1)
                setActivePlayer(2)
            }
        }
    }

    const displayCards = (hand, playerNumber) => {
            const cardImages = hand.map((card, index) => <img onClick={() => handleSelectCard(card, index)} className={imageSize} src={card.image} alt={card.code} />);
            return <div className="whist-player-hand">{cardImages}</div>;
    }


    return(
        <div>
            <p>Nomination Whist</p>
            <button onClick={() => handleDealCards(1)}>Start Game</button>
            <p>Active Player: {activePlayer} </p>
            <p>Player One: {playerOneScore}</p>
            <p>Player Two: {playerTwoScore}</p>
            {displayCards(cardPot)}
            {displayCards(playerOneHand)}
            {displayCards(playerTwoHand)}
        </div>
    )
}
export default NominationWhist