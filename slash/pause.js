const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("pause").setDescription("Pausa la rola."),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("No hay ni una wea en la cola..")

		queue.setPaused(true)
        await interaction.editReply("Se pausó la wea! Usa `/resume` para reanudarla.")
	},
}