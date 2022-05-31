const Type = require("../models/recipeType");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    res.json(await new Type({ name, slug: slugify(name)}).save());
  } catch (err) {
    console.log(err);
    res.status(400).send("Create recipe type failed"); 
  }
};

exports.list = async (req, res) =>
  res.json(
    await Type.find({ status: "Active" }).sort({ createdAt: -1 }).exec()
  );

exports.read = async (req, res) => {
  let type = await Type.findOne({
    slug: req.params.slug,
    status: "Active", 
  }).exec();
  res.json(type)
};

exports.update = async (req, res) => {
  const { name, status} = req.body;
  try {
    const updated = await Type.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name), status },
      { new: true }
      );
      res.json(updated);
  } catch (err) {
    res.status(400).send("Recipe type update failed");
  }
};

exports.removeSoft = async (req, res) => {
  try {
    const deleted = await Type.findOneAndUpdate(
      { slug: req.params.slug },
      { status: "Inactive" },
      { new: true }
    );
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Recipe type delete failed");
  }
};

exports.typeCount = async (req, res) => {
  let total = await Type.find({ status: "Active" })
    .estimatedDocumentCount()
    .exec();
  res.json(total);
};
