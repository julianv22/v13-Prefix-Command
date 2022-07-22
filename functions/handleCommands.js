const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

module.exports = (client) => {
    client.handleCommands = async (cmdFolders, slashCommandFiles) => {
        // Commands Handle
        console.log('Command Foldes:');
        console.log(cmdFolders);
        console.log('Command Files:');
        const cmdFileArray = []
        for (const folder of cmdFolders) {
            const cmdFiles = fs.readdirSync(`./commands/${folder}`).filter(f => f.endsWith('.js'));
            for (const file of cmdFiles) {
                const command = require(`../commands/${folder}/${file}`);
                if (command.name) {
                    client.commands.set(command.name, command);
                    cmdFileArray.push(command.name);
                };
            };
        };
        console.log(cmdFileArray);

        // Slash Commands Handle
        const slashCMD = [];
        for (const file of slashCommandFiles) {
            const slashcmd = require(`../slashcommands/${file}`);
            client.slashCommands.set(slashcmd.data.name, slashcmd);
            client.slashArray.push(slashcmd.data.toJSON());
            slashCMD.push(slashcmd.data.name)
        }

        (async () => {
            const rest = new REST({ version: '9' }).setToken(cfg.token);
            try {
                console.log('Started refreshing application (/) commands.');
                await rest.put(Routes.applicationCommands(cfg.ID),
                    { body: client.slashArray });
                console.log('Loading Slash Commands:')
                console.log(slashCMD);
                console.log('Successfully reloaded application (/) commands.');
            } catch (error) {
                console.error(error);
            }
        })();
    }
}