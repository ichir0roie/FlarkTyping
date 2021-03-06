import { useReducer } from "react";

const axios = require("axios").default;

const Data = require("./Data");
const apiKey = Data.apiKey;
const signupUrl =
	"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + apiKey;
const signinUrl =
	"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
	apiKey;

// managed params

//userName
//email
//token

export function signin(email, password) {
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
			localStorage.setItem("email", email);
			setUserName();
			console.log("success");
		})
		.catch((error) => {
			// Firebase側で用意されているエラーメッセージが格納される
			// console.log(error.response.data.error.message);
			console.log(error);
			localStorage.removeItem("token");
			
		});
}

export function signup(email, password) {
	// 認証データ
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
			localStorage.setItem("email", email);
			setUserName();
			console.log("success");
		})
		.catch((error) => {
			// Firebase側で用意されているエラーメッセージが格納される
			// console.log(error.response.data.error.message);
			console.log(error);
			localStorage.removeItem("token");
		});
}

function setUserName() {
	//check token
	const token = localStorage.getItem("token");
	//get Info
	let setValue = "";

	let ret = true;

	if (token !== "") {
		//get info function
		setValue = searchUserName();
	} else {
		setValue = "gest user";
		ret = false;
	}
	localStorage.setItem("userName", setValue);
	return ret;
}

export function getUserName() {
	const userName = localStorage.getItem("userName");
	if (userName === "") {
		return "gest user";
	} else {
		return userName;
	}
}
function searchUserName() {
	// search name from db by email

	return "test user SUN";
}
