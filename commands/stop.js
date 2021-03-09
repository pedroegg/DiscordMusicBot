function stop(voiceChannel, chatChannel) {
  if (!voiceChannel) {
    return chatChannel.send("You are not on a channel!");
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
  execute(query, voiceChannel, chatChannel, args, parts) {
    stop(voiceChannel, chatChannel);
  },
};
