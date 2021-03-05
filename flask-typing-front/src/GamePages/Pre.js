import "../App.css";
import React, { useEffect, useState } from "react";

import Play from "./Play";

function App(props) {
	const onClickStart = () => {
		counter();
	};

	let intervalId = null;
	const [countView, setCountView] = useState();
	let count = 0;
	const counter = () => {
		count = 3;
		setCountView(count);
		intervalId = setInterval(countOnce, 1000);
	};

	const countOnce = () => {
		console.log(count);
		count -= 1;
		if (count <= 0) {
			clearInterval(intervalId);
			intervalId = null;
			props.setPlay();
			console.log("play!!");
		}
		setCountView(count);
	};

	const App = (
		<div>
			<h1>{props.questionId}</h1>
			<p>{countView}</p>
			<button onClick={() => onClickStart()}>スタート</button>
		</div>
	);
	return App;
}

export default App;
