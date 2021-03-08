const Queue = require("../service/queue/queue");

function Length(chatChannel) {
  if (Queue.IsActive()) {
    return chatChannel.send(Queue.Length());
  }

  chatChannel.send("Empty Queue!");
}

module.exports = {
  name: process.env.PREFIX + "length",
  description: "Return the length of the queue",
  execute(query, voiceChannel, chatChannel, args, parts) {
    Length(chatChannel);
  },
};
