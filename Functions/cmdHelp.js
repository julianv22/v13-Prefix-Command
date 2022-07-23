const { MessageEmbed } = require("discord.js")

module.exports = async (message, cmdName, cmdUssage, stFooter) => {
  try {
    const embHelp = new MessageEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL(true))
      .setThumbnail(cfg.helpPNG)
      .setTitle(`Huớng dẫn sử dụng command [${cmdName}]`)
      .setDescription(cmdUssage)
      .setColor(cfg.embedcolor)
    if (stFooter) embHelp.setFooter(stFooter)
    message.reply({ embeds: [embHelp] })
  } catch (err) { console.error(err) }
}
