require("dotenv").config();

module.exports = {
  name: process.env.PREFIX + "ping",
  description: "Ping!",
  execute(msg, args, parts) {
    msg.reply("pong");
  },
};
