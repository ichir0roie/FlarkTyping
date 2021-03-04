import "./App.css";

import Title from "./GamePages/Title";
import Play from "./GamePages/Play";
import Resl from "./GamePages/Result";
import { useEffect, useState } from "react";

function App(props) {
	const [view, setView] = useState();

	const firstView = (
		<Play questionId={"data1"} questionFolder="testData1" setView={setView} />
	);
	useEffect(() => {
		setView(firstView);
	}, []);

	const App = <div className="App-body">{view}</div>;

	return App;
}

export default App;
