import "../App.css";
import React, { useEffect, useState } from "react";

const Data = require("../Data");
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
		let params = {
			resQId: props.questionId,
			userId: "testUser",
			lenPerMin: LPM,
		};
		url.search = new URLSearchParams(params).toString();
		fetch(url, {
			method: "GET",
			headers: new Headers(),
			mode: "cors",
			cache: "default",
		});
	};

	const App = (
		<div>
			<p>Result</p>
			<p>問題：{props.questionId}</p>
			<p>経過時間：{props.elapseTime}</p>
			<p>文字列/分：{LPM}</p>
			<div className="play-admin">
				<button onClick={handleReset}>reset</button>
				<button onClick={handleEnd}>end</button>
			</div>
			<div>
				<button onClick={handleRankingEntry}>ランキング登録</button>
			</div>
		</div>
	);

	return App;
}

export default App;
