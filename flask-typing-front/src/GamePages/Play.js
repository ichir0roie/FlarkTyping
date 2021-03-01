import "../App.css";
import React, { useEffect, useState } from "react";
import reactDom from "react-dom";

const Data = require("../Data");

function App(props) {
	const App = (
		<div>
		<p>test view strings</p>
		<p>{props.questionId}</p>
		</div>
	);

	return App;
}

export default App;
