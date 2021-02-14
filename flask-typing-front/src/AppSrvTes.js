import "./App.css";
import React, { useState } from "react";
import reactDom from "react-dom";

const ENDPOINT = "http://localhost:3002";

function App() {
	const [testText, setTesTex] = useState("");

	const handleOnClick = () => {
		fetch(ENDPOINT)
			.then(function (response) {
				response.text().then(function (text) {
					setTesTex(text);
				});
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const App = (
		<div className="AppSrvTes">
			<body className="App-body">
				<p className="App-status">{testText}</p>
			</body>
			<button onClick={handleOnClick}>test</button>
		</div>
	);
	return App;
}

export default App;
