const CWService = require("../lib/CWService");
const Scraper = require("../lib/Scraper");

const scraper = new Scraper();
const codewarsService = new CWService(scraper);

module.exports = {
	name: "random",
	description: "Delivers a random kata",
	execute: async (msg, args) => {
		console.log("Fetching kata...");
		const params = {};
		// TODO: refactor param mapping elsewhere
		args.forEach((arg) => {
			if (arg.match("=")) {
				const parts = arg.split("=");
				if (parts[0] === "difficulty") {
					parts[0] = "kyus";
					switch (parts[1]) {
						case "easy":
							parts[1] = [8, 7];
							break;
						case "medium":
							parts[1] = [6, 5];
							break;
						case "hard":
							parts[1] = [4, 3, 2, 1];
							break;
						default:
							msg.reply("Sorry that difficulty is not recognized... defaulting to medium");
							parts[1] = [6, 5];
					}
				}
				params[parts[0]] = parts[1];
			}
		});
		const response = await codewarsService.getRandomKata(params);
		console.log("response sample: ", response.slice(0, 3));
	},
};
