const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("shuffle").setDescription("Mezcla la cola."),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("No hay ni una wea en la cola..")

		queue.shuffle()
        await interaction.editReply(`La cola de ${queue.tracks.length} canciones de ha mezclado!`)
	},
}