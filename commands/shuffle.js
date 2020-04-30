const Queue = require("../service/queue/queue");

function shuffle(msg) {
  Queue.Shuffle(() => msg.reply("Empty Queue!"));

  return msg.reply("Queue Shuffled :thumbup:");
}

module.exports = {
  name: process.env.PREFIX + "shuffle",
  description: "Shuffle the queue (randomizes)",
  execute(msg, args, parts) {
    shuffle(msg);
  },
};
