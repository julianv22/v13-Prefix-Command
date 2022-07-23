const cmdHelp = require("../Functions/cmdHelp")

exports.name = "react"
//exports.aliases = [""]
exports.description = "⤷Cool! 😎"
exports.ussage = `\`${cfg.prefix}${exports.name}\``

exports.callback = async (client, message, args) => {
  try {
    if (args.join(' ').trim() === '?') return cmdHelp(message, exports.name, exports.ussage)

    let stReact = [
      "Cool!",
      "Greet!",
      "Perfect!",
      "Wonderful!",
      "Amazing!",
      "Holy!"
    ]
    message.delete()
    const msg = `${stReact[Math.floor(Math.random() * stReact.length)]}`
    const msgReact = await message.channel.send(msg)
    await msgReact.react("😎")

    throw Error
  } catch (error) {
    console.error(error);
  }
}