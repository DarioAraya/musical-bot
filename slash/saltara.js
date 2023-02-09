const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("saltara").setDescription("Salta a una cancion con un numero especifico")
    .addNumberOption((option) => 
        option.setName("numero").setDescription("La cancion se salto a").setMinValue(1).setRequired(true)),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("No hay canciones en la cola")

        const trackNum = interaction.options.getNumber("numero")
        if (trackNum > queue.tracks.length)
            return await interaction.editReply("Numero invalido")
		queue.skipTo(trackNum - 1)

        await interaction.editReply(`Se salto a la cancion Nº${trackNum}`)
	},
}