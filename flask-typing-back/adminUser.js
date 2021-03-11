const DataRankingPath = "/DataRanking/";
const fs = require("fs");
var path = require("path"); // Path(Node API)：パスの文字列操作
const csv = require("csv-parse/lib/sync");

const rootPath = process.cwd() + DataRankingPath;

const hostData = require("./hostData.js");

const express = require("express");
const { shift } = require("methods");
const mysql = require("mysql");
const { exit } = require("process");

const targetTable = "userinfo";

const app = express();

const connection = getConnection();

function getConnection() {
	const connection = mysql.createConnection({
		host: hostData.hostnameDb,
		user: hostData.user,
		password: hostData.password,
		database: hostData.schema,
	});

	connection.connect((err) => {
		if (err) {
			console.log("error connecting: " + err.stack);
			return;
		}
		console.log("success");
	});
	return connection;
}

function runQuery(query) {
	console.log(query);
	let res = connection.query(query, (error, results) => {
		//setPoolText(results);
		if (error != null) {
			console.log(error);
		}
	});
}

// poolText = [];
// function setPoolText(text) {
// 	poolText.push(text);
// }
// let loopState = true;
// function delayLog() {
// 	if (poolText.length > 0) {
// 		console.log(poolText[0]);
// 		poolText.shift();
// 	}
// }
// setInterval(delayLog, 1000);

exports.setInfo = function (email, userName) {
	let query =
		"select * from " +
		targetTable +
		" where " +
		" email = " +
		"'" +
		email +
		"'" +
		" or " +
		" userName = " +
		"'" +
		userName +
		"'" +
		";";
	console.log(query);
	connection.query(query, (error, results) => {
		//setPoolText(results);
		if (error != null) {
			console.log(error);
		}
		if (results.length > 0) {
			res = "already exists";
		} else {
			insertUser(email, userName);
			res = "add user";
		}
		sendInfo(res);
	});
};

exports.getInfo = function (email) {
	let query =
		"select * from " +
		targetTable +
		" where " +
		" email = " +
		"'" +
		email +
		"'" +
		";";
	console.log(query);
	connection.query(query, (error, results) => {
		//setPoolText(results);
		let res = null;
		if (error != null) {
			console.log(error);
		}
		if (results.length > 1) {
			console.log("Duplication");
			console.log(results);
		} else if (results.length == 1) {
			res = results[0]["userName"];
		} else {
			res = "can't get info";
		}
		sendInfo(res);
	});
};

function sendInfo(res) {
	console.log(res);
}

function updateUser(email, userName) {
	let query =
		"update " +
		targetTable +
		" set " +
		" userName " +
		" = " +
		userName +
		" where " +
		" questionId = " +
		"'" +
		email +
		"'" +
		";";

	runQuery(query);
}
insertUser = function (email, userName) {
	let query =
		"insert into " +
		targetTable +
		" values" +
		"(" +
		"'" +
		email +
		"'" +
		"," +
		"'" +
		userName +
		"'" +
		")";

	runQuery(query);
};

// rankingEnrty("data1", "test3", 115);

// exit();
