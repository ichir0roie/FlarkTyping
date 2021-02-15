import "./App.css";
import React, { useState } from "react";
import reactDom from "react-dom";

var questions = [];

var nowAnswer = "";

var nowSts = false;
var nowStsTr = "clear!";
var nowStsFl = "type!";
var nowStsPt = nowStsFl;

var questionNo = 0;

var duringGame = false;

var servTest = "no get";

function setQuestions() {
	questions = [
		"クライアントデータ1",
	];
	const request = require('request');

		request(ENDPOINT, (error, response, body) => {
		  // エラーチェック
		  if( error !== null ){
			console.error('error:', error);
			return(false);
		  }
		
		  // レスポンスコードとHTMLを表示
		  console.log('statusCode:', response && response.statusCode);
		  console.log('body:', body);

		  questions=JSON.parse(request)

		});
}

function setGame() {
	questionNo = 0;
	nowAnswer = "";
	nowSts = false;

	setQuestions();

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
				<p className="App-status">{appNowSts}</p>
				<p className="App-question">{appQues}</p>
				<input
					className="App-answer"
					onChange={(e) => handleOnChange(e)}
				></input>
				<p>{inptTex}</p>
				<button onClick={() => handleBtMore()}>one more</button>
			</body>
		</div>
	);
	return App;
}

export default App;
