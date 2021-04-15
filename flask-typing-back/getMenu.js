const DataTypingPath = "/DataTyping/";
const fs = require("fs");
var path = require("path"); // Path(Node API)：パスの文字列操作
const csv = require("csv-parse/lib/sync");

const workingDir = process.cwd() + DataTypingPath;

let searchFilePaths = [];
let searchDirPaths = [];

//todo:create version of use json.stringfy
function getFileJsons() {
	searchFilePaths = [];
	searchDirPaths = [];
	getFiles(workingDir);

	let jsonData = [];

	for (let i = 0; i < searchDirPaths.length; i++) {
		let dirName = getDirnameFromPath(searchDirPaths[i]);
		let files = searchFilePaths[i];
		let filesRenamed = [];
		for (let j = 0; j < files.length; j++) {
			const fileName = getFilenameFromPath(files[j]);
			filesRenamed.push(fileName);
		}
		jsonData.push([dirName, filesRenamed]);
	}

	let jsonText = JSON.stringify(jsonData);

	return jsonText;
}

// for learning.
// function getFileJsons() {
// 	searchFilePaths = [];
// 	searchDirPaths = [];
// 	getFiles(workingDir);

// 	let jsonText = "{ questions : ";
// 	for (let i = 0; i < searchDirPaths.length; i++) {
// 		let dirName = getDirnameFromPath(searchDirPaths[i]);
// 		let files = searchFilePaths[i];
// 		jsonText += '{ "' + dirName + '" : ' + " [";
// 		for (let j = 0; j < files.length; j++) {
// 			const fileName = getFilenameFromPath(files[j]);
// 			jsonText += '"' + fileName + '"';
// 			if (j < files.length - 1) {
// 				jsonText += ",";
// 			}
// 		}
// 		jsonText += "]}";
// 	}
// 	jsonText += "}";

// 	return jsonText;
// }

function getFiles(targetPath) {
	let retFilePaths = [];
	let files = fs.readdirSync(targetPath);
	files.forEach(function (targetFile) {
		let fullpath = path.join(targetPath, targetFile);
		let stats = fs.statSync(fullpath);
		if (stats.isDirectory()) {
			getFiles(fullpath);
		} else {
			retFilePaths.push(fullpath);
		}
	});
	if (retFilePaths.length > 0) {
		searchDirPaths.push(targetPath);
		searchFilePaths.push(retFilePaths);
	}
}

function getFilenameFromPath(filePath) {
	const pathSplited = filePath.split("\\");
	let fileName = pathSplited[pathSplited.length - 1];
	fileName = fileName.replace(".csv", "");
	return fileName;
}

function getDirnameFromPath(dirName) {
	const pathSplited = dirName.split("\\");
	let fileName = pathSplited[pathSplited.length - 1];
	return fileName;
}

exports.getMenu = function (filter) {
	const names = getFileJsons();
	console.log(names);

	return names;
};
