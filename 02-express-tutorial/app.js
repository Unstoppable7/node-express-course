const express = require("express");
const app = express();
const peopleRouter = require("./routes/people");

app.use(logger);
app.use(express.static("./methods-public"));
//allows to access req.body data sended by traditional form method
app.use(express.urlencoded({ extended: false }));
//allows to access req.body data sended by javascript method
app.use(express.json());
// must be after the parsing of the body
app.use("/api/v1/people", peopleRouter);

function logger(req, res, next) {
  const method = req.method;
  const url = req.url;
  const time = new Date().getFullYear();
  console.log(method, url, time);
  next();
}

app.get("/", (req, res) => {
  res.send("Home page");
});

app.post("/login", (req, res) => {
  const { name } = req.body;
  if (name) {
    return res.status(200).send(`Welcome ${name}`);
  }
  res.status(400).json({ success: false, msg: "Please provide a name" });
});

app.all("*", (req, res) => {
  res.status(404).send("resource not found");
});

app.listen(3000, () => {
  console.log("server is listening...");
});
