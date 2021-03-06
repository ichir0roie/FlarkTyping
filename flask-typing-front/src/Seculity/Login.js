import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import "../css/Login.css";

const axios = require("axios").default;

const Data = require("../Data");
const apiKey = Data.apiKey;
const signupUrl =
	"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + apiKey;
const signinUrl =
	"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
	apiKey;

function Login(props) {
	const auth = () => {
		// 認証データ
		const authDate = {
			email: email,
			password: password,
			returnSecureToken: true,
		};
		axios
			.post(signinUrl, authDate)
			.then((response) => {
				// 返ってきたトークンをローカルストレージに格納する
				localStorage.setItem("token", response.data.idToken);
				setPosErr("signIn!!");

				props.setLogin(true);
			})
			.catch((error) => {
				// Firebase側で用意されているエラーメッセージが格納される
				setPosErr(error.response.data.error.message);
				localStorage.removeItem("token");
			});
	};

	const signup = () => {
		const authDate = {
			email: email,
			password: password,
			returnSecureToken: true,
		};
		axios
			.post(signupUrl, authDate)
			.then((response) => {
				// 返ってきたトークンをローカルストレージに格納する
				localStorage.setItem("token", response.data.idToken);
				setPosErr("signUp!!");

				props.setLogin(true);
			})
			.catch((error) => {
				// Firebase側で用意されているエラーメッセージが格納される
				setPosErr(error.response.data.error.message);
				localStorage.removeItem("token");
			});
	};

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [postError, setPosErr] = useState("");

	const handleLogin = (e) => {
		auth();
		e.preventDefault();
	};
	const handleSignUp = (e) => {
		signup();
		e.preventDefault();
	};

	const Login = (
		<div className="Login">
			<p>ログイン</p>

			<p className="login-tx-email">email</p>
			<input
				className="login-in-email"
				type="text"
				name="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
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
				<button className="login-bt-in" onClick={handleLogin}>
					signIn
				</button>
			</div>
			<div>
				<button className="login-bt-up" onClick={handleSignUp}>
					signUp
				</button>
			</div>
			<div>
				<p>{postError}</p>
			</div>
		</div>
	);

	const [userName,setUserName]=useState("");

	const Logined=(
		<div>
			<p>user name</p>
			<p>{userName}</p>
		</div>	
		);

	const view=Login;
	if(false){
		view=Logined;
	}
	return view;
}

export default Login;
