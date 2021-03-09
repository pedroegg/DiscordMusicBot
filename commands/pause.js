function pause(voiceChannel, chatChannel) {
  if (!voiceChannel) {
    return chatChannel.send("You are not on a channel!");
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
  execute(query, voiceChannel, chatChannel, args, parts) {
    pause(voiceChannel, chatChannel);
  },
};
