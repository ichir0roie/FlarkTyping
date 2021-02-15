import "./App.css";
import React, { useState } from "react";
import reactDom from "react-dom";

const ENDPOINT = "http://localhost:3002";

function App() {
	const [testText, setTesTex] = useState("");

	const handleOnClick = () => {
		const request = require('request');

		request(ENDPOINT, (error, response, body) => {
		  // エラーチェック
		  if( error !== null ){
			console.error('error:', error);
			return(false);
		  }
		
		  // レスポンスコードとHTMLを表示
		  console.log('statusCode:', response && response.statusCode);
		  console.log('body:', body);
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
