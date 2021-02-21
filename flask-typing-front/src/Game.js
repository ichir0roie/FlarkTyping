import "./App.css";
import React, { useEffect, useState } from "react";

var questions = [];

var nowAnswer = "";

var nowSts = false;
var nowStsTr = "clear!";
var nowStsFl = "type!";
var nowStsPt = nowStsFl;

var questionNo = 0;

var duringGame = false;

const ENDPOINT = "http://localhost:3002/";

function setTestQuestions() {
	questions = ["front", "testData"];
}

//hack:settest values
let menuQIds = ["data1", "data2", "data3"];

setTestQuestions();

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
		fetch(ENDPOINT, {
			method: "GET",
			headers: new Headers(),
			mode: "cors",
			cache: "default",
		})
			.then((Response) => Response.json())
			.then((data) => {
				var getQuestions = data;
				console.log(getQuestions);
				questions = getQuestions["questions"];

				handleBtMore();
			})
			.catch(function () {
				setTestQuestions();
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

	function handleMenuClick(e) {
		localStorage.removeItem("token");
	}

	const MenuBts = [];
	function createMenuBts(Qids) {
		for (let i = 0; i < Qids.length; i++) {
			MenuBts.push(
				<div className="Menu-item">
					<button
						className="Menu-item-bt"
						id={Qids[i]}
						onClick={(e) => handleMenuClick(e)}
					>
						{Qids[i]}
					</button>
				</div>
			);
		}
	}
	createMenuBts(menuQIds);

	const App = (
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
			<div className="Menu-bar">{MenuBts}</div>
		</body>
	);

	return App;
}

export default App;
