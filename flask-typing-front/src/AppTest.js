import "./App.css";

import Title from "./GamePages/Title";
import Test from "./GamePages/Play";

function App(props) {
	const App = (
		<div className="App-body">
			<Test questionId={"data1"}
			questionFolder="testData1"/>
		</div>
	);

	return App;
}

export default App;
