const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("resume").setDescription("Reanuda la rolita."),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("No hay ni una wea en la cola.")

		queue.setPaused(false)
        await interaction.editReply("Se reanudó la wea! Usa `/pause` para pausarla.")
	},
}