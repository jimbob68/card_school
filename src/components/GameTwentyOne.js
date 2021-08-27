import React, { useState, useEffect } from 'react';
import './GameTwentyOne.css';
import Player from './Player.js';
import ResultsModal from './ResultsModal.js';
import backOfCard from '../assets/back_of_card.png';

const GameTwentyOne = ({  setCurrentGame  }) => {
	let thing = [
		{
			code: '0S',
			image: 'https://deckofcardsapi.com/static/img/0S.png',
			images: {
				svg: 'https://deckofcardsapi.com/static/img/0S.svg',
				png: 'https://deckofcardsapi.com/static/img/0S.png'
			},
			value: '10',
			suit: 'SPADES'
		},
		{
			code: '0C',
			image: 'https://deckofcardsapi.com/static/img/0C.png',
			images: {
				svg: 'https://deckofcardsapi.com/static/img/0C.svg',
				png: 'https://deckofcardsapi.com/static/img/0C.png'
			},
			value: '10',
			suit: 'CLUBS'
		}
	];

	let otherThing = [
		{
			code: '0S',
			image: 'https://deckofcardsapi.com/static/img/0S.png',
			images: {
				svg: 'https://deckofcardsapi.com/static/img/0S.svg',
				png: 'https://deckofcardsapi.com/static/img/0S.png'
			},
			value: '10',
			suit: 'SPADES'
		},
		{
			code: '0C',
			image: 'https://deckofcardsapi.com/static/img/0C.png',
			images: {
				svg: 'https://deckofcardsapi.com/static/img/0C.svg',
				png: 'https://deckofcardsapi.com/static/img/0C.png'
			},
			value: '10',
			suit: 'CLUBS'
		}
	];

	const [ deckId, setDeckId ] = useState('');
	const [ deckOfCards, setDeckOfCards ] = useState([]);
	const [ playerOneHand, setPlayerOneHand ] = useState([]);
	const [ playerTwoHand, setPlayerTwoHand ] = useState([]);
	const [ playerThreeHand, setPlayerThreeHand ] = useState([]);
	const [ playerFourHand, setPlayerFourHand ] = useState([]);
	// const [ playerOneHand, setPlayerOneHand ] = useState(thing);
	// const [ playerTwoHand, setPlayerTwoHand ] = useState(thing);
	// const [ playerThreeHand, setPlayerThreeHand ] = useState(thing);
	// const [ playerFourHand, setPlayerFourHand ] = useState(thing);
	const [ computerHand, setComputerHand ] = useState([]);
	// const [ computerHand, setComputerHand ] = useState(otherThing);
	const [ playerNumberTurn, setPlayerNumberTurn ] = useState(1);
	const [ numberOfPlayers, setNumberOfPlayers ] = useState(0);
	const [ computerScore, setComputerScore ] = useState(0);
	const [ playerOneSplitHand, setPlayerOneSplitHand ] = useState([]);
	const [ playerTwoSplitHand, setPlayerTwoSplitHand ] = useState([]);
	const [ playerThreeSplitHand, setPlayerThreeSplitHand ] = useState([]);
	const [ playerFourSplitHand, setPlayerFourSplitHand ] = useState([]);
	const [ playerOneWallet, setPlayerOneWallet ] = useState(100);
	const [ playerTwoWallet, setPlayerTwoWallet ] = useState(100);
	const [ playerThreeWallet, setPlayerThreeWallet ] = useState(100);
	const [ playerFourWallet, setPlayerFourWallet ] = useState(100);
	const [ playerOneBet, setPlayerOneBet ] = useState(0);
	const [ playerTwoBet, setPlayerTwoBet ] = useState(0);
	const [ playerThreeBet, setPlayerThreeBet ] = useState(0);
	const [ playerFourBet, setPlayerFourBet ] = useState(0);
	const [ areButtonsDisabled, setAreButtonsDisabled ] = useState(true);
	const [ playersSelected, setPlayersSelected ] = useState(false);
	const [ newGameButtonDisplayed, setNewGameButtonDisplayed ] = useState(false)
	const [ modalIsOpen, setModalIsOpen ] = useState(false)
	const [ resultsState, setResultsState ] = useState([])


	useEffect(() => {
		if(deckOfCards.length < 52) {
		fetch('https://deckofcardsapi.com/api/deck/new/shuffle?deck_count=8')
			.then((res) => res.json())
			.then((results) => {
				setDeckId(results.deck_id);
				console.log('deck info', results);
				return results.deck_id;
			})
			.then((deck_id) => {
				fetch('https://deckofcardsapi.com/api/deck/' + deck_id + '/draw/?count=416')
					.then((res) => res.json())
					.then((results) => setDeckOfCards(results.cards));
			});
		}
	}, [deckOfCards]);

	useEffect(
		() => {
			if (computerScore <= 16 && playerNumberTurn === 0) {
				let cards = [ ...computerHand ];
				const cardDrawn = handleTwist(0);
				cards.push(cardDrawn);
				setComputerScore(calculateScore(cards));
			} else if (playerNumberTurn === 0) {
				setTimeout(() => {
					setModalIsOpen(true)
					handleEndRound()
				}, 1000);
			}
		},
		[ computerHand, computerScore ]
	);

	useEffect(
		() => {
			setTimeout(() => {
				if (calculateScore(playerOneHand) > 21 && playerNumberTurn === 1) {
					setResultsState('You are bust better luck next time!')
					setModalIsOpen(true)
				} else if (calculateScore(playerTwoHand) > 21 && playerNumberTurn === 2) {
					setResultsState('You are bust better luck next time!')
					setModalIsOpen(true)
				} else if (calculateScore(playerThreeHand) > 21 && playerNumberTurn === 3) {
					setResultsState('You are bust better luck next time!')
					setModalIsOpen(true)
				} else if (calculateScore(playerFourHand) > 21 && playerNumberTurn === 4) {
					setResultsState('You are bust better luck next time!')
					setModalIsOpen(true)
				} else if (calculateScore(playerOneSplitHand) > 21 && playerNumberTurn === 1.5) {
					setResultsState('You are bust better luck next time!')
					setModalIsOpen(true)
				} else if (calculateScore(playerTwoSplitHand) > 21 && playerNumberTurn === 2.5) {
					setResultsState('You are bust better luck next time!')
					setModalIsOpen(true)
				} else if (calculateScore(playerThreeSplitHand) > 21 && playerNumberTurn === 3.5) {
					setResultsState('You are bust better luck next time!')
					setModalIsOpen(true)
				} else if (calculateScore(playerFourSplitHand) > 21 && playerNumberTurn === 4.5) {
					setResultsState('You are bust better luck next time!')
					setModalIsOpen(true)
				}
			}, 500);
		},
		[
			playerOneHand,
			playerTwoHand,
			playerThreeHand,
			playerFourHand,
			playerOneSplitHand,
			playerTwoSplitHand,
			playerThreeSplitHand,
			playerFourSplitHand
		]
	);

	useEffect(
		() => {
			if (playerOneSplitHand.length === 1) {
				handleTwist(1.5);
			} else if (playerOneSplitHand.length === 2) {
				handleTwist(1);
			}
		},
		[ playerOneSplitHand ]
	);

	useEffect(
		() => {
			if (playerTwoSplitHand.length === 1) {
				handleTwist(2.5);
			} else if (playerTwoSplitHand.length === 2) {
				handleTwist(2);
			}
		},
		[ playerTwoSplitHand ]
	);

	useEffect(
		() => {
			if (playerThreeSplitHand.length === 1) {
				handleTwist(3.5);
			} else if (playerThreeSplitHand.length === 2) {
				handleTwist(3);
			}
		},
		[ playerThreeSplitHand ]
	);

	useEffect(
		() => {
			if (playerFourSplitHand.length === 1) {
				handleTwist(4.5);
			} else if (playerFourSplitHand.length === 2) {
				handleTwist(4);
			}
		},
		[ playerFourSplitHand ]
	);

	const handleDrawCards = () => {
		setPlayerNumberTurn(1);
		setPlayerOneSplitHand([]);
		setPlayerTwoSplitHand([]);
		setPlayerThreeSplitHand([]);
		setPlayerFourSplitHand([]);
		let deck = deckOfCards;
		setComputerHand(deck.slice(0, 2));
		setPlayerOneHand(deck.slice(2, 4));
		setPlayerOneBet(5);
		setPlayerOneWallet(playerOneWallet - 5);

		if (numberOfPlayers >= 2) {
			setPlayerTwoBet(5);
			setPlayerTwoWallet(playerTwoWallet - 5);
			setPlayerTwoHand(deck.slice(4, 6));
		}
		if (numberOfPlayers >= 3) {
			setPlayerThreeBet(5);
			setPlayerThreeWallet(playerThreeWallet - 5);
			setPlayerThreeHand(deck.slice(6, 8));
		}
		if (numberOfPlayers >= 4) {
			setPlayerFourBet(5);
			setPlayerFourWallet(playerFourWallet - 5);
			setPlayerFourHand(deck.slice(8, 10));
		}
		setDeckOfCards(deck.slice(numberOfPlayers * 2 + 2));
	};

	const handleSplit = (playerNumber) => {
		if (playerNumber === 1) {
			setPlayerOneSplitHand([ playerOneHand[1] ]);
			setPlayerOneHand([ playerOneHand[0] ]);
			setPlayerOneBet(playerOneBet * 2);
			setPlayerOneWallet(playerOneWallet - playerOneBet);
		} else if (playerNumber === 2) {
			setPlayerTwoSplitHand([ playerTwoHand[1] ]);
			setPlayerTwoHand([ playerTwoHand[0] ]);
			setPlayerTwoBet(playerTwoBet * 2);
			setPlayerTwoWallet(playerTwoWallet - playerTwoBet);
		} else if (playerNumber === 3) {
			setPlayerThreeSplitHand([ playerThreeHand[1] ]);
			setPlayerThreeHand([ playerThreeHand[0] ]);
			setPlayerThreeBet(playerThreeBet * 2);
			setPlayerThreeWallet(playerThreeWallet - playerThreeBet);
		} else if (playerNumber === 4) {
			setPlayerFourSplitHand([ playerFourHand[1] ]);
			setPlayerFourHand([ playerFourHand[0] ]);
			setPlayerFourBet(playerFourBet * 2);
			setPlayerFourWallet(playerFourWallet - playerFourBet);
		}
	};

	const displayComputerCards = () => {
		let cardImages = [];
		if (playerNumberTurn === 0) {
			cardImages = computerHand.map((card) => <img src={card.image} alt={card.code} />);
		} else {
			cardImages.push(<img src={computerHand[0].image} alt={computerHand[0].code} />);
			cardImages.push(<img src={backOfCard} alt="Back of card" />);
		}
		return <div className="player-hand">{cardImages}</div>;
	};

	const handleTwist = (player) => {
		const cardDrawn = deckOfCards[0];
		if (player === 1) {
			setPlayerOneHand((playerOneHand) => [ ...playerOneHand, deckOfCards[0] ]);
		} else if (player === 2) {
			setPlayerTwoHand((playerTwoHand) => [ ...playerTwoHand, deckOfCards[0] ]);
		} else if (player === 3) {
			setPlayerThreeHand((playerThreeHand) => [ ...playerThreeHand, deckOfCards[0] ]);
		} else if (player === 4) {
			setPlayerFourHand((playerFourHand) => [ ...playerFourHand, deckOfCards[0] ]);
		} else if (player === 0) {
			setComputerHand((computerHand) => [ ...computerHand, deckOfCards[0] ]);
		} else if (player === 1.5) {
			setPlayerOneSplitHand((playerOneSplitHand) => [ ...playerOneSplitHand, deckOfCards[0] ]);
		} else if (player === 2.5) {
			setPlayerTwoSplitHand((playerTwoSplitHand) => [ ...playerTwoSplitHand, deckOfCards[0] ]);
		} else if (player === 3.5) {
			setPlayerThreeSplitHand((playerThreeSplitHand) => [ ...playerThreeSplitHand, deckOfCards[0] ]);
		} else if (player === 4.5) {
			setPlayerFourSplitHand((playerFourSplitHand) => [ ...playerFourSplitHand, deckOfCards[0] ]);
		}
		console.log('in handleTwist, player= ', player);
		setDeckOfCards(deckOfCards.slice(1));
		return cardDrawn;
	};

	const handleStick = () => {
		let buttonsDisplayed = true;

		document.getElementById('bet-dropdown').selectedIndex = 0;
		if (playerNumberTurn === 1 && playerOneSplitHand.length > 0) {
			setPlayerNumberTurn(1.5);
			buttonsDisplayed = false;
		} else if (playerNumberTurn === 2 && playerTwoSplitHand.length > 0) {
			setPlayerNumberTurn(2.5);
			buttonsDisplayed = false;
		} else if (playerNumberTurn === 3 && playerThreeSplitHand.length > 0) {
			setPlayerNumberTurn(3.5);
			buttonsDisplayed = false;
		} else if (playerNumberTurn === 4 && playerFourSplitHand.length > 0) {
			setPlayerNumberTurn(4.5);
			buttonsDisplayed = false;
		} else if (playerNumberTurn === 1.5 && numberOfPlayers > 1) {
			setPlayerNumberTurn(2);
		} else if (playerNumberTurn === 2.5 && numberOfPlayers > 2) {
			setPlayerNumberTurn(3);
		} else if (playerNumberTurn === 3.5 && numberOfPlayers > 3) {
			setPlayerNumberTurn(4);
		} else if (playerNumberTurn >= numberOfPlayers) {
			setPlayerNumberTurn(0);
			setComputerScore(calculateScore(computerHand));
		} else {
			setPlayerNumberTurn(playerNumberTurn + 1);
		}
		setAreButtonsDisabled(buttonsDisplayed);
	};

	const calculateScore = (hand, computerTurn) => {
		let score = 0;
		let numberOfAces = 0;
		if (computerTurn && playerNumberTurn !== 0) {
			hand = [ hand[0] ];
		}
		hand.forEach((card) => {
			if (card.value === 'KING' || card.value === 'QUEEN' || card.value === 'JACK') score += 10;
			else if (card.value === 'ACE') {
				numberOfAces += 1;
				score += 11;
			} else score += parseInt(card.value);
		});
		for (let i = 0; i < numberOfAces; i++) {
			if (score > 21) score -= 10;
		}
		return score;
	};

	const handleEndRound = () => {

		let resultsVariable = []
		const playerOneScore = calculateScore(playerOneHand);
		const playerTwoScore = calculateScore(playerTwoHand);
		const playerThreeScore = calculateScore(playerThreeHand);
		const playerFourScore = calculateScore(playerFourHand);
		let computerWins = true;
		const playerOneSplitScore = calculateScore(playerOneSplitHand);
		const playerTwoSplitScore = calculateScore(playerTwoSplitHand);
		const playerThreeSplitScore = calculateScore(playerThreeSplitHand);
		const playerFourSplitScore = calculateScore(playerFourSplitHand);
		let playerOneBank = playerOneWallet;
		let playerTwoBank = playerTwoWallet;
		let playerThreeBank = playerThreeWallet;
		let playerFourBank = playerFourWallet;

		if ((playerOneScore > computerScore && playerOneScore <= 21) || (playerOneScore <= 21 && computerScore > 21)) {
			computerWins = false;
			let betAmount = playerOneBet;
			if (playerOneSplitHand.length > 0) {
				betAmount = playerOneBet / 2;
			}
			resultsVariable.push('Player One beats the Dealer and wins £' + betAmount * 2 + '!')
			// alert('Player One beats the Dealer and wins £' + betAmount * 2 + '!');
			playerOneBank += betAmount * 2;
		} else if (playerOneScore === computerScore && playerOneScore <= 21) {
			computerWins = false;
			let betAmount = playerOneBet;
			if (playerOneSplitHand.length > 0) {
				betAmount = playerOneBet / 2;
			}
			resultsVariable.push('Player One draws with the Dealer and gets £' + betAmount + '!')
			// alert('Player One draws with the Dealer and gets £' + betAmount + '!');
			playerOneBank += betAmount;
		}
		if (
			numberOfPlayers >= 2 &&
			((playerTwoScore > computerScore && playerTwoScore <= 21) || (playerTwoScore <= 21 && computerScore > 21))
		) {
			computerWins = false;
			let betAmount = playerTwoBet;
			if (playerTwoSplitHand.length > 0) {
				betAmount = playerTwoBet / 2;
			}
			resultsVariable.push('Player Two beats the Dealer and wins £' + betAmount * 2 + '!')
			// alert('Player Two beats the Dealer and wins £' + betAmount * 2 + '!');
			playerTwoBank += betAmount * 2;
		} else if (playerTwoScore === computerScore && playerTwoScore <= 21) {
			computerWins = false;
			let betAmount = playerTwoBet;
			if (playerTwoSplitHand.length > 0) {
				betAmount = playerTwoBet / 2;
			}
			resultsVariable.push('Player Two draws with the Dealer and gets £' + betAmount + '!')
			// alert('Player Two draws with the Dealer and gets £' + betAmount + '!');
			playerTwoBank += betAmount;
		}
		if (
			numberOfPlayers >= 3 &&
			((playerThreeScore > computerScore && playerThreeScore <= 21) ||
				(playerThreeScore <= 21 && computerScore > 21))
		) {
			computerWins = false;
			let betAmount = playerThreeBet;
			if (playerThreeSplitHand.length > 0) {
				betAmount = playerThreeBet / 2;
			}
			resultsVariable.push('Player Three beats the Dealer and wins £' + betAmount * 2 + '!')
			// alert('Player Three beats the Dealer and wins £' + betAmount * 2 + '!');
			playerThreeBank += betAmount * 2;
		} else if (playerThreeScore === computerScore && playerThreeScore <= 21) {
			computerWins = false;
			let betAmount = playerThreeBet;
			if (playerThreeSplitHand.length > 0) {
				betAmount = playerThreeBet / 2;
			}
			resultsVariable.push('Player Three draws with the Dealer and gets £' + betAmount + '!')
			// alert('Player Three draws with the Dealer and gets £' + betAmount + '!');
			playerThreeBank += betAmount;
		}
		if (
			numberOfPlayers >= 4 &&
			((playerFourScore > computerScore && playerFourScore <= 21) ||
				(playerFourScore <= 21 && computerScore > 21))
		) {
			computerWins = false;
			let betAmount = playerFourBet;
			if (playerFourSplitHand.length > 0) {
				betAmount = playerFourBet / 2;
			}
			resultsVariable.push('Player Four beats the Dealer and wins £' + betAmount * 2 + '!')
			// alert('Player Four beats the Dealer and wins £' + betAmount * 2 + '!');
			playerFourBank += betAmount * 2;
		} else if (playerFourScore === computerScore && playerFourScore <= 21) {
			computerWins = false;
			let betAmount = playerFourBet;
			if (playerFourSplitHand.length > 0) {
				betAmount = playerFourBet / 2;
			}
			resultsVariable.push('Player Four draws with the Dealer and gets £' + betAmount + '!')
			// alert('Player Four draws with the Dealer and gets £' + betAmount + '!');
			playerFourBank += betAmount;
		}

		if (
			(playerOneSplitScore > computerScore && playerOneSplitScore <= 21) ||
			(playerOneSplitScore <= 21 && computerScore > 21 && playerOneSplitScore > 0)
		) {
			computerWins = false;
			resultsVariable.push("Player One's second hand beats the Dealer and wins £" + playerOneBet + '!')
			// alert("Player One's second hand beats the Dealer and wins £" + playerOneBet + '!');
			playerOneBank += playerOneBet;
		} else if (playerOneSplitScore === computerScore && playerOneSplitScore <= 21) {
			computerWins = false;
			resultsVariable.push("Player One's second hand draws with the Dealer and gets £" + playerOneBet / 2 + '!')
			// alert("Player One's second hand draws with the Dealer and gets £" + playerOneBet / 2 + '!');
			playerOneBank += playerOneBet / 2;
		}
		if (
			numberOfPlayers >= 2 &&
			((playerTwoSplitScore > computerScore && playerTwoSplitScore <= 21) ||
				(playerTwoSplitScore <= 21 && computerScore > 21 && playerTwoSplitScore > 0))
		) {
			computerWins = false;
			resultsVariable.push("Player Two's second hand beats the Dealer and wins £" + playerTwoBet + '!')
			// alert("Player Two's second hand beats the Dealer and wins £" + playerTwoBet + '!');
			playerTwoBank += playerTwoBet;
		} else if (playerTwoSplitScore === computerScore && playerTwoSplitScore <= 21) {
			computerWins = false;
			resultsVariable.push("Player Two's second hand draws with the Dealer and gets £" + playerTwoBet / 2 + '!')
			// alert("Player Two's second hand draws with the Dealer and gets £" + playerTwoBet / 2 + '!');
			playerTwoBank += playerTwoBet / 2;
		}
		if (
			numberOfPlayers >= 3 &&
			((playerThreeSplitScore > computerScore && playerThreeSplitScore <= 21) ||
				(playerThreeSplitScore <= 21 && computerScore > 21 && playerThreeSplitScore > 0))
		) {
			computerWins = false;
			resultsVariable.push("Player Three's second hand beats the Dealer and wins £" + playerThreeBet + '!')
			// alert("Player Three's second hand beats the Dealer and wins £" + playerThreeBet + '!');
			playerThreeBank += playerThreeBet;
		} else if (playerThreeSplitScore === computerScore && playerThreeSplitScore <= 21) {
			computerWins = false;
			resultsVariable.push("Player Three's second hand draws with the Dealer and gets £" + playerThreeBet / 2 + '!')
			// alert("Player Three's second hand draws with the Dealer and gets £" + playerThreeBet / 2 + '!');
			playerThreeBank += playerThreeBet / 2;
		}
		if (
			numberOfPlayers >= 4 &&
			((playerFourSplitScore > computerScore && playerFourSplitScore <= 21) ||
				(playerFourSplitScore <= 21 && computerScore > 21 && playerFourSplitScore > 0))
		) {
			computerWins = false;
			resultsVariable.push("Player Four's second hand beats the Dealer and wins £" + playerFourBet + '!')
			// alert("Player Four's second hand beats the Dealer and wins £" + playerFourBet + '!');
			playerFourBank += playerFourBet;
		} else if (playerFourSplitScore === computerScore && playerFourSplitScore <= 21) {
			computerWins = false;
			resultsVariable.push("Player Four's second hand draws with the Dealer and gets £" + playerFourBet / 2 + '!')
			// alert("Player Four's second hand draws with the Dealer and gets £" + playerFourBet / 2 + '!');
			playerFourBank += playerFourBet / 2;
		}

		if (computerWins) {
			resultsVariable.push('Dealer wins!')
			// alert('Dealer wins!');
		}
		setPlayerOneBet(0);
		setPlayerTwoBet(0);
		setPlayerThreeBet(0);
		setPlayerFourBet(0);
		setPlayerOneWallet(playerOneBank);
		setPlayerTwoWallet(playerTwoBank);
		setPlayerThreeWallet(playerThreeBank);
		setPlayerFourWallet(playerFourBank);
		setResultsState(resultsVariable)
	};

	const handlePlaceBet = (amount) => {
		if (playerNumberTurn === 1) {
			setPlayerOneBet(playerOneBet + amount);
			setPlayerOneWallet(playerOneWallet - amount);
		}

		if (playerNumberTurn === 2) {
			setPlayerTwoBet(playerTwoBet + amount);
			setPlayerTwoWallet(playerTwoWallet - amount);
		}

		if (playerNumberTurn === 3) {
			setPlayerThreeBet(playerThreeBet + amount);
			setPlayerThreeWallet(playerThreeWallet - amount);
		}

		if (playerNumberTurn === 4) {
			setPlayerFourBet(playerFourBet + amount);
			setPlayerFourWallet(playerFourWallet - amount);
		}
		setAreButtonsDisabled(false);
	};

	const handleNewGame = () => {
		setPlayerOneHand([])
		setPlayerTwoHand([])
		setPlayerThreeHand([])
		setPlayerFourHand([])
		setPlayerOneWallet(100)
		setPlayerTwoWallet(100)
		setPlayerThreeWallet(100)
		setPlayerFourWallet(100)
		setPlayerOneBet(0)
		setPlayerTwoBet(0)
		setPlayerThreeBet(0)
		setPlayerFourBet(0)
		setComputerHand([])
		// setComputerScore(0)
		setDeckOfCards([])
		setAreButtonsDisabled(true)
		setPlayersSelected(false)
		setNumberOfPlayers(0)
		setPlayerNumberTurn(1)
		setNewGameButtonDisplayed(false)
		setPlayerOneSplitHand([])
		setPlayerTwoSplitHand([])
		setPlayerThreeSplitHand([])
		setPlayerFourSplitHand([])
	}

	return (
		<div className="blackjack-container">
			<h1>Twenty-One</h1>
			<button className="home-button" onClick={() => setCurrentGame("")}>Home</button>
			<br/>
			{ newGameButtonDisplayed && <button className="new-game-button" onClick={() => handleNewGame()}>New Game</button>}
			<select value={numberOfPlayers} onChange={(event) => {
				setPlayersSelected(true)
				setNumberOfPlayers(parseInt(event.target.value))}}>
				<option value={0}>No. of Players</option>
				<option value={1}>1</option>
				<option value={2}>2</option>
				<option value={3}>3</option>
				<option value={4}>4</option>
			</select>
			<button className="deal-button" disabled={!playersSelected} onClick={() => {
				setNewGameButtonDisplayed(true)
			handleDrawCards()}}>
				Deal
			</button>
			{ numberOfPlayers > 0 && <p>
				Player One: £{playerOneWallet} - Bet: £{playerOneBet}
			</p>}
			{numberOfPlayers > 1 && (
				<p>
					Player Two: £{playerTwoWallet} - Bet: £{playerTwoBet}
				</p>
			)}
			{numberOfPlayers > 2 && (
				<p>
					Player Three: £{playerThreeWallet} - Bet: £{playerThreeBet}
				</p>
			)}
			{numberOfPlayers > 3 && (
				<p>
					Player Four: £{playerFourWallet} - Bet: £{playerFourBet}
				</p>
			)}
			<div className="hands-container">
				{ numberOfPlayers > 0 && <Player
					hand={playerOneHand}
					calculateScore={calculateScore}
					playerNumber={1}
					computerTurn={false}
					handleSplit={handleSplit}
					playerNumberTurn={playerNumberTurn}
					splitHand={playerOneSplitHand}
					handleStick={handleStick}
					handleTwist={handleTwist}
					handlePlaceBet={handlePlaceBet}
					areButtonsDisabled={areButtonsDisabled}
					playerWallet={playerOneWallet}
					playerBet={playerOneBet}
				/>}

				{numberOfPlayers > 1 && (
					<Player
						hand={playerTwoHand}
						calculateScore={calculateScore}
						playerNumber={2}
						computerTurn={false}
						handleSplit={handleSplit}
						playerNumberTurn={playerNumberTurn}
						splitHand={playerTwoSplitHand}
						handleStick={handleStick}
						handleTwist={handleTwist}
						handlePlaceBet={handlePlaceBet}
						areButtonsDisabled={areButtonsDisabled}
						playerWallet={playerTwoWallet}
						playerBet={playerTwoBet}
					/>
				)}
				{numberOfPlayers > 2 && (
					<Player
						hand={playerThreeHand}
						calculateScore={calculateScore}
						playerNumber={3}
						computerTurn={false}
						handleSplit={handleSplit}
						playerNumberTurn={playerNumberTurn}
						splitHand={playerThreeSplitHand}
						handleStick={handleStick}
						handleTwist={handleTwist}
						handlePlaceBet={handlePlaceBet}
						areButtonsDisabled={areButtonsDisabled}
						playerWallet={playerThreeWallet}
						playerBet={playerThreeBet}
					/>
				)}
				{numberOfPlayers > 3 && (
					<Player
						hand={playerFourHand}
						calculateScore={calculateScore}
						playerNumber={4}
						computerTurn={false}
						handleSplit={handleSplit}
						playerNumberTurn={playerNumberTurn}
						splitHand={playerFourSplitHand}
						handleStick={handleStick}
						handleTwist={handleTwist}
						handlePlaceBet={handlePlaceBet}
						areButtonsDisabled={areButtonsDisabled}
						playerWallet={playerFourWallet}
						playerBet={playerFourBet}
					/>
				)}
				{ numberOfPlayers > 0 && <div>
					<p>Dealer</p>
					{computerHand.length > 0 && displayComputerCards()}
					{computerHand.length > 0 && calculateScore(computerHand, true)}
				</div>}


			</div>

			{<ResultsModal 
				 modalIsOpen={modalIsOpen}
				 resultsState={resultsState}
				 setModalIsOpen={setModalIsOpen}
				 handleStick={handleStick}
			/>}
		</div>
	);
};

export default GameTwentyOne;
