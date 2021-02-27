import "../App.css";
import React, { useEffect, useState } from "react";
import reactDom from "react-dom";

import Title from "./Title";
import Result from "./Result";
import Play from "./Play";

function App(props) {
	const [viwe, setView] = useState(<Title />);

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
