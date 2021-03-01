import "../App.css";
import React, { useEffect, useState } from "react";

function App(props) {

	const onClickStart=()=>{
		props.startGame(props.questionId);
	}

	const App = (
		<div>
			<h1>{props.questionId}</h1>
			<button
			onClick={
				()=>onClickStart()
			}
			>スタート</button>
		</div>
	);
	return App;
}

export default App;
