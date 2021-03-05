import "./App.css";

import { useEffect, useState } from "react";

import Title from "./GamePages/Title";
import Play from "./GamePages/Play";
import Resl from "./GamePages/Result";
import Pre from "./GamePages/Pre";

function App(props) {
	const [view, setView] = useState();

	const firstView = (
		// <Play questionId={"data1"} questionFolder="testData1" setView={setView} />
		<Pre questionId={"data1"} />
	);
	useEffect(() => {
		setView(firstView);
	}, []);

	const App = <div className="App-body">{view}</div>;

	return App;
}

export default App;
