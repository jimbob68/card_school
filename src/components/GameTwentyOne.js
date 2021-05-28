import React, { useState, useEffect } from 'react';
import './GameTwentyOne.css';

const GameTwentyOne = () => {
	const [ deckId, setDeckId ] = useState('');
	const [ playerOneHand, setPlayerOneHand ] = useState([]);
	const [ computerHand, setComputerHand ] = useState([]);

	useEffect(() => {
		fetch('https://deckofcardsapi.com/api/deck/new/shuffle')
			.then((res) => res.json())
			.then((results) => setDeckId(results.deck_id))
			.then(() => console.log('deck_id:', deckId));
	}, []);

	const handleDrawCards = () => {
		fetch('https://deckofcardsapi.com/api/deck/' + deckId + '/draw/?count=4')
			.then((res) => res.json())
			.then((results) => {
				setPlayerOneHand(results.cards.slice(0, 2));
				setComputerHand(results.cards.slice(2));
			});
	};

	const displayCards = (hand) => {
		const cardImages = hand.map((card) => <img src={card.image} alt={card.code} />);
		return cardImages;
	};

	const handleTwist = () => {
		fetch('https://deckofcardsapi.com/api/deck/' + deckId + '/draw/?count=1')
			.then((res) => res.json())
			.then((results) => {
				setPlayerOneHand((playerOneHand) => [ ...playerOneHand, results.cards[0] ]);
			});
	};

	return (
		<div>
			<h1>Game Twenty-One</h1>
			<button onClick={() => handleDrawCards()}>Deal</button>
			{displayCards(playerOneHand)}
			{displayCards(computerHand)}
			<button onClick={() => handleTwist()}>Twist</button>
		</div>
	);
};

export default GameTwentyOne;
