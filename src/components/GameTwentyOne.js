import React, { useState, useEffect } from 'react';
import './GameTwentyOne.css';

const GameTwentyOne = () => {
	// let thing = [
	// 	{
	// 		code: '2S',
	// 		image: 'https://deckofcardsapi.com/static/img/2S.png',
	// 		images: {
	// 			svg: 'https://deckofcardsapi.com/static/img/2S.svg',
	// 			png: 'https://deckofcardsapi.com/static/img/2S.png'
	// 		},
	// 		value: '2',
	// 		suit: 'SPADES'
	// 	},
	// 	{
	// 		code: '2C',
	// 		image: 'https://deckofcardsapi.com/static/img/2C.png',
	// 		images: {
	// 			svg: 'https://deckofcardsapi.com/static/img/2C.svg',
	// 			png: 'https://deckofcardsapi.com/static/img/2C.png'
	// 		},
	// 		value: '2',
	// 		suit: 'CLUBS'
	// 	}
	// ];

	const [ deckId, setDeckId ] = useState('');
	const [ playerOneHand, setPlayerOneHand ] = useState([]);
	const [ playerTwoHand, setPlayerTwoHand ] = useState([]);
	const [ computerHand, setComputerHand ] = useState([]);
	// const [ computerHand, setComputerHand ] = useState(thing);
	const [ playerNumberTurn, setPlayerNumberTurn ] = useState(1);
	const [ numberOfPlayers, setNumberOfPlayers ] = useState(2);
	const [ computerScore, setComputerScore ] = useState(0);

	useEffect(() => {
		fetch('https://deckofcardsapi.com/api/deck/new/shuffle')
			.then((res) => res.json())
			.then((results) => setDeckId(results.deck_id))
			.then(() => console.log('deck_id:', deckId));
	}, []);

	useEffect(
		() => {
			if (computerScore <= 16 && playerNumberTurn === 0) {
				handleTwist(0).then((res) => {
					console.log(res);
					computerHand.push(res.cards[0]);
					setComputerScore(calculateScore(computerHand));
				});
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
				}
			}, 500);
		},
		[ playerOneHand, playerTwoHand ]
	);

	const handleDrawCards = () => {
		setPlayerNumberTurn(1);
		fetch('https://deckofcardsapi.com/api/deck/' + deckId + '/draw/?count=' + (numberOfPlayers * 2 + 2))
			.then((res) => res.json())
			.then((results) => {
				setPlayerOneHand(results.cards.slice(0, 2));
				setPlayerTwoHand(results.cards.slice(2, 4));
				setComputerHand(results.cards.slice(4));
			});
	};

	const displayCards = (hand) => {
		const cardImages = hand.map((card) => <img src={card.image} alt={card.code} />);
		return cardImages;
	};

	const handleTwist = (player) => {
		return fetch('https://deckofcardsapi.com/api/deck/' + deckId + '/draw/?count=1')
			.then((res) => res.json())
			.then((results) => {
				if (player === 1) {
					setPlayerOneHand((playerOneHand) => [ ...playerOneHand, results.cards[0] ]);
				} else if (player === 2) {
					setPlayerTwoHand((playerTwoHand) => [ ...playerTwoHand, results.cards[0] ]);
				} else if (player === 0) {
					setComputerHand((computerHand) => [ ...computerHand, results.cards[0] ]);
					// setComputerScore(computerScore + results.cards[0].value);
				}
				return results;
			});
	};
	const handleStick = () => {
		if (playerNumberTurn === numberOfPlayers) {
			setPlayerNumberTurn(0);
			setComputerScore(calculateScore(computerHand));
			// handleComputerTurn();
		} else {
			setPlayerNumberTurn(playerNumberTurn + 1);
		}
	};

	const calculateScore = (hand) => {
		let score = 0;
		let numberOfAces = 0;
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
			{displayCards(playerOneHand)}
			{calculateScore(playerOneHand)}
			{displayCards(playerTwoHand)}
			{calculateScore(playerTwoHand)}
			{displayCards(computerHand)}
			{calculateScore(computerHand)}
		</div>
	);
};

export default GameTwentyOne;
