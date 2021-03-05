import "../App.css";
import React, { useEffect, useState } from "react";

import Pre from "./Pre";

const Data = require("../Data");

const ENDPOINT = Data.dataApi;

function App(props) {
	const [questions, setQuestions] = useState(<div></div>);

	const createQuestionMenus = () => {};

	useEffect(() => {
		createQuestionMenus();
	}, []);

	function createMenuBts() {
		let url = new URL(ENDPOINT);
		let params = { menu: "all" };
		url.search = new URLSearchParams(params).toString();
		fetch(url, {
			method: "GET",
			headers: new Headers(),
			mode: "cors",
			cache: "default",
		})
			.then((Response) => Response.json())
			.then((data) => {
				let menuCmp = [];

				for (let i = 0; i < data.length; i++) {
					var menuName = data[i][0];
					var quesIds = data[i][1];

					let buttonsCmp = [];
					for (let j = 0; j < quesIds.length; j++) {
						buttonsCmp.push(
							<button
								className="bt-question"
								id={quesIds[j]}
								onClick={(e) => onClickQuestion(e)}
							>
								{quesIds[j]}
							</button>
						);
					}
					menuCmp.push(
						<div>
							<h1>{menuName}</h1>
							<div>{buttonsCmp}</div>
						</div>
					);
				}
				setQuestions(menuCmp);
			});
	}
	useEffect(() => createMenuBts(), []);

	const onClickQuestion = (e) => {
		props.setView(<Pre questionId={e.target.id} setView={props.setView} />);
	};

	const App = (
		<div>
			<h1 className="select-question">問題選択</h1>
			<div className="question-list">{questions}</div>
		</div>
	);
	return App;
}

export default App;
