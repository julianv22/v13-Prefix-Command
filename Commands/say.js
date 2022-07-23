const cmdHelp = require("../Functions/cmdHelp")

exports.name = "say"
//exports.aliases = ["s"]
exports.description = `⤷${cfg.SayEmoji} Bot chat`
exports.ussage = `\`${cfg.prefix}${exports.name} [Nội dung]\``

exports.callback = async (client, message, args) => {
  try {
    if (args.join(' ').trim() === '?') return cmdHelp(message, exports.name, exports.ussage)

    let toSay = args.join(' ')
    if (!toSay) {
      message.delete()
      return message.channel.send(`${cfg.SayEmoji} | Hãy nói gì đó...`)
    }
    message.channel.send(toSay)
    message.delete()

    throw Error
  } catch (error) {
    console.error(error);
  }
}