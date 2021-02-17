import "./App.css";
import React, { useState, useEffect } from "react";
import reactDom from "react-dom";

const request = require("request");

var questionNo = 0;
var questions = [];
let questionId = "data1";

var nowAnswer = "";

var nowSts = false;
var nowStsTr = "clear!";
var nowStsFl = "type!";
var nowStsPt = nowStsFl;

var duringGame = false;

const frontTypingData = "http://ichir0roie.com/frontOnly/TypingData/";

//hack:settest values
let menuQIds = ["data1", "data2", "data3"];

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

	useEffect(() => {
		setQuestions();
	}, []);

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
		setQuestions();
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

	const [MenuBts, setMenuBts] = useState(() => {
		let tmpAry = [];
		for (let i = 0; i < menuQIds.length; i++) {
			tmpAry.push(
				<div className="Menu-item">
					<button
						className="Menu-item-bt"
						id={menuQIds[i]}
						onClick={(e) => handleMenuClick(e)}
					>
						{menuQIds[i]}
					</button>
				</div>
			);
		}
		return tmpAry;
	});

	function setQuestions() {
		fetch(frontTypingData + questionId + ".csv")
			.then((Response) => Response.text())
			.then((text) => {
				let getQuestions = text.split("\r\n");
				console.log(getQuestions);
				questions = getQuestions;
				update();
			});
	}

	const handleMenuClick = (e) => {
		handleBtMore();
		console.log(e.target.id);
		questionId = e.target.id;
		setQuestions();
	};

	const App = (
		<div className="App">
			<header className="App-header">
				<p className="App-title">FlaskTyping</p>
			</header>
			<body className="App-body">
				<div className="Type-game">
					<p>now:{questionId}</p>
					<p className="App-status">{appNowSts}</p>
					<p className="App-question">{appQues}</p>
					<input
						className="App-answer"
						onChange={(e) => handleOnChange(e)}
					></input>
					<p>{inptTex}</p>
					<button onClick={() => handleBtMore()}>one more</button>
					<p className="fadeout">
						※このバージョンはフロントエンドオンリーで作成
					</p>
					<a
						className="fadeout"
						href="https://github.com/ichir0roie/FlarkTyping/tree/front-only-ver"
						target="_blank"
						rel="noopener noreferrer"
					>
						gitHubリポジトリのリンク
					</a>
				</div>
				<div className="Menu-bar">{MenuBts}</div>
			</body>
		</div>
	);
	return App;
}

export default App;
