require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();

// Set up commands
bot.commands = new Discord.Collection();
const botCommands = require("./commands");
Object.keys(botCommands).map((key) => {
	bot.commands.set(botCommands[key].name, botCommands[key]);
});

// Boot bot
const TOKEN = process.env.TOKEN;
bot.login(TOKEN);

bot.on("ready", () => {
	console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on("message", (msg) => {
	const args = msg.content.split(/\s+/);
	console.log(args);
	// this assumes command is the first word in message
	const command = args.shift().toLowerCase();

	if (!bot.commands.has(command)) return;

	try {
		bot.commands.get(command).execute(msg, args);
	} catch (error) {
		console.error(error);
		msg.reply("There was an error when attempting to run that command.");
	}
});
