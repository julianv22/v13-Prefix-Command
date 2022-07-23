const { MessageEmbed } = require("discord.js")
const cmdHelp = require("../Functions/cmdHelp")

exports.name = "wow"
//exports.aliases = [""]
exports.description = "⤷😍 Wow!"
exports.ussage = `\`${cfg.prefix}${exports.name}\``

exports.callback = async (client, message, args) => {
  try {
    if (args.join(' ').trim() === '?') return cmdHelp(message, exports.name, exports.ussage)

    const user = message.author
    const embed = new MessageEmbed()
      .setAuthor(user.username, user.displayAvatarURL(true))
      .setFooter("😍 Wow!")
      .setColor(cfg.embedcolor)
      .setImage("https://thumbs.gfycat.com/FavoriteBasicBadger-max-1mb.gif")
    message.channel.send({ embeds: [embed] })
    message.delete()

    throw Error
  } catch (error) {
    console.error(error);
  }
}