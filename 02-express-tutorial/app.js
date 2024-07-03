const express = require("express");
const app = express();
const { products } = require("./data");

app.use(express.static("./public"));

app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked!" });
});

app.get("/api/v1/products", (req, res) => {
  res.json(products);
});

app.get("/api/v1/products/:productID", (req, res) => {
  const idToFind = parseInt(req.params.productID);
  const product = products.find((p) => p.id === idToFind);
  if (!product) {
    res.json({ message: "That product was not found." });
  } else {
    res.json(product);
  }
});

app.get("/api/v1/query", (req, res) => {
  let response = [];
  const search = req.query.search;
  const limit = req.query.limit;

  if (search != "") {
    if (search.slice(0, 4) === "nam=") {
      response = products.filter((product) =>
        product.name.includes(search.slice(4))
      );
    } else if (search.slice(0, 5) === "desc=") {
      response = products.filter((product) =>
        product.desc.includes(search.slice(5))
      );
    } else if (
      search.slice(0, 6) === "price>" &&
      !isNaN(parseInt(search.slice(6)))
    ) {
      response = products.filter((product) => product.price > search.slice(6));
    } else if (
      search.slice(0, 6) === "price<" &&
      !isNaN(parseInt(search.slice(6)))
    ) {
      response = products.filter((product) => product.price < search.slice(6));
    }
  }
  if (limit != "" && !isNaN(parseInt(limit))) {
    response = response.slice(0, parseInt(limit));
  }
  res.json(response);
});

app.all("*", (req, res) => {
  res.status(404).send("resource not found");
});

app.listen(3000, () => {
  console.log("server is listening...");
});
