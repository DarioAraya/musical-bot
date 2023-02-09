const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("salir").setDescription("Detiene al bot y limpia la cola"),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("No hay canciones en la cola")

		queue.destroy()
        await interaction.editReply("Chaolin bombim!")
	},
}