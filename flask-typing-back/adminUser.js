const DataRankingPath = "/DataRanking/";
const fs = require("fs");
var path = require("path"); // Path(Node API)：パスの文字列操作
const csv = require("csv-parse/lib/sync");

const rootPath = process.cwd() + DataRankingPath;

const hostData = require("./hostData.js");

const express = require("express");
const { shift } = require("methods");
const mysql = require("mysql");
const util = require("util");
const { exit } = require("process");

const targetTable = "userinfo";

const app = express();

let connection = null;

function getConnection() {
	connection = mysql.createConnection({
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
}

function runQuery(query) {
	getConnection();
	console.log(query);
	connection.query(query, (error, results) => {
		//setPoolText(results);
		if (error != null) {
			console.log(error);
		}
	});
	connection.end();
}

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

exports.getUserName = async function (email) {
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
	getConnection();
	connection.query = util.promisify(connection.query);

	let res = null;
	const results = await connection.query(query);

	console.log(results);
	if (results.length > 1) {
		console.log("Duplication");
		console.log(results);
	} else if (results.length == 1) {
		res = results[0]["userName"];
	} else {
		console.log("can't get userName on server");
	}

	return res;
};

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
