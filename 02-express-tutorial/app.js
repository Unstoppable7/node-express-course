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
  const idToFind = Number(req.params.productID);
  const product = products.find((p) => p.id === idToFind);
  if (!product) {
    return res.status(404).send("Product does not exist");
  }
  return res.json(product);
});

app.get("/api/v1/query", (req, res) => {
  let response = [...products];

  const { search, limit, regex, priceGreaterThan, priceLessThan } = req.query;
  if (search) {
    response = response.filter((p) => p.name.includes(search));
  }
  if (limit) {
    response = response.slice(0, Number(limit));
  }
  if (regex) {
    try {
      let regexObj = new RegExp(regex);
      response = response.filter((p) => regexObj.test(p.name));
    } catch (e) {
      return res
        .status(200)
        .json({ sucess: true, message: "Invalid regex", data: [] });
    }
  }
  if (priceGreaterThan) {
    response = products.filter((p) => p.price > Number(priceGreaterThan));
  }
  if (priceLessThan) {
    response = products.filter((p) => p.price < Number(priceLessThan));
  }
  if (response.length < 1) {
    return res.status(200).json({
      sucess: true,
      message: "No products matched your search",
      data: [],
    });
  }
  res.status(200).json(response);
});

app.all("*", (req, res) => {
  res.status(404).send("resource not found");
});

app.listen(3000, () => {
  console.log("server is listening...");
});
