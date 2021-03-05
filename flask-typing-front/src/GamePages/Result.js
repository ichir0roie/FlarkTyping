import "../App.css";
import React, { useEffect, useState } from "react";

function App(props) {
	let LPM = parseInt((props.questionsLength / props.elapseTime) * 60);

	const App = (
		<div>
			<p>this is Result</p>
			<p>問題：{props.questionId}</p>
			<p>経過時間：{props.elapseTime}</p>
			<p>文字列/分：{LPM}</p>
		</div>
	);

	return App;
}

export default App;
