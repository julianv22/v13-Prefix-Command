const { MessageEmbed } = require("discord.js")
const [cmdHelp, f] = [
  require("../Functions/cmdHelp"),
  require("../Functions/genEmbed")
]

exports.name = "link"
exports.aliases = ["invite"]
exports.description = `⤷Link 🔞\nAlias: \`${exports.aliases}\``
exports.ussage = `\`${cfg.prefix}${exports.name}\``

exports.callback = async (client, message, args) => {
  try {
    if (args.join(' ').trim() === '?') return cmdHelp(message, exports.name, exports.ussage)

    const imgURL = "https://media.discordapp.net/attachments/976364997066231828/997976998527914124/Header.png"
    message.reply(`Owner Discord: ${cfg.ownerServerLink}`).then((msg) => {
      msg.edit({
        embeds: f.genEmbed(
          message,
          [
            'Dưới dây là các liên kết bạn có thể cần',
            '\u200b',
            `${client.user.username} is working in [${client.guilds.cache.size.toLocaleString()}] servers`,
            message.guild.iconURL(true),
            imgURL,
            `Server hỗ trợ ^ [${cfg.serverName} Server](${cfg.discordLink}) # Link mời ^ [Invite me (recommended)](${cfg.inviteLink})\n\n[Invite me (admin)](https://shorturl.ae/WnzIo) # Chủ sở hữu ^ [YouTube](${cfg.youtube})`
          ])
      })
    })

    throw Error
  } catch (error) {
    console.error(error);
  }
}