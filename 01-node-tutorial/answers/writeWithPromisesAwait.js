const { writeFile, readFile } = require("fs").promises;

const writer = async () => {
  try {
    for (let i = 0; i < 3; i++) {
      await writeFile("./temp.txt", `Writing line ${i + 1}\n`, { flag: "a" });
    }
  } catch (error) {
    console.log(error);
  }
};

const reader = async () => {
  try {
    const result = await readFile("./temp.txt", { encoding: "utf8" });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

const readWrite = async () => {
  await writer();
  await reader();
};

readWrite();
