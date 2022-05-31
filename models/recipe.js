const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
      text: true,
    },
    servings: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32,
    },
    time: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32,
    },
    type: {
      type: ObjectId,
      ref: "RecipeType",
    },
    images: {
      type: Array,
    },
    label: {
      type: String,
      enum: ["Desayuno", "Almuerzo", "Cena", "Merienda", "Cóctel", "Comida rápida", "Ensalada"],
    },
    origin: {
      type: ObjectId,
      ref: "RecipeOrigin",
      // enum: ["Chile", "Perú", "Francia", "España", "Italia", "China", "Egipto"],
    },
    preparation: {
      type: String,
      required: true,
      maxlength: 4000,
      text: true,
    },
    status: {
      type: String,
      default: "Active",
      enum: ["Active", "Inactive"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", recipeSchema);
