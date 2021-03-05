import "../App.css";
import React, { useEffect, useState } from "react";

import Play from "./Play";

function App(props) {
	const onClickStart = () => {
		props.setView(
			<Play questionId={props.questionId} setView={props.setView} />
		);
	};

	const App = (
		<div>
			<h1>{props.questionId}</h1>
			<button onClick={() => onClickStart()}>スタート</button>
		</div>
	);
	return App;
}

export default App;
