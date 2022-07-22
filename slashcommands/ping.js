const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Ping pong!'),
    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true
        });        
        const msg = `**⏱ | Ping:** ${client.ws.ping} in *0.${message.createdTimestamp - interaction.createdTimestamp}ms*`;
        await interaction.editReply({
            content: msg
        });
    }
}