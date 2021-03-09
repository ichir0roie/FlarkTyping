import "./App.css";

import { useEffect, useState } from "react";

import Title from "./GamePages/Title";
import Play from "./GamePages/Play";
import Result from "./GamePages/Result";
import Pre from "./GamePages/Pre";

function App(props) {
	//init props
	let questionId = "data1";
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

	useEffect(() => {
		setView(
			<Play
				questionId={"data1"}
				setResult={setResult}
				setPre={setPre}
				setTitle={setTitle}
			/>
		);
	}, []);

	const App = <div className="App-body">{view}</div>;

	return App;
}

export default App;
