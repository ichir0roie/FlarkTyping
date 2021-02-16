import "./App.css";
import React, { useState } from "react";
import reactDom from "react-dom";

const request = require("request");

var questions = [];

var nowAnswer = "";

var nowSts = false;
var nowStsTr = "clear!";
var nowStsFl = "type!";
var nowStsPt = nowStsFl;

var questionNo = 0;

var duringGame = false;

var servTest = "no get";

const ENDPOINT = "http://localhost:3002";

function setQuestions(Qid) {
	questions = [
		"クライアントデータ",
		"クライアント側でベタ打ちした",
		"配列が問題に設定されている",
	];
}

setQuestions();

function setGame() {
	questionNo = 0;
	nowAnswer = "";
	nowSts = false;

	duringGame = true;
}

setGame();

function endGame() {
	questionNo = -1;
	nowAnswer = "";
	nowSts = true;

	questions = [];

	duringGame = false;
}

function chkGame() {
	if (questionNo >= questions.length) {
		endGame();
		return false;
	}

	return true;
}

function nextQes() {
	nowSts = false;
	nowAnswer = "";
	questionNo++;
}

function judge() {
	if (!duringGame) return;
	if (nowAnswer === questions[questionNo]) {
		nowSts = true;
	} else {
		nowSts = false;
	}
	if (nowSts) {
		nowStsPt = nowStsTr;
	} else {
		nowStsPt = nowStsFl;
	}
	if (nowSts) {
		nextQes();
	}
	return chkGame();
}

function App() {
	const [inptTex, setTex] = useState("");
	const [appNowSts, setNowSts] = useState(nowStsPt);
	const [appQues, setQues] = useState(questions[questionNo]);
	const handleOnChange = (e) => {
		nowAnswer = e.target.value;
		var next = judge();
		if (!next) {
			initialize();
		}
		e.target.value = nowAnswer;

		update();
	};

	const handleBtMore = () => {
		setGame();
		document.getElementsByClassName("App-answer")[0].value = "";
		update();
	};

	const handleBtChange = () => {
		fetch(ENDPOINT)
			.then((Response) => Response.json())
			.then((data) => {
				var getQuestions = data;
				console.log(getQuestions);
				questions = getQuestions["questions"];

				handleBtMore();
			});
	};

	function initialize() {
		setTex("");
		setQues("");
		setNowSts("finish!");
	}

	// const [app,set]=useState("");
	function update() {
		if (duringGame) {
			setTex(nowAnswer);
			setQues(questions[questionNo]);
			setNowSts(nowStsPt);
		}
	}
	const App = (
		<div className="App">
			<header className="App-header">
				<p className="App-title">FlaskTyping</p>
			</header>
			<body className="App-body">
				<div className="Type-game">
					<p className="App-status">{appNowSts}</p>
					<p className="App-question">{appQues}</p>
					<input
						className="App-answer"
						onChange={(e) => handleOnChange(e)}
					></input>
					<p>{inptTex}</p>
					<button onClick={() => handleBtMore()}>one more</button>

					<div>
						<button onClick={(e) => handleBtChange(e)}>change questions</button>
					</div>
				</div>
				<div className="Menu-bar">
					<div className="Menu-item">
						<button className="Menu-item-bt">test1</button>
					</div>
					<div className="Menu-item">
						<button className="Menu-item-bt">test1</button>
					</div>
				</div>
			</body>
		</div>
	);
	return App;
}

export default App;
