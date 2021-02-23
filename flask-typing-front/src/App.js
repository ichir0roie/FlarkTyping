import "./App.css";
import React, { useEffect, useState } from "react";
import reactDom from "react-dom";

import Login from "./Login";
import Game from "./Game";

let signIn = false;
if (localStorage.getItem("token")) {
	// ログインしている場合に任意のメソッドを実行
	console.log("signined");
	signIn = true;
}

function App() {
	const [isLogined, setLogin] = useState(signIn);

	const checkLogdIn = () => {
		if (localStorage.getItem("token")) {
			// ログインしている場合に任意のメソッドを実行
			console.log("signined");
			setLogin(true);
		} else {
			console.log("not signined");
			setLogin(false);
		}
	};

	//setInterval(checkLogdIn, 1000);

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
				<Game setLogin={setLogin} />
			</body>
		</div>
	);

	if (isLogined) {
		return AppGame;
	} else {
		return AppLogin;
	}
}

export default App;
