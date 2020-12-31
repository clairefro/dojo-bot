const CWService = require("../lib/CWService");
const Scraper = require("../lib/Scraper");
const { MessageEmbed } = require("discord.js");
const sanify = require("../util/sanify");

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
		try {
			const response = await codewarsService.getRandomKata(params);
			const embed = new MessageEmbed()
				.setTitle(`${sanify(msg.author.username)} challenges the channel to a random kata!`)
				.setURL(response.href)
				.setColor(0x0000ff)
				.setDescription(
					"Are you up to the task? Head over the the link. Then click 'Train' in the upper right to start crafting your solution.\n\nPost your solution in this channel."
				)
				.addFields(
					{ name: "Kata", value: `${response.title} (${response.kyu} kyu)` },
					{ name: "Link", value: response.href }
				);

			msg.channel.send(embed);
		} catch (e) {
			msg.reply("I didn't quite understand...");
		}
	},
};
