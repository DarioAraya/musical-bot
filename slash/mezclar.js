const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("mezclar").setDescription("Mezcla la cola"),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("No hay canciones en la cola")

		queue.shuffle()
        await interaction.editReply(`La cola de ${queue.tracks.length} canciones de ha mezclado!`)
	},
}