import "../App.css";
import React, { useEffect, useState } from "react";
import reactDom from "react-dom";

const userInfo = require("./UserInfo");

function Signin() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [userName, setUserName] = useState("");

	const [postError, setPosErr] = useState("");

	const [modeText, setModeText] = useState("sign in");
	const [modeSignIn, setModeSignIn] = useState(true);

	useEffect(() => {
		if (localStorage.getItem("token") != null) {
			setModeText("sign out");
			setModeSignIn(false);
		}
	}, []);

	const handleSignin = (e) => {
		if (modeSignIn) {
			console.log("check signin");
			userInfo.signin(email, password);
			e.preventDefault();
			setPosErr("signin");
			setModeText("sign out");
			setModeSignIn(false);
		} else {
			console.log("try signout");
			localStorage.removeItem("token");
			setPosErr("signout");
			setModeText("sign in");
			setModeSignIn(true);
		}
	};

	const Signin = (
		<body>
			<div className="Login">
				<p className="login-tx">email</p>
				<input
					className="login-in"
					type="text"
					name="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				></input>
				<p className="login-tx">password</p>
				<input
					className="login-in"
					value={password}
					type="password"
					name="password"
					onChange={(e) => setPassword(e.target.value)}
				></input>
				<div>
					<button className="login-bt" onClick={handleSignin}>
						{modeText}
					</button>
				</div>
				<div>
					<p>{postError}</p>
				</div>
			</div>
		</body>
	);
	return Signin;
}

export default Signin;
