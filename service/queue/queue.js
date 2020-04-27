const Queue = require("sync-queue");

var queue = null;

function Add(playSongFunc) {
  if (queue == null) {
    queue = new Queue();
    console.log("New Queue");
  }

  queue.place(playSongFunc);
}

function Remove() {}

function Clear() {}

function Loop() {}

function Skip(callbackFail) {
  if (queue != null && queue.active) {
    return queue.next();
  }

  callbackFail("Error: Empty queue!");
}

function Back() {}

function JumpTo() {}

function Length() {
  return queue.length;
}

function Print() {
  if (queue != null && queue.active && queue.length > 0) {
    let message = "```Queue:\n\n";

    queue.forEach(function (element, i) {
      message += `${i} - ${element}`;
    });

    message += "```";

    return message;
  }

  return "Empty Queue!";
}

module.exports = {
  Add,
  Remove,
  Clear,
  Loop,
  Skip,
  Back,
  JumpTo,
  Length,
  Print,
};
