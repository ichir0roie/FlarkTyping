import "../App.css";
import React, { useEffect, useState } from "react";
import reactDom from "react-dom";

import Title from "./Title";
import Pre from "./Pre";
import Play from "./Play";
import Result from "./Result";

function App(props) {
	//init props
	let questionId = "";
	const [view, setView] = useState();

	//init states
	const setTitle = () => {
		setView(<Title setPre={setPre} />);
	};
	const setPre = (qid) => {
		if (typeof qid !== "undefined") {
			questionId = qid;
		}
		setView(<Pre questionId={questionId} setPlay={setPlay} />);
	};

	const setPlay = () => {
		setView(
			<Play
				questionId={questionId}
				setResult={setResult}
				setPre={setPre}
				setTitle={setTitle}
			/>
		);
	};

	const setResult = (elapseTime, sumLen) => {
		setView(
			<Result
				elapseTime={elapseTime}
				questionId={questionId}
				questionsLength={sumLen}
				setPre={setPre}
				setTitle={setTitle}
			/>
		);
	};

	//start render
	useEffect(() => {
		setTitle();
	}, []);

	const App = <div className="App-body">{view}</div>;

	return App;
}

export default App;
