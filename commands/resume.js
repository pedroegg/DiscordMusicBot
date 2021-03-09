function resume(voiceChannel, chatChannel) {
  if (!voiceChannel) {
    return chatChannel.send("You are not on a channel!");
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
  execute(query, voiceChannel, chatChannel, args, parts) {
    resume(voiceChannel, chatChannel);
  },
};
