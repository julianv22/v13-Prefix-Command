const { MessageEmbed } = require("discord.js")
const [createEmbed, cmdError, f] = [
  require("../Functions/createEmbed"),
  require("../Functions/cmdError"),
  require("../Functions/genEmbed")
]

exports.name = "embed"
exports.aliases = ["em"]
exports.description = `⤷Tạo Embed message.\nAlias: \`${exports.aliases}\``
exports.ussage = ""

exports.callback = async (client, message, args) => {
  try {
    const user = message.author
    const emHelp = new MessageEmbed()
      .setTitle(`Hướng dẫn sử dụng [${exports.name}]`)
      .setColor('RANDOM')
      .setThumbnail('https://www.pngall.com/wp-content/uploads/5/Help.png')
      .setAuthor(message.guild.name, message.guild.iconURL(true))
      .addFields(
        { name: 'Tạo embed cơ bản', value: `\`${cfg.prefix}${exports.name} Title | Description\`` },
        {
          name: 'Tạo embed nâng cao',
          value: `\`${cfg.prefix}${exports.name} Title | Description | Footer | ThumbnailURL | ImageURL \`
\n**Tham số:**`
        },
        { name: 'Title', value: 'Tiêu đề', inline: true },
        { name: 'Description', value: 'Nội dung', inline: true },
        { name: 'Footer', value: 'Phần cuối embed *(có thể bỏ trống)*', inline: true },
        { name: 'ThumbnailURL', value: 'Ảnh thumbnail góc bên phải embed *(nếu không set có thể bỏ trống)*' },
        { name: 'ImageURL', value: 'Chèn ảnh vào cuối embed *(nếu không set có thể bỏ trống)*' },
      )
      .setFooter('Super Embed: Field 1 ^ Value 1 # Field 2 ^ Value 2 # Field 3 ^ Value 3... ')

    let embed = args.join(' ').split(' | ')
    if (embed[0] === '?') return message.reply({ embeds: [emHelp] }) //Embed's Help 

    if (!embed[0] || !embed[1]) return cmdError(
      message,
      'Command chưa chính xác!',
      `\`${cfg.prefix}${exports.name} Tiêu đề | Nội dung\`
\n\`${cfg.prefix}${exports.name} ?\` để xem hướng dẫn cụ thể`
    )
    //createEmbed(message, embed)
    message.channel.send({ embeds: f.genEmbed(message, embed) })
    message.delete()

    throw Error
  } catch (error) {
    console.error(error);
  }
}