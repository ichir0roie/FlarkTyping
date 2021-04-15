import "../App.css";
import React, { useEffect, useState } from "react";
import reactDom from "react-dom";

const userInfo = require("./UserInfo");

function Signin() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [userName, setUserName] = useState("");

	const [postError, setPosErr] = useState("");

	const handleSignup = (e) => {
		console.log("try signup");
		userInfo.signup(email, password);
		e.preventDefault();
		setPosErr("signup");
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
				<p className="login-tx">userName</p>
				<input
					className="login-in"
					value={userName}
					onChange={(e) => setPassword(e.target.value)}
				></input>
				<div>
					<button className="login-bt" onClick={handleSignup}>
						signUp
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
