import "../App.css";
import React, { useEffect, useState } from "react";
import reactDom from "react-dom";

import Title from "./Title";
import Pre from "./Pre";
import Play from "./Play";
import Result from "./Result";

function App(props) {
	//initial page
	const setQuestion = (questionId) => {
		setView(<Pre questionId={questionId} />);
	};
	const title = <Title setQuestion={setQuestion} />;

	//init hooks
	const [viwe, setView] = useState(title);

	// useEffect(() => {
	// 	if (true) {
	// 		setView(<Play />);
	// 		setView(<Result />);
	// 	}
	// }, []);

	const App = <div>{viwe}</div>;

	return App;
}

export default App;
