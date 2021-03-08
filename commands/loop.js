const Queue = require("../service/queue/queue");

function loop(chatChannel) {
  return chatChannel.send(Queue.Loop());
}

module.exports = {
  name: process.env.PREFIX + "loop",
  description: "Loop the queue",
  execute(query, voiceChannel, chatChannel, args, parts) {
    loop(chatChannel);
  },
};
