const Queue = require("../service/queue/queue");

function skip(msg) {
  if (Queue.IsActive()) {
    if (Queue.Length() == 0) {
      return Queue.getCurrentDispatcher().end();
    }

    return Queue.Skip((err) => msg.reply(err));
  }

  msg.reply("Empty Queue!");
}

module.exports = {
  name: process.env.PREFIX + "skip",
  description: "Skip music",
  execute(msg, args, parts) {
    skip(msg);
  },
};
