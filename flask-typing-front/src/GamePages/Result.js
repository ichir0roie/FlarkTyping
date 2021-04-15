import "../App.css";
import React, { useEffect, useState } from "react";
import userEvent from "@testing-library/user-event";

const Data = require("../Data/Data");
const ENDPOINT = Data.dataApi;

function App(props) {
	useEffect(() => {
		window.addEventListener("keydown", gameKeyEvent);
		return () => {
			window.removeEventListener("keydown", gameKeyEvent);
		};
	}, []);
	function gameKeyEvent(e) {
		switch (e.code) {
			case "KeyR":
				props.setPre();
				break;
			case "KeyE":
				props.setTitle();
				break;
			default:
				console.log("this is result : " + e.code);
		}
	}

	let LPM = parseInt((props.questionsLength / props.elapseTime) * 60);

	const handleReset = () => {
		props.setPre();
	};
	const handleEnd = () => {
		props.setTitle();
	};

	const handleRankingEntry = () => {
		let url = new URL(ENDPOINT);
		let sendJson = {
			qId: props.questionId,
			userId: "testUser", //this is hack.testmode
			lenPerMin: LPM,
		};
		sendJson = JSON.stringify(sendJson);
		let params = {
			result: sendJson,
		};
		url.search = new URLSearchParams(params).toString();
		fetch(url, {
			method: "GET",
			headers: new Headers(),
			mode: "cors",
			cache: "default",
		});
	};

	const [ranking, setRanking] = useState(0);

	function getRanking() {}

	useEffect(() => {
		getRanking();
	}, []);

	const App = (
		<div>
			<div className="result-info">
				<p>Result</p>
				<p>問題：{props.questionId}</p>
				<p>経過時間：{props.elapseTime}</p>
				<p>文字列/分：{LPM}</p>
			</div>
			<div className="ranking-info">
				<p>順位：{ranking}</p>
				<button onClick={handleRankingEntry}>ランキング登録</button>
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
