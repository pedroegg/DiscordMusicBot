function stop(msg) {
  let voiceChannel = msg.member.voice.channel;

  if (!voiceChannel) {
    return msg.reply("You are not on a channel!");
  }

  voiceChannel
    .join()
    .then((connection) => {
      connection.disconnect();
    })
    .catch(console.error);
}

module.exports = {
  name: process.env.PREFIX + "stop",
  description: "Stop music",
  execute(msg, args, parts) {
    stop(msg);
  },
};
