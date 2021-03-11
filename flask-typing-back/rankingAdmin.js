const DataRankingPath = "/DataRanking/";
const fs = require("fs");
var path = require("path"); // Path(Node API)：パスの文字列操作
const csv = require("csv-parse/lib/sync");

const rootPath = process.cwd() + DataRankingPath;

exports.getDataRanking = function (qId) {
	const targetPath = getTargetQuestionPath(rootPath, qId);

	let DataRanking = [];
	if (targetPath == null) {
		return DataRanking;
	}

	try {
		let tmpDt = fs.readFileSync(targetPath);

		let res = csv(tmpDt);

		for (var i = 0; i < res.length; i++) {
			DataRanking[i] = res[i];
		}
		console.log(DataRanking);
	} catch (error) {
		console.log(error);
	}
	return DataRanking;
};

function getTargetQuestionPath(targetPath, targetQid) {
	let targetRankingPath = null;
	const files = fs.readdirSync(targetPath);
	for (var i = 0; i < files.length; i++) {
		targetFile = files[i];
		const fullpath = path.join(targetPath, targetFile);
		const stats = fs.statSync(fullpath);
		console.log(fullpath);

		if (!stats.isDirectory()) {
			const qId = targetFile.replace(".csv", "");
			if (qId == targetQid) {
				targetRankingPath = fullpath;
			}
		}
		if (targetRankingPath != null) {
			break;
		}
	}
	return targetRankingPath;
}
