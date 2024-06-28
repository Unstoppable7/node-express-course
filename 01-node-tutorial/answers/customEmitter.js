const EventEmitter = require("events");
const emitter = new EventEmitter();

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

setInterval(() => {
  const number = getRandomInt(100);
  console.log(number);

  if (number % 2 == 0) {
    emitter.emit("oddOrEven", "The number is EVEN");
  } else {
    emitter.emit("oddOrEven", "The number is ODD");
  }
}, 1200);

emitter.on("oddOrEven", (msg) => console.log(msg));
