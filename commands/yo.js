const sanify = require("../util/sanify");

module.exports = {
	name: "yo",
	description: "It yos everything",
	execute(msg, args) {
		console.log(args);
		msg.channel.send(`yo, ${sanify(msg.author)}.`);
	},
};
