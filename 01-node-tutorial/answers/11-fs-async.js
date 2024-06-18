const { writeFile, readFile } = require("fs");
const path = require("path");

console.log("Starting with asynchronous function");

writeFile(
  path.resolve(__dirname, "temporary", "fileb.txt"),
  "First line\n",
  (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Successful first line writing");
    writeFile(
      path.resolve(__dirname, "temporary", "fileb.txt"),
      "Second line\n",
      {
        flag: "a",
      }
      ,
      (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("Successful Second line writing");

        writeFile(
          path.resolve(__dirname, "temporary", "fileb.txt"),
          "Third line\n",
          {
            flag: "a",
          }
          ,
          (err, result) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log("Successful Third line writing");
          }
        );
      }
    );
  }
);
