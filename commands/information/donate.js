const { MessageEmbed } = require("discord.js");
const genEmbed = require("../../functions/genEmbed");

exports.name = "donate";
exports.aliases = ["ungho"];
exports.description = `⤷Ủng hộ tôi.\nAlias: \`${exports.aliases}\``;
exports.ussage = `**Ủng hộ tôi:**
\`${cfg.prefix}${exports.name}\``;

exports.execute = async (message, args, client) => {
    if (args.join(' ').trim() === '?') return cmdGuide(message, exports.name, exports.ussage);
    const user = message.author
    const imgURL = "https://media.discordapp.net/attachments/976364997066231828/997976998527914124/Header.png"
    const donateThumb = 'https://cdn.discordapp.com/avatars/566891661616218132/ba6efb8ea73083a217e45c977e70a921.webp'

    const stArg =
        [
            'Ủng hộ tôi!',
            'Các phương thức thanh toán:',
            'Cảm ơn bạn đã quan tâm và ủng hộ Julian-V',
            donateThumb,
            imgURL,
            'Donate ^ [PlayerDuo](https://playerduo.com/julianvduo) # Momo ^ [0974.626.222](https://me.momo.vn/vjIyu4FJf2sMtqsQtptn) # Tip ^ [StreamElements](https://streamelements.com/julianv-4174/tip)'
        ]
    message.reply({ embeds: genEmbed(message, stArg) });
}