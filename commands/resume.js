function resume(msg) {
  const voiceChannel = msg.member.voice.channel;

  if (!voiceChannel) {
    return msg.reply("You are not on a channel!");
  }

  voiceChannel
    .join()
    .then((connection) => {
      connection.dispatcher.resume();
    })
    .catch(console.error);
}

module.exports = {
  name: process.env.PREFIX + "resume",
  description: "Resume music",
  execute(msg, args, parts) {
    resume(msg);
  },
};
