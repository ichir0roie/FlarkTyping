const DataRankingPath = "/DataRanking/";
const fs = require("fs");
var path = require("path"); // Path(Node API)：パスの文字列操作
const csv = require("csv-parse/lib/sync");

const rootPath = process.cwd() + DataRankingPath;
console.log("test");

const hostData = require("./hostData.js");

const express = require("express");
const { shift } = require("methods");
const mysql = require("mysql");
const { exit } = require("process");

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

exports.rankingEnrty = function (questionId, userId, lenPerMin) {
	let query =
		"select * from " +
		"ranking" +
		" where " +
		" questionId = " +
		"'" +
		questionId +
		"'" +
		" and " +
		" userId = " +
		"'" +
		userId +
		"'" +
		";";
	console.log(query);
	connection.query(query, (error, results) => {
		//setPoolText(results);
		if (error != null) {
			console.log(error);
		}
		if (results.length > 1) {
			console.log("Duplication");
			console.log(results);
		} else if (results.length == 1) {
			rankingUpdate(questionId, userId, lenPerMin);
		} else {
			rankingInsert(questionId, userId, lenPerMin);
		}
	});
};

function rankingUpdate(questionId, userId, lenPerMin) {
	let query =
		"update " +
		"ranking" +
		" set " +
		" lenPerMin " +
		" = " +
		lenPerMin +
		" where " +
		" questionId = " +
		"'" +
		questionId +
		"'" +
		" and " +
		" userId = " +
		"'" +
		userId +
		"'" +
		";";

	runQuery(query);
}
function rankingInsert(questionId, userId, lenPerMin) {
	let query =
		"insert into " +
		"ranking" +
		" values" +
		"(" +
		"null" +
		"," +
		"'" +
		questionId +
		"'" +
		"," +
		"'" +
		userId +
		"'" +
		"," +
		lenPerMin +
		")";

	runQuery(query);
}

// rankingEnrty("data1", "test3", 115);

// exit();
