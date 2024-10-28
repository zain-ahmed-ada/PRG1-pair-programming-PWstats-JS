const fs = require("fs");

const inputFile = "10000-common-passwords.csv";
const outputFile = "statistics.csv";
const delimiter = ",";

function deleteExistingOutputFile() {
	if (fs.existsSync(outputFile)) {
		fs.unlinkSync(outputFile);
	}
}

function processData() {
	const data = fs.readFileSync(inputFile, "utf-8");
	const lines = data.split(/\n/);

	const countList = [];

	for (let line of lines) {
		let elements = line.split(delimiter);
		let character = elements[1].length;
		let newCharacter = character.toString();

		const existingEntry = countList.find((entry) => entry.Char === newCharacter);
		if (existingEntry) {
			existingEntry.Counter += 1;
		} else {
			countList.push({
				Char: newCharacter,
				Counter: 1,
			});
		}
	}

	let newData = countList.map((entry) => `Char: ${entry.Char}, Count: ${entry.Counter}`).join("\n");

	fs.appendFileSync(outputFile, newData);
}

// Main execution
deleteExistingOutputFile();
processData();
