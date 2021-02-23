import "./App.css";
import React, { useEffect, useState } from "react";
import reactDom from "react-dom";

import Login from "./Login";
import Game from "./Game";

function App() {
	const App = (
		<div className="App">
			<header className="App-header">
				<p className="App-title">FlaskTyping</p>
			</header>
			<body>
				<Game />
				<Login />
			</body>
		</div>
	);

	return App;
}

export default App;
