const { readFileSync, writeFileSync } = require("fs");
const path = require("path");

writeFileSync(
  path.resolve(__dirname, "temporary", "fileA.txt"), 
  "First Line\n", 
);

writeFileSync(
  path.resolve(__dirname, "temporary", "fileA.txt"), 
  "Second Line\n", 
  {
    flag: "a",
  }
);

writeFileSync(
  path.resolve(__dirname, "temporary", "fileA.txt"), 
  "Third Line", 
  {
    flag: "a",
  }
);

console.log(readFileSync(
  path.resolve(__dirname, "temporary", "fileA.txt"),
  {
    encoding:"utf-8"
  }
));
