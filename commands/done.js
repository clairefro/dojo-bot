const random = require("../util/random");
const CWService = require("../lib/CWService");
const Scraper = require("../lib/Scraper");

const scraper = new Scraper();
const codewarsService = new CWService(scraper);

const reactions = ["🙏🏾", "✌🏽", "✌🏿", "🖖🏽", "🥳", "👌🏽", "💯", "🤘🏽"];

module.exports = {
	name: "done",
	description: "Submits a solution to dojo-bot",
	execute: async (msg, args) => {
		console.log({ args });
		if (!args.length) {
			msg.reply(
				"congratulations, but I'll need your codewars username in order to verify your victory... \nPlease try 'done <your_username>'"
			);
		} else {
			try {
				const username = args[0];
				const res = await codewarsService.getSolutionsByUsername(username);
				if (res.success == false) {
					msg.reply("I'm afraid that's not a valid Codewars username...");
					return;
				}
				// TODO: logic for confirming completion
				msg.reply(JSON.stringify(res.data.map((d) => d.id)).slice(0, 200));
				msg.react(random(reactions));
			} catch (e) {
				msg.reply("so sorry. Something appears to have gone wrong... ", JSON.stringify(e));
			}
		}
	},
};
