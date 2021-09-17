import React, { useEffect, useState } from 'react';
import './GameSnap.css';
import SnapEndGameModal from './SnapEndGameModal.js'
import backOfCard from '../../assets/back_of_card.png';




const GameSnap = ({ setCurrentGame }) => {

    const [ deckOfCards, setDeckOfCards ] = useState([])
    const [ computerScore, setComputerScore ] = useState(0)
    const [ playerScore, setPlayerScore ] = useState(0)
    const [ currentCardIndex, setCurrentCardIndex ] = useState(0)
    const [ isDealing, setIsDealing ] = useState(false)
    const [ displayedCard1, setDisplayedCard1 ] = useState({image:backOfCard})
    const [ displayedCard2, setDisplayedCard2 ] = useState({image:backOfCard})
    // const [ imageSize, setImageSize ] = useState("medium")       // HOW IT WAS
    const [ imageSize, setImageSize ] = useState("medium-snap")     // MY FIX
    const [ numberOfDecks, setNumberOfDecks ] = useState(1)
    const [ card1Styling, setCard1Styling ] = useState("above")
    const [ card2Styling, setCard2Styling ] = useState("below")
    const [ endGameModalIsOpen, setEndGameModalIsOpen ] = useState(false)

    useEffect(() => {
        fetchDecks()
    },[numberOfDecks])

    const fetchDecks = () => {
        fetch('https://deckofcardsapi.com/api/deck/new/shuffle?deck_count=' + numberOfDecks)
        .then(res => res.json())
        .then(results => {
            fetch('https://deckofcardsapi.com/api/deck/' + results.deck_id + '/draw/?count=' + (52 * numberOfDecks))
            .then(res => res.json())
            .then(results => {
                if(currentCardIndex > 0){
                    setDeckOfCards([...deckOfCards, ...results.cards])
                } else {
                    setDeckOfCards(results.cards)
                }
            })
        })
    }
    
    useEffect(() => {       
        if(isDealing){
            if(currentCardIndex % 2 === 0){
                setTimeout(() => {
            //         setCard1Styling("above")
            //         setCard2Styling("below")
                    if(document.getElementById("card2")){
                        document.getElementById("card1").style.zIndex = 1
                        document.getElementById("card2").style.zIndex = 0
                    }
                }, 200)
            }else {
                setTimeout(() => {
            //         setCard2Styling("above")
            //         setCard1Styling("below")
                    document.getElementById("card2").style.zIndex = 1
                    document.getElementById("card1").style.zIndex = 0
                }, 200)
            }
           setTimeout(() =>{
                console.log("current card index", currentCardIndex)
                // if(currentCardIndex < (51 * numberOfDecks)){                               // HOW IT WAS
                if(currentCardIndex < deckOfCards.length - 1){          // MY FIX
                    setCurrentCardIndex(currentCardIndex + 1)
                } else {
                    setEndGameModalIsOpen(true)
                }
            }, 1500)
            // }, 100)
        }
    }, [displayedCard1, displayedCard2])

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
    // },[displayedCard1, displayedCard2, isDealing])
    },[displayedCard1, displayedCard2])


    useEffect(() => {
        if(isDealing){
            if(currentCardIndex % 2 === 0){
                setDisplayedCard1(deckOfCards[currentCardIndex])
                // setTimeout(() => {
                //     setCard1Styling("above")
                //     setCard2Styling("below")
                // }, 200)
                
                setTimeout(() => {
                    document.getElementById("card1").style.zIndex = 1
                    document.getElementById("card2").style.zIndex = 0
                }, 200)
                

                console.log("current card index CARD1", currentCardIndex)
            }else {
                setDisplayedCard2(deckOfCards[currentCardIndex])
                // setTimeout(() => {
                //     setCard2Styling("above")
                //     setCard1Styling("below")
                // }, 200)
                setTimeout(() => {
                    document.getElementById("card2").style.zIndex = 1
                    document.getElementById("card1").style.zIndex = 0
                }, 200)
                console.log("current card index CARD2", currentCardIndex)
            }
        }
    }, [currentCardIndex])

    const handleComputerSnap = (cardIndex) => {
        const pointsWon = (cardIndex + 1) - (computerScore + playerScore)
        if(deckOfCards[cardIndex].value === deckOfCards[cardIndex - 1].value){
            setIsDealing(false)
            setComputerScore(computerScore + pointsWon)
            computerHasSnapped = true
        }
        // console.log("cardIndex:", cardIndex)
    }


    const handleStartGame = () => {
        document.getElementById("snap-continue-button").style.visibility="visible"
        document.getElementById("number-of-decks-dropdown").disabled=true
        setDisplayedCard1(deckOfCards[0])
        setIsDealing(true)
    }


    const handlePlayerSnap = (card) => {
        playerHasSnapped = true
        setIsDealing(false)
        const pointsWon = (card + 1) - (computerScore + playerScore)
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
            if(currentCardIndex % 2 === 0){
                setDisplayedCard1(deckOfCards[currentCardIndex])
                setTimeout(() => {
                    document.getElementById("card1").style.zIndex = 1
                    document.getElementById("card2").style.zIndex = 0
                }, 200)
            } else {
               setDisplayedCard2(deckOfCards[currentCardIndex]) 
               setTimeout(() => {
                    document.getElementById("card2").style.zIndex = 1
                    document.getElementById("card1").style.zIndex = 0
            }, 200)
            }
        }, 1000)
        
    }

    const handleContinueGame = () => {
        setCurrentCardIndex(currentCardIndex + 1)
        fetchDecks()
        setEndGameModalIsOpen(false)
        setIsDealing(false)
    }

    const handleResetGame = () => {
        document.getElementById("number-of-decks-dropdown").disabled=false
        setDeckOfCards([])
        setCurrentCardIndex(0)
        setComputerScore(0)
        setPlayerScore(0)
        setNumberOfDecks(1)
        setIsDealing(false)
        fetchDecks()
        setEndGameModalIsOpen(false)
        setDisplayedCard1({image:backOfCard})
        setDisplayedCard2({image:backOfCard})
    }

    return(
        <div className="snap-game-container">
            <h1>Snap</h1>
            
            <button className="snap-buttons snap-home-button" onClick={() => setCurrentGame("")}>Home</button>
            <br />
            <select value={imageSize} onChange={(event) => {
				setImageSize(event.target.value)}}>
				<option selected="selected" value={"medium-snap"}>Card size</option>
				<option value={"small-snap"}>small</option>
				<option value={"medium-snap"}>medium</option>
				<option value={"large-snap"}>large</option>
			</select>

            <select id="number-of-decks-dropdown" value={numberOfDecks} onChange={(event) => {setNumberOfDecks(event.target.value)}}>
                <option value={1}>No. of decks</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
            </select>

            <br/>
            <button id="snap-start-button" disabled={currentCardIndex > 0}className="snap-start-button snap-buttons" onClick={() => handleStartGame()}>Start Game</button>
            {/* {deckOfCards.length > 0 && <img src={ deckOfCards[currentCard].image} alt={currentCard.code}/>} */}
            <div className="cards-container">
                {displayedCard1 && <img  id="card1" className={card1Styling + " " + imageSize + " card1"} src={ displayedCard1.image} alt={displayedCard1.code}/>}
                {displayedCard2 && <img id="card2" className={card2Styling + " " + imageSize + " card2"} src={ displayedCard2.image} alt={displayedCard2.code}/>}
            </div>
             <button className="snap-snap-button snap-buttons" disabled={!isDealing} onClick={() => handlePlayerSnap(currentCardIndex)}>Snap</button>
            <button className="snap-continue-button snap-buttons" id="snap-continue-button" disabled={isDealing} onClick={() => handleContinue()}>Continue</button>

            
            <p>Player Score: {playerScore}</p>
            <p>Computer Score: {computerScore}</p>

          <SnapEndGameModal  endGameModalIsOpen={endGameModalIsOpen}  setEndGameModalIsOpen={setEndGameModalIsOpen} handleContinueGame={handleContinueGame} handleResetGame={handleResetGame} playerScore={playerScore} computerScore={computerScore} />  

        </div>
    )
}
export default GameSnap;