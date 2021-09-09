import React, {useState} from 'react';
import './App.css';
import GameTwentyOne from './components/GameTwentyOne/GameTwentyOne.js';
import GameSnap from './components/GameSnap/GameSnap.js';

function App() {

	const [currentGame, setCurrentGame] = useState("");
	return (
		<div className="App">
			{ currentGame === "" && <div>
				<h1>Card School</h1>
				<button className="menu-button" onClick={() => setCurrentGame("Twenty One")}>Twenty-One</button>
				<button className="menu-button" onClick={() => setCurrentGame("Snap")}>Snap</button>
			</div>}
			{currentGame === "Twenty One" && <GameTwentyOne setCurrentGame={setCurrentGame} />}

			{currentGame === "Snap" && < GameSnap setCurrentGame={setCurrentGame}/>}
			

		</div>
	);
}

export default App;
