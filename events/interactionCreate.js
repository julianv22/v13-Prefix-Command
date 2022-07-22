module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        try {
            if (!interaction.isCommand()) return;

            const { slashCommands } = client;
            const { commandName } = interaction;
            const command = slashCommands.get(commandName);

            if (!command) return;
            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: `Error: ${error}`, ephemeral: true });
            };
        } catch (error) {
            console.error(error);
        };
    }
}