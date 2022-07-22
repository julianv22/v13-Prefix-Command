global.cfg = require(`./config.json`);

const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});
client.commands = new Collection();
client.slashCommands = new Collection();
client.slashArray = [];

const funcFiles = fs.readdirSync('./functions').filter(f => f.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(f => f.endsWith('.js'));
const cmdFolders = fs.readdirSync('./commands');
const slashCommandFiles = fs.readdirSync('./slashcommands').filter(f => f.endsWith('.js'));

(async () => {
    for (file of funcFiles) require(`./functions/${file}`)(client);

    client.handleEvents(eventFiles);
    client.handleCommands(cmdFolders, slashCommandFiles);

    client.login(cfg.token).catch(e => console.log(e));
})();