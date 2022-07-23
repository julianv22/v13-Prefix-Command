const Database = require("@replit/database")
const db = new Database()
const { MessageEmbed } = require("discord.js")
const [f, cmdError, editReport, createEmbed] = [
  require("../Functions/genEmbed"),
  require("../Functions/cmdError"),
  require("../Functions/editReport"),
  require("../Functions/createEmbed")
]

exports.name = "edit"
//exports.aliases = [""]
exports.description = `⤷${cfg.OwnerEmoji} only\n\`${cfg.prefix}${exports.name} ?\``
//\nAlias: \`${exports.aliases}\``
exports.ussage = ''
exports.callback = async (client, message, args) => {
  try {
    const isAdmin = message.member.permissions.has("ADMINISTRATOR")
    const stEdit = args.join(' ').split(' ')
    let reportChannel = await db.get(`reportEditChannel_${message.guild.id}`)
    let rpEditChannel = client.channels.cache.get(reportChannel)

    const editHelp = new MessageEmbed()
      .setTitle(`Hướng dẫn sử dụng [${exports.name}]`)
      .setColor('RANDOM')
      .setThumbnail('https://www.pngall.com/wp-content/uploads/5/Help.png')
      .setAuthor(message.guild.name, message.guild.iconURL(true))
      .addField(`${cfg.OwnerEmoji} only`, '*(dành cho quản trị viên)*')
      .addFields(
        {
          name: 'Channel gửi báo cáo',
          value: `${rpEditChannel}`,
          inline: true
        },
        {
          name: 'Set Channel báo cáo',
          value: `\`${cfg.prefix}${exports.name} set [Channel ID]\``,
          inline: true
        },
        {
          name: 'Edit tin nhắn thông thường',
          value: `\`${cfg.prefix}${exports.name} [Message ID] [Content]\``
        },
        {
          name: 'Edit embed (nâng cao)',
          value: `\`${cfg.prefix}${exports.name} embed [Message ID] [Title] | [Content] | [Footer] | [ThumbnailURL] | [ImageURL]\`
\n**Tham số:**`
        },
        {
          name: '[Message ID]',
          value: 'ID của tin nhắn: chuột phải vào tin nhắn và chọn \`Sao chép ID\` *(xem hình bên dưới)*'
        },
        {
          name: '[Title]',
          value: 'Tiêu đề',
          inline: true
        },
        {
          name: '[Content]',
          value: 'Nội dung edit',
          inline: true
        },
        {
          name: '[Footer]',
          value: 'Phần cuối embed *(có thể bỏ trống)*',
          inline: true
        },
        {
          name: '[ThumbnailURL]',
          value: 'Ảnh thumbnail góc bên phải embed *(nếu không set có thể bỏ trống)*',
          inline: true
        },
        {
          name: '[ImageURL]',
          value: 'Chèn ảnh vào cuối embed *(nếu không set có thể bỏ trống)*',
          inline: true
        },
        {
          name: 'LƯU Ý',
          value: `1. Chỉ có thể edit tin nhắn được gủi bởi <@${client.user.id}>
2. Cần phải sử dụng command tại channel có tin nhắn muốn edit`
        },
      )
      .setImage(
        'https://media.discordapp.net/attachments/997825138647105536/998675567429812224/unknown.png'
      )

    if (stEdit[0] === '?' && isAdmin) return message.reply({ embeds: [editHelp] }) //Edit's Help    

    if (!isAdmin) return message.reply(`${cfg.erroremoji} | Bạn không phải Admin để sử dụng command này!`) //Check Permission
    if (stEdit[0] === 'set') {
      const setChannel = client.channels.cache.get(stEdit[1] || message.channel.id)
      if (setChannel === undefined) { //Check Channel ID
        message.reply(`${cfg.erroremoji} | ID channel không đúng hoặc chưa chính xác`)
      } else {
        //Set Channel ID
        await db.set(`reportEditChannel_${message.guild.id}`, stEdit[1] || message.channel.id)
        message.reply(`${cfg.successemoji} | Channel báo cáo đã được đặt thành ${setChannel}`)
      }
      return;
    }

    if (!stEdit[0]) return cmdError(
      message,
      'Command chưa chính xác!',
      `\`${cfg.prefix}${exports.name} [Message ID] [Nội dung chỉnh sửa]\``
    )

    let msgID = await message.channel.messages.fetch(stEdit[0]).catch(() => undefined);
    const user = message.author
    let editContent
    switch (stEdit[0]) {
      case 'embed':
        msgID = await message.channel.messages.fetch(stEdit[1]).catch(() => undefined);
        // Check Message ID
        if (msgID === undefined || !stEdit[1]) return cmdError(
          message,
          'Lỗi Edit Embed',
          `Message ID \`${stEdit[1]}\` không chính xác hoặc không có quyền edit tin nhắn này!`
        )
        // Check author
        if (msgID.author.id != client.user.id) return cmdError(
          message,
          'Lỗi Edit Embed',
          `${cfg.erroremoji} | Message ID: [\`${stEdit[1]}\`](${msgID.url}) không phải tin nhắn của <@${client.user.id}>`
        )
        // Check Content
        if (!stEdit[2] || !stEdit[3]) return cmdError(
          message,
          'Lỗi Edit Embed',
          `Chưa nhập nội dung edit!\n\`${cfg.prefix}${exports.name} embed [Message ID] [Tiêu đề] | [Nội dung]\``
        )

        const stEmbed = args.slice(2).join(' ').split(' | ')
        editContent = cfg.prefix + exports.name + ' ' + args.join(' ')
        await msgID.edit({ embeds: f.genEmbed(message, stEmbed) })
          .then(() => {
            editReport(message, user.tag, msgID.id, msgID.url, rpEditChannel, editContent)
          })
        message.delete()
        break;
      default:
        editContent = args.slice(1).join(' ')
        //Check Message ID
        if (msgID === undefined || !stEdit[0]) return cmdError(
          message,
          'Lỗi Edit Message',
          `Message ID: \`${stEdit[0]}\` không chính xác hoặc không có quyền edit tin nhắn này!`
        )
        // Check Author
        if (msgID.author.id != client.user.id) return cmdError(
          message,
          'Lỗi Edit Message',
          `${cfg.erroremoji} | Message ID: [\`${stEdit[0]}\`](${msgID.url}) không phải tin nhắn của <@${client.user.id}>`
        )
        // Check Content
        if (!editContent) return cmdError(
          message,
          'Lỗi Edit Message',
          `Chưa nhập nội dung edit!\n\`${cfg.prefix}${exports.name} [Message ID] [Nội dung edit]\``
        )

        await msgID.edit(editContent)
          .then(() => {
            editReport(message, user.tag, msgID.id, msgID.url, rpEditChannel, editContent)
          })
        message.delete()
    } //End Switch
  } catch (err) { console.error(err) }
}