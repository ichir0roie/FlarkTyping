const typingDataPath = "/TypingData/";
const fs = require("fs");
const csv = require("csv-parse/lib/sync");

const workingDir = process.cwd() + typingDataPath;

const path = require("path");

let searchFilePaths = [];
function getFileNames() {
	searchFilePaths = [];
	let searched = false;
	searched = getFiles(workingDir);
	return searchFilePaths;
}

function getFiles(filePath) {
	fs.readdir(filePath, (err, files) => {
		if (err) {
			console.error(err);
			return;
		}
		for (const file of files) {
			const fp = path.join(filePath, file);
			fs.stat(fp, (err, stats) => {
				if (err) {
					console.error(err);
					return;
				}
				if (stats.isDirectory()) {
					getFiles(fp);
				} else {
					searchFilePaths.push(fp);
					console.log(fp);
				}
			});
		}
	});
	return true;
}

exports.getMenu = function (filter) {
	const names = getFileNames();
	console.log(names);
};

// exports.getMenu = function (qId) {
// 	let tdp = typingDataPath + qId + ".csv";

// 	let typingData = [];

// 	let tmpDt = fs.readFileSync(__dirname + tdp);
// 	let res = csv(tmpDt);

// 	for (var i = 0; i < res.length; i++) {
// 		typingData[i] = res[i][0];
// 	}
// 	return typingData;
// };
