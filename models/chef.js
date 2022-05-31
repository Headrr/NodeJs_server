const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const chefSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      default: "chef",
    },
    cart: {
      type: Array,
      default: [],
    },
    address: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chef", chefSchema);
