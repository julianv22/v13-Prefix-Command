const { MessageEmbed } = require("discord.js")
const cmdHelp = require("../Functions/cmdHelp")

exports.name = "avatar"
exports.aliases = ["avt"]
exports.description = `⤷Xem avatar của một người nào đó.\nAlias: \`${exports.aliases}\``
exports.ussage = `**Để xem avatar của một người nào đó dùng command:**
\`${cfg.prefix}${exports.name} @tên thành viên\``

exports.callback = async (client, message, args) => {
  try {
    if (args.join(' ').trim() === '?') return cmdHelp(message, exports.name, exports.ussage, 'Nếu bỏ trống phần tên thì sẽ hiển thị avatar của chính mình')
    const user =
      message.mentions.users.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.author;
    const username = user.username || user.user.username;

    const avtEmbed = new MessageEmbed()
      .setColor("RANDOM")
      .setTimestamp()
      //.setTitle('Avatar')
      .setDescription(`Avatar của ${user}`)
      .setImage(user.displayAvatarURL({ dynamic: true, size: 2048 }))
      .setFooter({
        text: `Requested by ${message.author.username}`,
        iconURL: message.author.displayAvatarURL(true)
      });
    message.reply({ embeds: [avtEmbed] });

    throw Error
  } catch (err) {
    console.error(err);
    //message.reply(`${cfg.erroremoji} | Error: \`\`\`${err}\`\`\``);
  }
}