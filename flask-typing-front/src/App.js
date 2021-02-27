import "./App.css";
import React, { useEffect, useState } from "react";
import reactDom from "react-dom";

import Login from "./Seculity/Login";
import Game from "./GamePages/Game";

function App() {
	const [isLogined, setLogin] = useState(false);
	const [signinMode, setSigninMode] = useState(false);
	useEffect(() => {
		if (localStorage.getItem("token")) {
			// ログインしている場合に任意のメソッドを実行
			console.log("signined");
			setLogin(true);
		}
	}, []);

	const AppLogin = (
		<div className="App">
			<header className="App-header">
				<p className="App-title">FlaskTyping</p>
			</header>
			<body>
				<Login setLogin={setLogin} />
			</body>
		</div>
	);

	const AppGame = (
		<div className="App">
			<header className="App-header">
				<p className="App-title">FlaskTyping</p>
			</header>
			<body>
				<Game
					isLogined={isLogined}
					setLogin={setLogin}
					setSigninMode={setSigninMode}
				/>
			</body>
		</div>
	);
	return AppGame;
}

export default App;
