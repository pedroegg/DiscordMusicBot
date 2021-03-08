const Queue = require("../service/queue/queue");

function shuffle(chatChannel) {
  Queue.Shuffle(() => chatChannel.send("Empty Queue!"));

  return chatChannel.send("Queue Shuffled :thumbup:");
}

module.exports = {
  name: process.env.PREFIX + "shuffle",
  description: "Shuffle the queue (randomizes)",
  execute(query, voiceChannel, chatChannel, args, parts) {
    shuffle(chatChannel);
  },
};
