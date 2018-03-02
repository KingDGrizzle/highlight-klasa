const { Command } = require("klasa");

module.exports = class extends Command {
	constructor (...args) {
		super(...args, {
			runIn: ["text"],
			description: "Removes a word or a phrase from your highlight list",
			usage: "<Word:str>",
		});
	}

	async run (msg, [word]) {
		word = word.toLowerCase().trim();
		if (!msg.member.configs.words.includes(word)) {
			return msg.send({
				embed: {
					color: 0xCC0F16,
					description: `You don't have that word in your word list!`,
				},
			});
		}
		msg.member.configs.update("words", word);
		await this.client.removeCachedWord(msg.guild, word, msg.member);
		return msg.send({
			embed: {
				color: 0x43B581,
				description: `Done! \`${word}\` has been removed from your highlight list.`,
			},
		});
	}
};
