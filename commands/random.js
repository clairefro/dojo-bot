const CWService = require("../lib/CWService");
const Scraper = require("../lib/Scraper");

const scraper = new Scraper();
const codewarsService = new CWService(scraper);

module.exports = {
	name: "random",
	description: "Delivers a random kata",
	execute: async (msg, args) => {
		console.log("Fetching kata...");
		const response = await codewarsService.getRandomKata();
		console.log({ response });
	},
};
