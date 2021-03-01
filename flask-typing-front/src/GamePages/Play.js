import "../App.css";
import React, { useEffect, useState } from "react";
import reactDom from "react-dom";

const Data = require("../Data");

function App(props) {

const getQuestionData=(questionId)=>{
//todo next write this.
	return [];
}

	const [questions, setQuestions] = useState(
		getQuestionData(props.questionId)
	);
	const [elapseTime, setElapseTime] = useState(0);
	const [nowPlace, setNowPlace] = useState(0);


	const App = (
		<div>
			<div className="play-info">
				<p>test view strings</p>
				<p>{props.questionId}</p>
			</div>
			<div className="play-act">
				<p>{questions[nowPlace]}</p>
				<input
					onChange={(e)=>{
						console.log(e.target.value);
					}}
				></input>
			</div>
			<div className="play-admin">
				<button>reset</button>
				<button>end</button>
			</div>

		</div>);

	return App;
}

export default App;
