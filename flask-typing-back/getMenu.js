const typingDataPath = "/TypingData/";
const fs = require("fs");
var path = require("path"); // Path(Node API)：パスの文字列操作
const csv = require("csv-parse/lib/sync");

const workingDir = process.cwd() + typingDataPath;

let searchFilePaths = [];
function getFileNames() {
	searchFilePaths = [];
	getFiles(workingDir);
	let names = [];
	searchFilePaths.forEach(function (filePath) {
		names.push(getFilenameFromPath(filePath));
	});
	return names;
}

function getFiles(targetPath) {
	let files = fs.readdirSync(targetPath);
	files.forEach(function (targetFile) {
		let fullpath = path.join(targetPath, targetFile);
		let stats = fs.statSync(fullpath);
		if (stats.isDirectory()) {
			getFiles(fullpath);
		} else {
			searchFilePaths.push(fullpath);
		}
	});
}

function getFilenameFromPath(filePath) {
	const pathSplited = filePath.split("\\");
	let fileName = pathSplited[pathSplited.length - 1];
	fileName = fileName.replace(".csv", "");
	return fileName;
}

exports.getMenu = function (filter) {
	const names = getFileNames();
	console.log(names);

	return names;
};
