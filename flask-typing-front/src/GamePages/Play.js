import "../App.css";
import React, { useEffect, useState } from "react";
import reactDom from "react-dom";

const Data = require("../Data");

function App(props) {
	const App = (
		<div className="App-body">
			<div className="Type-game">
				<p className="App-status">{appNowSts}</p>
				<p className="App-question">{appQues}</p>
				<input
					className="App-answer"
					onChange={(e) => handleOnChange(e)}
				></input>
				<p>{inptTex}</p>
				<button onClick={() => handleBtMore()}>one more</button>
			</div>
			<div className="Menu-bar">
				<div>
					<p>user name</p>
					<p>{userName}</p>
				</div>
				<div>{menuBts}</div>
			</div>
		</div>
	);

	return App;
}

export default App;
