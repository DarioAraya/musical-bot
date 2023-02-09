const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require('discord.js');
const { QueryType } = require("discord-player")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("carga desde youtube.")
		.addSubcommand((subcommand) =>
			subcommand
				.setName("song")
				.setDescription("Carga sólo una desde una url.")
				.addStringOption((option) => option.setName("url").setDescription("url de la rola.").setRequired(true))
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("playlist")
				.setDescription("Carga una playlist desde una url")
				.addStringOption((option) => option.setName("url").setDescription("url de la playlist.").setRequired(true))
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("search")
				.setDescription("Busca una rola con un nombre en específico.")
				.addStringOption((option) =>
					option.setName("searchterms").setDescription("palabras clave.").setRequired(true)
				)
		),
	run: async ({ client, interaction }) => {
		if (!interaction.member.voice.channel) return interaction.editReply("Debes estar en un canal de voz para usar este comando.")

		const queue = await client.player.createQueue(interaction.guild)
		if (!queue.connection) await queue.connect(interaction.member.voice.channel)

		const embed = new EmbedBuilder();

		if (interaction.options.getSubcommand() === "song") {
            let url = interaction.options.getString("url")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_VIDEO
            })
            if (result.tracks.length === 0)
                return interaction.editReply("Sin resultados.")
            
            const song = result.tracks[0]
            await queue.addTrack(song)
            embed.setDescription(`**[${song.title}](${song.url})** se ha añadido a la cola.`).setThumbnail(song.thumbnail).setFooter({ text: `Duración: ${song.duration}`})

		} else if (interaction.options.getSubcommand() === "playlist") {
            let url = interaction.options.getString("url")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_PLAYLIST
            })

            if (result.tracks.length === 0){
                return interaction.editReply("Sin resultados.")
            }
                
            
            const playlist = result.playlist
            await queue.addTracks(result.tracks)
            embed.setDescription(`**${result.tracks.length} canciones de [${playlist.title}](${playlist.url})** se han añadido a la cola.`).setThumbnail(playlist.thumbnail.url)


		} else if (interaction.options.getSubcommand() === "search") {
            let url = interaction.options.getString("searchterms")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })

            if (result.tracks.length === 0)
                return interaction.editReply("Sin resultados.")
            
            const song = result.tracks[0]
            await queue.addTrack(song)
            embed
                .setDescription(`**[${song.title}](${song.url})** se ha añadido a la cola.`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Duración: ${song.duration}`})
		}
        if (!queue.playing) await queue.play()
        await interaction.editReply({
            embeds: [embed]
        })
	},
}