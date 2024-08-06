//Script para agregar de manera automatica muchos datos a la base de datos

require("dotenv").config();

const connectDB = require("./db/connect");
const Product = require("./models/product");

const jsonProducts = require("./products.json");

const start = async () => {
   try {
      await connectDB(process.env.MONGO_URI);
      await Product.deleteMany();
      await Product.create(jsonProducts);
      process.exit(0);
   } catch (error) {
      console.log(error);
   }
};

start();
