const Queue = require("../../lib/queue/queue");

let queue = null;
let currentDispatcher = null;
let currentConnection = null;
let startLoop = false;
let currentIndex = 0;

const stateLoop = {
  true: "enabled",
  false: "disabled",
};

function Add(playSongFunc) {
  if (!queue) {
    queue = new Queue(startLoop);
    console.log("New Queue");
  }

  queue.place(playSongFunc);
}

function Remove() {}

function Clear() {
  if (queue) {
    queue.clear();
  }

  queue = null;
  currentConnection = null;
  currentDispatcher = null;
  startLoop = false;
  currentIndex = 0;
}

function Loop() {
  currentIndex = 0;
  if (queue) {
    queue.loop = !queue.loop;
  } else {
    startLoop = !startLoop;
  }

  return `Looping queue ${stateLoop[queue ? queue.loop : startLoop]}!`;
}

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
    if (queue.loop) {
      return queue.next(++currentIndex);
    }

    return queue.next(null);
  }

  callbackFail("Empty queue!");
}

function SkipTo() {}

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

function IsLoop() {
  if (queue) {
    return queue.loop;
  }

  return false;
}

function setLoop(val) {
  if (queue && typeof val == "boolean") {
    currentIndex = 0;
    queue.loop = val;
  }
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
  SkipTo,
  Back,
  JumpTo,
  Length,
  Print,
  IsActive,
  IsLoop,
  setActive,
  setLoop,
  setCurrentDispatcher,
  getCurrentDispatcher,
  setCurrentConnection,
  getCurrentConnection,
};
