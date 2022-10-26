const mongoose = require("mongoose");
const Joi = require("joi");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, require: true },
    price: { type: Number, required: true },
    image: { type: String, default: "" },
    categories: { type: Array, default: [] },
    size: { type: String, default: "" },
    color: { type: String, default: "" },
  },
  { timestamps: true }
);

const validateProduct = (product) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    image: Joi.string(),
    categories: Joi.array(),
    size: Joi.string(),
    color: Joi.string(),
  });
  return schema.validate(product);
};

const Product = mongoose.model("Product", productSchema);
module.exports = { Product, validateProduct };
