import "../App.css";
import React, { useEffect, useState } from "react";
import reactDom from "react-dom";

const Data = require("../Data");

function App(props) {


	const [questions, setQuestions] = useState([]);
	const [elapseTime, setElapseTime] = useState(0);
	const [nowPlace, setNowPlace] = useState(0);

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
		}).then(res => res.json())
			.then((data) => {
				console.log(data);
				const questionData = data["questions"];
				setQuestions(questionData);
				//todo this is bad
			});
	};
	useEffect(() => {
		getQuestionData(props.questionId);
	}, [])

	const onHandleChangeInput=(e)=>{
		const inputText=e.target.text;
		console.log(inputText);
	}

	const App = (
		<div>
			<div className="play-info">
				<p>test view strings</p>
				<p>{props.questionId}</p>
			</div>
			<div className="play-act">
				<p>{questions[nowPlace]}</p>
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
