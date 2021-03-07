const Queue = require("../service/queue/queue");

function Length(msg) {
  if (Queue.IsActive()) {
    return msg.reply(Queue.Length());
  }

  msg.reply("Empty Queue!");
}

module.exports = {
  name: process.env.PREFIX + "length",
  description: "Return the length of the queue",
  execute(msg, args, parts) {
    Length(msg);
  },
};
