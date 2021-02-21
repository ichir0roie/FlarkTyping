import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import App from "./App";

const axios = require("axios").default;

const apiKey = "AIzaSyDqBK2vj-rQAUVcO1dch84Lyc4JKmSJCHs";

const signupUrl =
	"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + apiKey;
const signinUrl =
	"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
	apiKey;

let url = signinUrl;

function Login() {
	const auth = () => {
		// 認証データ
		const authDate = {
			email: username,
			password: password,
			returnSecureToken: true,
		};
		axios
			.post(url, authDate)
			.then((response) => {
				// 返ってきたトークンをローカルストレージに格納する
				localStorage.setItem("token", response.data.idToken);
				setPosErr("signIn!!");
			})
			.catch((error) => {
				// Firebase側で用意されているエラーメッセージが格納される
				setPosErr(error.response.data.error.message);
				localStorage.removeItem("token");
			});
	};

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [postError, setPosErr] = useState("");

	const handleLogin = (e) => {
		auth();
		e.preventDefault();
		ReactDOM.render(
			<React.StrictMode>
				<App />
				{/* <AppSrvTes /> */}
			</React.StrictMode>,
			document.getElementById("root")
		);
	};

	const Login = (
		<body>
			<div className="Login">
				<form method="post" onSubmit={handleLogin}>
					<p className="login-tx-username">userName</p>
					<input
						className="login-in-username"
						type="text"
						name="email"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					></input>
					<p className="login-tx-password">password</p>
					<input
						className="login-in-password"
						value={password}
						type="password"
						name="password"
						onChange={(e) => setPassword(e.target.value)}
					></input>
					<div>
						<button className="login-bt-in">signIn</button>
					</div>
				</form>
				<div>
					<button className="login-bt-up">signUp</button>
				</div>
				<div>
					<p>{postError}</p>
				</div>
			</div>
		</body>
	);
	return Login;
}

export default Login;
