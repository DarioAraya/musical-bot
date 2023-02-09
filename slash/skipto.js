const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("skipto").setDescription("Salta a una canción con un número especifico.")
    .addNumberOption((option) => 
        option.setName("numero").setDescription("La canción se salto a").setMinValue(1).setRequired(true)),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("No hay ni una wea en la cola.")

        const trackNum = interaction.options.getNumber("número")
        if (trackNum > queue.tracks.length)
            return await interaction.editReply("Número invalido")
		queue.skipTo(trackNum - 1)

        await interaction.editReply(`Se salto a la canción Nº${trackNum}`)
	},
}