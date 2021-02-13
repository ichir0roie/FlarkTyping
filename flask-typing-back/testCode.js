typingDataPath = "/TypingData/";
typingDataName = "data1";
const tdp = typingDataPath + typingDataName + ".csv";

const fs = require("fs");
const csv = require("csv-parse/lib/sync");

typingData = [];

let tmpDt = fs.readFileSync(__dirname + tdp);
let res = csv(tmpDt);

for (var i = 0; i < res.length; i++) {
	typingData[i] = res[i][0];
}

for (var i = 0; i < typingData.length; i++) {
	console.log(typingData[i]);
}

const io = require("socket.io")(3001);

io.on("connection", (socket) => {
	// either with send()
	socket.send("Hello!");

	// or with emit() and custom event names
	socket.emit("greetings", "Hey!", { ms: "jane" }, Buffer.from([4, 3, 3, 1]));

	// handle the event sent with socket.send()
	socket.on("message", (data) => {
		console.log(data);
	});

	// handle the event sent with socket.emit()
	socket.on("salutations", (elem1, elem2, elem3) => {
		console.log(elem1, elem2, elem3);
	});
});
