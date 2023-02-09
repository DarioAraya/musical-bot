const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("pausar").setDescription("Pausa la cancion"),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("No hay canciones en la cola")

		queue.setPaused(true)
        await interaction.editReply("Se pauso la cancion! Usa `/reanudar` para reanudar")
	},
}