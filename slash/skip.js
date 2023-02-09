const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName("skip").setDescription("Skipea la rola."),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("No hay ni una wea en la cola.")

        const currentSong = queue.current

		queue.skip()
        await interaction.editReply({
            embeds: [
                new EmbedBuilder().setDescription(`Se skipeo ${currentSong.title}!`).setThumbnail(currentSong.thumbnail)
            ]
        })
	},
}