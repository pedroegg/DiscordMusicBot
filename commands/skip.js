const Queue = require("../service/queue/queue");

function skip(chatChannel) {
  if (Queue.IsActive()) {
    if (Queue.Length() == 0) {
      Queue.getCurrentDispatcher().end();
      Queue.getCurrentConnection().disconnect();
      return Queue.Clear();
    }

    return Queue.Skip((err) => chatChannel.send(err));
  }

  chatChannel.send("Empty Queue!");
}

module.exports = {
  name: process.env.PREFIX + "skip",
  description: "Skip music",
  execute(query, voiceChannel, chatChannel, args, parts) {
    skip(chatChannel);
  },
};
