const Queue = require("sync-queue");

let queue = null;
let currentDispatcher = null;
let currentConnection = null;

function Add(playSongFunc) {
  if (!queue) {
    queue = new Queue();
    console.log("New Queue");
  }

  queue.place(playSongFunc);
}

function Remove() {}

function Clear() {}

function Loop() {}

function Shuffle(callbackFail) {
  if (queue && queue.active && queue.length > 0) {
    for (var i = queue.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = queue[i];
      queue[i] = queue[j];
      queue[j] = temp;
    }
  } else {
    callbackFail();
  }
}

function Skip(callbackFail) {
  if (queue && queue.active) {
    return queue.next();
  }

  callbackFail("Empty queue!");
}

function Back() {}

function JumpTo() {}

function Length() {
  if (queue) {
    return queue.length;
  }

  return 0;
}

function IsActive() {
  if (queue) {
    return queue.active;
  }

  return false;
}

function setActive(val) {
  if (typeof val == "boolean") {
    queue.active = val;
  }
}

function setCurrentDispatcher(dispatcher) {
  if (dispatcher) {
    currentDispatcher = dispatcher;
  }
}

function getCurrentDispatcher() {
  return currentDispatcher;
}

function setCurrentConnection(connection) {
  if (connection) {
    currentConnection = connection;
  }
}

function getCurrentConnection() {
  return currentConnection;
}

function Print() {
  if (queue && queue.active && queue.length > 0) {
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
  Shuffle,
  Skip,
  Back,
  JumpTo,
  Length,
  Print,
  IsActive,
  setActive,
  setCurrentDispatcher,
  getCurrentDispatcher,
  setCurrentConnection,
  getCurrentConnection,
};
