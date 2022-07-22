const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Replies with Hello World!'),
    async execute(interaction) {
        await interaction.reply('Hello World!');
    },
}