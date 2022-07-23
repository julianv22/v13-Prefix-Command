const { MessageEmbed } = require("discord.js")

module.exports = async (message, stError, stHelp) => {
  try {
    const embErr = new MessageEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL(true))
      .setTitle('Error:')
      .setThumbnail(cfg.errorPNG)
      .setColor('RED')
      .addField(stError, stHelp)
    message.reply({ embeds: [embErr] })
  } catch (err) { console.error(err) }
}