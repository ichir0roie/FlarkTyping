const typingDataPath = "/TypingData/";
const fs = require("fs");
var path = require("path"); // Path(Node API)：パスの文字列操作
const csv = require("csv-parse/lib/sync");

const rootPath = process.cwd() + typingDataPath;

exports.getTypingData = function (qId) {
	const targetPath = getTargetQuestionPath(rootPath, qId);

	let typingData = [];
	if (targetPath == null) {
		return typingData;
	}

	try {
		let tmpDt = fs.readFileSync(targetPath);

		let res = csv(tmpDt);

		for (var i = 0; i < res.length; i++) {
			typingData[i] = res[i][0];
		}
		console.log(typingData);
	} catch (error) {
		console.log(error);
	}
	return typingData;
};

function getTargetQuestionPath(targetPath, targetQid) {
	let targetQuestionPath = null;
	const files = fs.readdirSync(targetPath);
	for (var i = 0; i < files.length; i++) {
		targetFile = files[i];
		const fullpath = path.join(targetPath, targetFile);
		const stats = fs.statSync(fullpath);
		console.log(fullpath);
		if (stats.isDirectory()) {
			targetQuestionPath = getTargetQuestionPath(fullpath, targetQid);
		} else {
			const qId = targetFile.replace(".csv", "");
			if (qId == targetQid) {
				targetQuestionPath = fullpath;
			}
		}
		if (targetQuestionPath != null) {
			break;
		}
	}
	return targetQuestionPath;
}
