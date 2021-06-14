import React, { useState, useEffect } from 'react';
import './GameTwentyOne.css';
import backOfCard from '../assets/back_of_card.png';

const GameTwentyOne = () => {
	let thing = [
		{
			code: '2S',
			image: 'https://deckofcardsapi.com/static/img/2S.png',
			images: {
				svg: 'https://deckofcardsapi.com/static/img/2S.svg',
				png: 'https://deckofcardsapi.com/static/img/2S.png'
			},
			value: '2',
			suit: 'SPADES'
		},
		{
			code: '2C',
			image: 'https://deckofcardsapi.com/static/img/2C.png',
			images: {
				svg: 'https://deckofcardsapi.com/static/img/2C.svg',
				png: 'https://deckofcardsapi.com/static/img/2C.png'
			},
			value: '2',
			suit: 'CLUBS'
		}
	];

	const [ deckId, setDeckId ] = useState('');
	const [ deckOfCards, setDeckOfCards ] = useState([]);
	// const [ playerOneHand, setPlayerOneHand ] = useState([]);
	const [ playerOneHand, setPlayerOneHand ] = useState(thing);
	const [ playerTwoHand, setPlayerTwoHand ] = useState([]);
	const [ computerHand, setComputerHand ] = useState([]);
	// const [ computerHand, setComputerHand ] = useState(thing);
	const [ playerNumberTurn, setPlayerNumberTurn ] = useState(1);
	const [ numberOfPlayers, setNumberOfPlayers ] = useState(2);
	const [ computerScore, setComputerScore ] = useState(0);
	const [ playerOneSplitHand, setPlayerOneSplitHand ] = useState([]);

	useEffect(() => {
		fetch('https://deckofcardsapi.com/api/deck/new/shuffle?deck_count=8')
			.then((res) => res.json())
			.then((results) => {
				setDeckId(results.deck_id);
				console.log('deck info', results);
			})
			.then(() => console.log('deck_id:', deckId));
	}, []);

	useEffect(
		() => {
			if (computerScore <= 16 && playerNumberTurn === 0) {
				handleTwist(0);
				// handleTwist(0).then((res) => {
				// 	console.log(res);
				// 	computerHand.push(res.cards[0]);
				// 	setComputerScore(calculateScore(computerHand));
				// });
			}
		},
		[ computerScore ]
	);

	useEffect(
		() => {
			setTimeout(() => {
				if (calculateScore(playerOneHand) > 21 && playerNumberTurn === 1) {
					alert('You are bust better luck next time!');
					handleStick();
				} else if (calculateScore(playerTwoHand) > 21 && playerNumberTurn === 2) {
					alert('You are bust better luck next time!');
					handleStick();
				} else if (calculateScore(playerOneSplitHand) > 21 && playerNumberTurn === 1.5) {
					alert('You are bust better luck next time!');
					handleStick();
				}
			}, 500);
		},
		[ playerOneHand, playerTwoHand, playerOneSplitHand ]
	);

	useEffect(
		() => {
			if (playerOneSplitHand.length === 1) {
				// handleTwist(1);
				// console.log('after twist 1');
				handleTwist(1.5);
				console.log('after twist 1.5');
			} else if (playerOneSplitHand.length === 2) {
				handleTwist(1);
			}
		},
		[ playerOneSplitHand ]
	);

	const handleDrawCards = () => {
		setPlayerNumberTurn(1);
		fetch('https://deckofcardsapi.com/api/deck/' + deckId + '/draw/?count=416')
			.then((res) => res.json())
			.then((results) => {
				let deck = results.cards;
				setComputerHand(deck.slice(0, 2));
				// setPlayerOneHand(deck.slice(2, 4));
				if (numberOfPlayers === 1) {
					setDeckOfCards(deck.slice(4));
				}
				if (numberOfPlayers > 1) {
					setPlayerTwoHand(deck.slice(4, 6));
					setDeckOfCards(deck.slice(6));
				}

				// setPlayerTwoHand(results.cards.slice(2, 4));
				// setComputerHand(results.cards.slice(4));
			});
	};

	const handleSplit = (playerNumber) => {
		if (playerNumber === 1) {
			setPlayerOneSplitHand([ playerOneHand[1] ]);
			setPlayerOneHand([ playerOneHand[0] ]);
			// handleTwist(1);
			// handleTwist(1.5);
		}
	};

	const displayCards = (hand, playerNumber) => {
		const cardImages = hand.map((card) => <img src={card.image} alt={card.code} />);

		if (hand.length === 2 && hand[0].value === hand[1].value && playerNumberTurn !== 0) {
			cardImages.push(<button onClick={() => handleSplit(playerNumberTurn)}>Split</button>);
		}
		if (playerNumber === 1 && playerOneSplitHand.length > 0) {
			cardImages.push(<p>first split hand score:{calculateScore(playerOneHand, false)}</p>);
			playerOneSplitHand.forEach((card) => {
				cardImages.push(<img src={card.image} alt={card.code} />);
			});
			cardImages.push(<p>second split hand score:{calculateScore(playerOneSplitHand, false)}</p>);
		}
		return cardImages;
	};

	const displayComputerCards = () => {
		let cardImages = [];
		if (playerNumberTurn === 0) {
			cardImages = computerHand.map((card) => <img src={card.image} alt={card.code} />);
		} else {
			cardImages.push(<img src={computerHand[0].image} alt={computerHand[0].code} />);
			cardImages.push(<img src={backOfCard} alt="Back of card" />);
		}
		return cardImages;
	};

	// const handleTwist = (player) => {
	// 	return (
	// 		fetch('https://deckofcardsapi.com/api/deck/' + deckId + '/draw/?count=1')
	// 			.then((res) => {
	// 				console.log('res', res);
	// 				// console.log('res json', res.json());
	// 				if (res.ok !== true) {
	// 					// handleTwist(player);
	// 					// return;
	// 					console.log('BROKEN!!!!');
	// 					return res.json();
	// 				} else {
	// 					return res.json();
	// 				}
	// 			})
	// 			// .then((results) => {
	// 			// 	console.log('fetch results', results);
	// 			// 	if (results.success !== true) {
	// 			// 		handleTwist(player);
	// 			// 	} else {
	// 			// 		return results;
	// 			// 	}
	// 			// })
	// 			.then((results) => {
	// 				if (player === 1) {
	// 					setPlayerOneHand((playerOneHand) => [ ...playerOneHand, results.cards[0] ]);
	// 				} else if (player === 2) {
	// 					setPlayerTwoHand((playerTwoHand) => [ ...playerTwoHand, results.cards[0] ]);
	// 				} else if (player === 0) {
	// 					setComputerHand((computerHand) => [ ...computerHand, results.cards[0] ]);
	// 					// setComputerScore(computerScore + results.cards[0].value);
	// 				} else if (player === 1.5) {
	// 					setPlayerOneSplitHand((playerOneSplitHand) => [ ...playerOneSplitHand, results.cards[0] ]);
	// 				}
	// 				console.log('in handleTwist, player= ', player);
	// 				return results;
	// 			})
	// 	);
	// };

	const handleTwist = (player) => {
		if (player === 1) {
			setPlayerOneHand((playerOneHand) => [ ...playerOneHand, deckOfCards[0] ]);
		} else if (player === 2) {
			setPlayerTwoHand((playerTwoHand) => [ ...playerTwoHand, deckOfCards[0] ]);
		} else if (player === 0) {
			setComputerHand((computerHand) => [ ...computerHand, deckOfCards[0] ]);

			setComputerScore(computerScore + deckOfCards[0].value);
		} else if (player === 1.5) {
			setPlayerOneSplitHand((playerOneSplitHand) => [ ...playerOneSplitHand, deckOfCards[0] ]);
		}
		console.log('in handleTwist, player= ', player);
		setDeckOfCards(deckOfCards.slice(1));
	};

	const handleStick = () => {
		if (playerNumberTurn === 1 && playerOneSplitHand.length > 0) {
			setPlayerNumberTurn(1.5);
		} else if (playerNumberTurn === 1.5) {
			setPlayerNumberTurn(2);
		} else if (playerNumberTurn === numberOfPlayers) {
			setPlayerNumberTurn(0);
			setComputerScore(calculateScore(computerHand));
			// handleComputerTurn();
		} else {
			setPlayerNumberTurn(playerNumberTurn + 1);
		}
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
				// if (score + 11 > 21) score += 1;
				// else score += 11;
			} else score += parseInt(card.value);
		});
		for (let i = 0; i < numberOfAces; i++) {
			if (score > 21) score -= 10;
		}
		// if (score > 21) {
		// 	handleStick();
		// 	alert('You are bust!!! Better luck next time.');
		// }
		return score;
	};

	// const handleComputerTurn = () => {
	// 	let score = calculateScore(computerHand);

	// 	handleTwist(0).then((res) => console.log(res));
	// 	// while (score <= 16) {
	// 	// 	handleTwist(0);
	// 	// 	score = calculateScore(computerHand);
	// 	// }
	// };

	return (
		<div>
			<h1>Game Twenty-One</h1>
			<button onClick={() => handleDrawCards()}>Deal</button>
			{playerOneHand.length > 0 ? <button onClick={() => handleTwist(playerNumberTurn)}>Twist</button> : null}
			{playerOneHand.length > 0 ? <button onClick={() => handleStick()}>Stick</button> : null}
			{displayCards(playerOneHand, 1)}
			{calculateScore(playerOneHand, false)}
			{displayCards(playerTwoHand, 2)}
			{calculateScore(playerTwoHand, false)}
			{computerHand.length > 0 && displayComputerCards()}
			{computerHand.length > 0 && calculateScore(computerHand, true)}
		</div>
	);
};

export default GameTwentyOne;
