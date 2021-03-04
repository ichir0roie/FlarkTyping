import "../App.css";
import React, { useEffect, useState } from "react";
import reactDom from "react-dom";

import Title from "./Title";
import Pre from "./Pre";
import Play from "./Play";
import Result from "./Result";

function App(props) {
	const startGame = (questionId) => {
		setView(<Play questionId={questionId} />);
	};

	const setQuestion = (questionId) => {
		setView(<Pre questionId={questionId} startGame={startGame} />);
	};
	const title = <Title setQuestion={setQuestion} />;

	//init hooks
	const [view, setView] = useState(title);

	// useEffect(() => {
	// 	if (true) {
	// 		setView(<Play />);
	// 		setView(<Result />);
	// 	}
	// }, []);

	const App = <div className="App-body">{view}</div>;

	return App;
}

export default App;
