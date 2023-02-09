const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("reanudar").setDescription("Reanuda la musica"),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("No hay canciones en la cola")

		queue.setPaused(false)
        await interaction.editReply("La musica se reanudo! Usa `/pausar` para pausar la musica")
	},
}