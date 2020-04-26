function pause(msg) {
  vc = msg.member.voice.channel;

  if (!vc) {
    return msg.reply("You are not on a channel!");
  }

  vc.join()
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
