const { MessageEmbed } = require("discord.js")

exports.name = "help"
exports.aliases = ["h"]
exports.description = "⤷\`Đọc kỹ hướng dẫn SD trước khi dùng!\`"
exports.ussage = `Sử dụng \`${cfg.prefix}${exports.name}\` để xem danh sách các command.\n
\`${cfg.prefix}[tên command] ?\` để xem hướng dẫn chi tiết của command đó.\n
${exports.description}`

exports.execute = async (message, args, client) => {
    if (args.join(' ').trim() === '?') return client.cmdGuide(message, exports.name, exports.ussage);
    const user = message.author;
    const cmdSize = client.commands.size;
    const joinCmd = client.commands.map(command => command.name).join(' | ');
    const cmds = client.commands.map(command => {
        return {
            name: command.name,
            value: command.description,
            inline: true
        }
    });
    try {
        const embed = new MessageEmbed()
            .setAuthor(`Xin chào ${user.username}!`, user.displayAvatarURL(true))
            .setTitle('Dưới đây là một số command bạn có thể sử dụng')
            .setDescription(`Nếu bạn cần hỗ trợ, hãy tham gia máy chủ hỗ trợ: [\`🎭〔J-V Bot〕 SUPPORT\`](https://discord.gg/dyd8DXbrVq)\n
**Tổng số command: [${cmdSize}]**`)
            .setColor("RANDOM")
            .setThumbnail(cfg.helpPNG)
            .addFields(cmds)
            .addField(`Command prefix: ${cfg.prefix}`, `${joinCmd}`)
            .setFooter(`${cfg.prefix}[tên command] ? để xem hướng dẫn chi tiết của command.`,
                client.user.displayAvatarURL(true))
        message.delete().then(() => message.channel.send({ embeds: [embed] }));
    } catch (e) {
        console.error(e);
    }
}