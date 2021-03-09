import "../App.css";
import React, { useEffect, useState, useRef } from "react";
import reactDom from "react-dom";

import Result from "./Result";

const Data = require("../Data");

function App(props) {
	useEffect(() => {
		window.addEventListener("keydown", gameKeyEvent);
		return () => {
			window.removeEventListener("keydown", gameKeyEvent);
		};
	}, []);
	function gameKeyEvent(e) {
		switch (e.code) {
			case "Escape":
				props.setPre();
				break;
			default:
				console.log("this is play : " + e.code);
		}
	}

	const [questions, setQuestions] = useState([]);
	const [elapseTime, setElapseTime] = useState(0);
	const [nowQuestion, setNowQuestion] = useState(0);
	const [gameState, setGameState] = useState("type!");

	let timeStart = new Date().getTime();

	let App = null;

	const getQuestionData = () => {
		//todo next write this.
		let url = new URL(Data.dataApi);
		const quesPath = props.questionId;
		let params = { qid: quesPath };
		url.search = new URLSearchParams(params).toString();
		const res = fetch(url, {
			method: "GET",
			headers: new Headers(),
			mode: "cors",
			cache: "default",
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				const questionData = data["questions"];
				setQuestions(questionData);
				//todo this is bad
			});
	};

	const onHandleChangeInput = (e) => {
		const inputText = e.target.value;

		console.log(inputText);
		if (inputText == questions[nowQuestion]) {
			console.log("hit");
			e.target.value = "";
			nextQuestion();
		}
	};

	const nextQuestion = () => {
		if (nowQuestion < questions.length - 1) {
			setNowQuestion(nowQuestion + 1);
		} else {
			judgeGame();
		}
	};
	const judgeGame = () => {
		setGameState("finish!");

		clearInterval(intervalId);

		// get strings length
		let sumLen = 0;
		questions.forEach((s) => {
			sumLen += s.length;
		});

		props.setResult(elapseTime, sumLen);
	};

	const clacElapse = () => {
		const now = new Date().getTime();
		var elapseText = parseInt((now - timeStart) / 100) / 10;
		elapseText = elapseText.toString();
		if (elapseText.indexOf(".") <= 0) {
			elapseText = elapseText + ".0";
		}
		setElapseTime(elapseText);
	};

	const [intervalId, setIntervalId] = useState(null);

	const handleReset = () => {
		props.setPre();
	};
	const handleEnd = () => {
		props.setTitle();
	};

	const inputRef = useRef(null);

	// start game
	useEffect(() => {
		inputRef.current.focus();
		getQuestionData(props.questionId);
		if (nowQuestion == 0 && intervalId == null) {
			timeStart = new Date().getTime();
			setIntervalId(setInterval(clacElapse, 100));
		}
	}, []);

	App = (
		<div>
			<div className="play-info">
				<p>test view strings</p>
				<p>{props.questionId}</p>
				<p>{gameState}</p>
			</div>
			<div className="play-act">
				<p>経過時間：{elapseTime}</p>
				<p>{questions[nowQuestion]}</p>
				<input
					ref={inputRef}
					onChange={(e) => {
						onHandleChangeInput(e);
					}}
				></input>
			</div>
			<div className="play-admin">
				<button onClick={handleReset}>reset</button>
				<button onClick={handleEnd}>end</button>
			</div>
		</div>
	);

	return App;
}

export default App;
