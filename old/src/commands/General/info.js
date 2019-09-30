const { Command } = require("klasa");
const { version } = require("../../../package.json");

module.exports = class extends Command {
	constructor (...args) {
		super(...args, {
			aliases: ["details", "what", "about"],
			description: `Tells you some information about me!`,
		});
	}

	async run (msg) {
		return msg.send({
			embed: {
				color: 0x3669FA,
				thumbnail: {
					url: this.client.user.displayAvatarURL(),
				},
				title: `Hi, I'm __${this.client.user.tag}__`,
				description: `I'm running \`highlight\` v**${version}**!\nMy source code is available [here](https://github.com/KingDGrizzle/highlight)!\nTo learn more about using me, run \`${msg.guild.settings.prefix}help\`!`,
			},
		});
	}
};
