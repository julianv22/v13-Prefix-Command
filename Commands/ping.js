const cmdHelp = require("../Functions/cmdHelp")

exports.name = "ping"
//exports.aliases = [""]
exports.description = "⤷Ping Pong!"
exports.ussage = `\`${cfg.prefix}${exports.name}\``

exports.callback = async (client, message, args) => {
  try {
    if (args.join(' ').trim() === '?') return cmdHelp(message, exports.name, exports.ussage)

    let x = args.join(' ')
    if (x) return
    message.reply(`⏱ | **${message.author.username}** ping: \`${client.ws.ping} ms\``)

    throw Error
  } catch (error) {
    console.error(error);
  }
}