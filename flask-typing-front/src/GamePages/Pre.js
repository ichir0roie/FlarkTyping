import "../App.css";
import React, { useEffect, useState } from "react";

function App(props) {
	const App = (
		<div>
			<h1>{props.questionId}</h1>
			<button>スタート</button>
		</div>
	);
	return App;
}

export default App;
