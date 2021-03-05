import "../App.css";
import React, { useEffect, useState } from "react";
import reactDom from "react-dom";

import Title from "./Title";
import Pre from "./Pre";
import Play from "./Play";
import Result from "./Result";

function App(props) {
	//init hooks
	const [view, setView] = useState();

	const title = <Title setView={setView} />;

	useEffect(() => {
		setView(title);
	}, []);

	const App = <div className="App-body">{view}</div>;

	return App;
}

export default App;
