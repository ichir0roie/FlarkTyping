import "./App.css";
import React, { useState } from "react";

var nowQuestion = "test text";

function App() {
	const handleOnChange = (e) => {
		nowQuestion = e.target.value;
		chgTex(nowQuestion);
	};

	const [inptTex, chgTex] = useState("");
	return (
		<div className="App">
			<header className="App-header">
				<p className="App-title">FlaskTyping</p>
				<p>this is header.</p>
			</header>
			<body className="App-body">
				<p>this is body</p>
				<p className="App-question">{nowQuestion}</p>
				<input className="App-ask" onChange={(e) => handleOnChange(e)}></input>
				<p>{inptTex}</p>
			</body>
			a
		</div>
	);
}

export default App;
