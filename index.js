global.cfg = require('./config.json');

const expr = require("express");
const app = expr();
const fs = require("fs");
const DC = require("discord.js");
const FLAG = DC.Intents.FLAGS;
const cmdError = require("./Functions/cmdError");

app.listen(3000, () => {
  console.log("Project is running!");
});

let client = new DC.Client({
  intents: [
    FLAG.GUILDS,
    FLAG.GUILD_MESSAGES,
    FLAG.GUILD_MESSAGE_REACTIONS,
    //FLAG.GUILD_MESSAGE_TYPING,    
    FLAG.GUILD_MEMBERS,
    FLAG.GUILD_INVITES,
    FLAG.GUILD_VOICE_STATES,
    //FLAG.GUILD_PRESENCES,    
    //FLAG.GUILD_INTEGRATIONS,
    //FLAG.GUILD_WEBHOOKS,    
    //FLAG.GUILD_BANS,
    //FLAG.GUILD_EMOJIS_AND_STICKERS,    
    //FLAG.DIRECT_MESSAGES,
    //FLAG.DIRECT_MESSAGE_TYPING,
    //FLAG.DIRECT_MESSAGE_REACTIONS,
  ],
  partials: [
    "MESSAGE", "CHANNEL", "REACTION"
  ]
});

client.commands = new DC.Collection();
client.functions = new DC.Collection();

//List Commands in Commands Folder
const cmd_files = fs.readdirSync("./Commands").filter(file => file.endsWith(".js"));
for (const file of cmd_files) {
  const cmd = require(`./Commands/${file}`);
  if (cmd.name) {
    client.commands.set(cmd.name, cmd);
  }
};

client.on("messageCreate", async (message) => {
  try {
    if (message.channel.type === "DM") return;
    if (message.author.bot) return;
    // Check bot permission
    const botPermission = "SEND_MESSAGES" && "MANAGE_MESSAGES" && "EMBED_LINKS" && "ADD_REACTIONS"
    //const isAdmin = message.member.permissions.has("ADMINISTRATOR")
    if (!message.channel.permissionsFor(cfg.botID).toArray().includes(botPermission))
      return console.log("\n\n-----------Bot CANT send message!!-----------\n\n")
    // Check message prefix 
    if (message.content.startsWith(cfg.prefix)) {
      const args = message.content.slice(cfg.prefix.length).split(/ +/);
      const cmdName = args.shift().toLowerCase()
      const command = client.commands.get(cmdName) || client.commands.find(a => a.aliases && a.aliases.includes(cmdName));
      // Check command
      if (!command) return cmdError(
        message,
        'Không tìm thấy command',
        `\`${cfg.prefix}${cmdName}\` chưa chính xác hoặc không tồn tại!`
      )

      command.callback(client, message, args);
    }
  } catch (error) {
    console.error(error);
  }
})
//---------------------BOT Stats---------------------
client.on("ready", async () => {
  console.log("Client has Logged on!");

  const stStatust = cfg.prefix + cfg.status
  setInterval(() => { // Set Activity
    const index = Math.floor(Math.random() * cfg.statustype.length);
    client.user.setActivity(stStatust, {
      type: cfg.statustype[index],
      url: cfg.youtube
    });
  }, 1000 * 60 * 5);

  console.log(`${cfg.name} is online. Prefix = ${cfg.prefix}`);
  console.log(`Working in ${client.guilds.cache.size.toLocaleString()} Servers`)
  console.log(`Status = ${stStatust}`);
  console.log(`Status type = ${cfg.statustype}`);
  console.log(`Mod emoji = ${cfg.ModEmoji}`);
  console.log(`Owner emoji = ${cfg.OwnerEmoji}`);
  console.log(`Error Emoji = ${cfg.erroremoji}`);
  console.log(`Success Emoji = ${cfg.successemoji}`);
  console.log(`Fun Emoji = ${cfg.FunEmoji}`);
  console.log(`Curency Emoji = ${cfg.CurrencyEmoji}`);
  console.log(`Currency Name = ${cfg.CurrencyName}`);
  console.log(`Embed Color = ${cfg.embedcolor}`);
  console.log(`Support Server = ${cfg.serverName}`);
  console.log(`Server ID = ${cfg.serverID}`);
  console.log(`OwnerID = ${cfg.ownerID}`);
  console.log(`Owner Server ID = ${cfg.ownerServerID}`);
  console.log(`--------SERVER IS STARTED--------`)
})
//---------------------End BOT Stats---------------------
app.get("/", (req, res) => {
  res.send(cfg.expresstext);
})

client.login(process.env.token).catch((e) => {
  console.log(e);
  process.disconnect();
  process.destroy();
})