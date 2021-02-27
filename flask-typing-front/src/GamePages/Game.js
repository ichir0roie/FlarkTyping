import "./App.css";
import React, { useEffect, useState } from "react";
import reactDom from "react-dom";

import Title from "./Title";
import Play from "./Play";
import Result from "./Result";

function App() {
	const [view, setView] = useState(<Title />);

	setView(<Play />);

	const App = <div>{view}</div>;
	return App;
}

export default App;
