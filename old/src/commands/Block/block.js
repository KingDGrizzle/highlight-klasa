const { Command } = require("klasa");
const { User } = require("discord.js");

module.exports = class extends Command {
	constructor (...args) {
		super(...args, {
			runIn: ["text"],
			description: "Block a member or a channel from highlighting you",
			usage: "<User:user|TextChannel:channel>",
			aliases: ["blacklist"],
		});
		this.needsMember = true;
	}

	async run (msg, [userOrChannel]) {
		return userOrChannel instanceof User ? this._blockUser(msg, userOrChannel) : this._blockChannel(msg, userOrChannel);
	}

	async _blockUser (msg, user) {
		if (msg.member.settings.blacklistedUsers) {
			if (msg.member.settings.blacklistedUsers.includes(user.id)) {
				return msg.send({
					embed: {
						color: 0xCC0F16,
						description: `That user is already blacklisted!`,
					},
				});
			}
		}
		await msg.member.settings.update("blacklistedUsers", user, { action: "add" });
		return msg.send({
			embed: {
				color: 0x43B581,
				description: `Done! **${user.tag}** has been added to your blocklist.`,
			},
		});
	}

	async _blockChannel (msg, channel) {
		if (msg.member.settings.blacklistedChannels) {
			if (msg.member.settings.blacklistedChannels.includes(channel.id)) {
				return msg.send({
					embed: {
						color: 0xCC0F16,
						description: `That channel is already blacklisted!`,
					},
				});
			}
		}
		await msg.member.settings.update("blacklistedChannels", channel, { action: "add" });
		return msg.send({
			embed: {
				color: 0x43B581,
				description: `Done! **#${channel.name}** has been added to your blocklist.`,
			},
		});
	}
};
