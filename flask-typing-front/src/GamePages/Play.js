import "../App.css";
import React, { useEffect, useState, useRef } from "react";
import reactDom from "react-dom";

const Data = require("../Data");

function App(props) {
	const [questions, setQuestions] = useState([]);
	const [elapseTime, setElapseTime] = useState(0);
	const [nowQuestion, setNowQuestion] = useState(0);

	const [timeStart, setTimeStart] = useState(new Date().getTime());
	const [timeEnd, setTimeEnd] = useState(timeStart);

	const getQuestionData = () => {
		//todo next write this.
		let url = new URL(Data.dataApi);
		const quesPath = props.questionFolder + "/" + props.questionId;
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
	useEffect(() => {
		getQuestionData(props.questionId);
	}, []);

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
		if (nowQuestion < questions.length) {
			setNowQuestion(nowQuestion + 1);
		} else {
			judgeGame();
		}
	};
	const judgeGame = () => {};

	const clacElapse = () => {
		const now = new Date().getTime();
		setElapseTime(parseInt((now - timeStart) / 1));

		console.log("++++++++++++++++++++");
		console.log("calced value : " + parseInt((now - timeStart) / 1));
		console.log("state  value : " + elapseTime);
		console.log("ref    value : " + refElapseTime.current);
	};

	const refElapseTime = useRef(elapseTime);
	useEffect(() => {
		refElapseTime.current = elapseTime;
		console.log("now    value : " + elapseTime);
	}, [elapseTime]);

	useEffect(() => {
		setInterval(clacElapse, 2000);
	}, []);

	const App = (
		<div>
			<div className="play-info">
				<p>test view strings</p>
				<p>{props.questionId}</p>
			</div>
			<div className="play-act">
				<p>経過時間：{elapseTime}</p>
				<p>{questions[nowQuestion]}</p>
				<input
					onChange={(e) => {
						onHandleChangeInput(e);
					}}
				></input>
			</div>
			<div className="play-admin">
				<button>reset</button>
				<button>end</button>
			</div>
		</div>
	);

	return App;
}

export default App;
