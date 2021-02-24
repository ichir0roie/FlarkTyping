import "./App.css";
import React, { useEffect, useState } from "react";
import Login from "./Login";
import reactDom from "react-dom";

const request = require("request");

const Data = require("./Data");

var questions = [];

var nowAnswer = "";

var nowSts = false;
var nowStsTr = "clear!";
var nowStsFl = "type!";
var nowStsPt = nowStsFl;

var questionNo = 0;

var duringGame = false;

const ENDPOINT = Data.dataApi;

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

function App(props) {
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

	const MenuBts = [];

	const handleLogout = () => {
		localStorage.removeItem("token");
		props.setLogin(false);
	};
	MenuBts.push(
		<div className="Menu-item">
			<button className="Menu-item-bt" onClick={() => handleLogout()}>
				LOGOUT
			</button>
		</div>
	);

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

	const handleMenuClick = (e) => {
		console.log(e.target.id);
		let url = new URL(ENDPOINT);
		let params = { qid: e.target.id };
		url.search = new URLSearchParams(params).toString();
		fetch(url, {
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

	const App = (
		<div className="App-body">
			<div className="Type-game">
				<p className="App-status">{appNowSts}</p>
				<p className="App-question">{appQues}</p>
				<input
					className="App-answer"
					onChange={(e) => handleOnChange(e)}
				></input>
				<p>{inptTex}</p>
				<button onClick={() => handleBtMore()}>one more</button>
			</div>
			<div className="Menu-bar">{MenuBts}</div>
		</div>
	);

	return App;
}

export default App;
