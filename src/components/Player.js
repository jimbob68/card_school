import React from 'react';
import './Player.css';

const Player = ({
	hand,
	calculateScore,
	playerNumber,
	computerTurn,
	handleSplit,
	playerNumberTurn,
	splitHand,
	handleTwist,
	handleStick,
	handlePlaceBet
}) => {
	const displayCards = (hand, playerNumber) => {
		const cardImages = hand.map((card) => <img src={card.image} alt={card.code} />);

		if (hand.length === 2 && hand[0].value === hand[1].value && playerNumberTurn !== 0) {
			cardImages.push(<button onClick={() => handleSplit(playerNumberTurn)}>Split</button>);
		}
		if (splitHand.length > 0) {
			cardImages.push(<p>first split hand score:{calculateScore(hand, false)}</p>);
			splitHand.forEach((card) => {
				cardImages.push(<img src={card.image} alt={card.code} />);
			});
			cardImages.push(<p>second split hand score:{calculateScore(splitHand, false)}</p>);
		}
		// else if (playerNumber === 2 && playerTwoSplitHand.length > 0) {
		// 	cardImages.push(<p>first split hand score:{calculateScore(playerTwoHand, false)}</p>);
		// 	playerTwoSplitHand.forEach((card) => {
		// 		cardImages.push(<img src={card.image} alt={card.code} />);
		// 	});
		// 	cardImages.push(<p>second split hand score:{calculateScore(playerTwoSplitHand, false)}</p>);
		// } else if (playerNumber === 3 && playerThreeSplitHand.length > 0) {
		// 	cardImages.push(<p>first split hand score:{calculateScore(playerThreeHand, false)}</p>);
		// 	playerThreeSplitHand.forEach((card) => {
		// 		cardImages.push(<img src={card.image} alt={card.code} />);
		// 	});
		// 	cardImages.push(<p>second split hand score:{calculateScore(playerThreeSplitHand, false)}</p>);
		// } else if (playerNumber === 4 && playerFourSplitHand.length > 0) {
		// 	cardImages.push(<p>first split hand score:{calculateScore(playerFourHand, false)}</p>);
		// 	playerFourSplitHand.forEach((card) => {
		// 		cardImages.push(<img src={card.image} alt={card.code} />);
		// 	});
		// 	cardImages.push(<p>second split hand score:{calculateScore(playerFourSplitHand, false)}</p>);
		// }
		return <div className="player-hand">{cardImages}</div>;
	};

	return (
		<div>
			<p>Player</p>
			{displayCards(hand, playerNumber)}
			{calculateScore(hand, computerTurn)}

			{hand.length > 0 && (playerNumber === playerNumberTurn || playerNumber + 0.5 === playerNumberTurn) ? (
				<button onClick={() => handleTwist(playerNumberTurn)}>Twist</button>
			) : null}
			{hand.length > 0 && (playerNumber === playerNumberTurn || playerNumber + 0.5 === playerNumberTurn) ? (
				<button onClick={() => handleStick()}>Stick</button>
			) : null}

			{hand.length > 0 &&
			(playerNumber === playerNumberTurn || playerNumber + 0.5 === playerNumberTurn) && (
				<select id="bet-dropdown" onChange={(event) => handlePlaceBet(parseInt(event.target.value))}>
					<option>Place your bet!</option>
					<option value={0}>0</option>
					<option value={1}>1</option>
					<option value={2}>2</option>
					<option value={3}>3</option>
					<option value={4}>4</option>
					<option value={5}>5</option>
					<option value={6}>6</option>
					<option value={7}>7</option>
					<option value={8}>8</option>
					<option value={9}>9</option>
					<option value={10}>10</option>
				</select>
			)}
		</div>
	);
};

export default Player;