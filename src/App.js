import React, {useState} from 'react';
import './App.css';
import GameTwentyOne from './components/GameTwentyOne.js';

function App() {

	const [currentGame, setCurrentGame] = useState("");
	return (
		<div className="App">
			{ currentGame === "" && <div>
			<h1>Card School</h1>
			<button onClick={() => setCurrentGame("Twenty One")}>Twenty One</button>
			</div>}
			{currentGame === "Twenty One" && <GameTwentyOne setCurrentGame={setCurrentGame} />}
		</div>
	);
}

export default App;
