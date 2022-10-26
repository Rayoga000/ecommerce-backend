const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const usersRoute = require("./routes/user");
const productsRoute = require("./routes/product");
const cartRoute = require("./routes/cart");

//app configurations
dotenv.config();

//app variables
const app = express();
const PORT = process.env.PORT || 8000;

//express middlewares
app.use(express.json());

//app middlewars
app.use("/api/users", usersRoute);
app.use("/api/products", productsRoute);
app.use("/api/cart", cartRoute);

//connecting to the DB
const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URL);
};
connectDB();

//listening on port 8000
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
