import "../App.css";
import React, { useEffect, useState } from "react";

function App(props) {
	const [questions, setQuestions] = useState(<div></div>);

	const createQuestionMenus = () => {};

	useEffect(() => {
		createQuestionMenus();
	}, []);

	const App = (
		<div>
			<h1 className="select-question">問題選択</h1>
			<div className="question-list"></div>
		</div>
	);
	return App;
}

export default App;
