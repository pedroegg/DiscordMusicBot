function pause(msg) {
  const voiceChannel = msg.member.voice.channel;

  if (!voiceChannel) {
    return msg.reply("You are not on a channel!");
  }

  voiceChannel
    .join()
    .then((connection) => {
      connection.dispatcher.pause();
    })
    .catch(console.error);
}

module.exports = {
  name: process.env.PREFIX + "pause",
  description: "Pause music",
  execute(msg, args, parts) {
    pause(msg);
  },
};
