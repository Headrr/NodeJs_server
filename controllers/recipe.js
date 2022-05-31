const Recipe = require("../models/recipe");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const newRecipe = await new Recipe(req.body).save();
    res.json(newRecipe);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
      code: err.code,
    });
  }
};

exports.recipesCount = async (req, res) => {
  let total = await Recipe.find({ status: "Active" }).estimatedDocumentCount().exec();
  res.json(total);
};

exports.listAll = async (req, res) => {
  let recipes = await Recipe.find({ status: "Active" })
    .limit(parseInt(req.params.count))
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(recipes);
};

exports.removeSoft = async (req, res) => {
  try {
    const deleted = await Recipe.findOneAndUpdate(
      {
        slug: req.params.slug,
      },
      { status: "Inactive" },
      { new: true }
    ).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Recipe deleted failed");
  }
};

exports.read = async (req, res) => {
  const recipe = await Recipe.findOne({
    slug: req.params.slug,
    status: "Active",
  }).exec();
  res.json(recipe);
};

exports.update = async (req, res) => {
  const { name, status} = req.body;
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updated = await Recipe.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name), status },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log("RECIPE UPDATE ERR ---->", err);
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.list = async (req, res) => {
  console.table(req.body);
  try {
    const { sort, order, page } = req.body;
    const currentPage = page | 1;
    const perPage = 3;

    const recipes = await Recipe.find({ status: "Active" })
      .skip((currentPage - 1) * perPage)
      .sort([[sort, order]])
      .limit(perPage)
      .exec();
    res.json(recipes);
  } catch (err) {
    console.log(err);
  }
};