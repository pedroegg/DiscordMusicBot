const Queue = require("../service/queue/queue");

function loop(msg) {
  return msg.reply(Queue.Loop());
}

module.exports = {
  name: process.env.PREFIX + "loop",
  description: "Loop the queue",
  execute(msg, args, parts) {
    loop(msg);
  },
};
