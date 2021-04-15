import "./App.css";
import React, { useEffect, useState } from "react";
import reactDom from "react-dom";

// import Login from "./Seculity/Login";
import Game from "./GamePages/Game";

function App() {
	const [view, setView] = useState(<Game />);
	const App = (
		<div className="App">
			<header className="App-header">
				<p className="App-title">FlaskTyping</p>
			</header>
			<body>{view}</body>
		</div>
	);
	return App;
}

export default App;
