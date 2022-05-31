const Origin = require("../models/recipeOrigin");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    res.json(await new Origin({ name, slug: slugify(name) }).save());
  } catch (err) {
    console.log(err);
    res.status(400).send("Create recipe origin failed");
  }
};

exports.listOrigin = async (req, res) => {
  console.table(req.body);
  try {
    const { sort, order, page } = req.body;
    const currentPage = page | 1;
    const perPage = 3;

    const origins = await Origin.find({ status: "Active"})
      .skip((currentPage - 1) * perPage)
      .sort([[sort, order]])
      .limit(perPage)
      .exec();
    res.json(origins);
  } catch (err) {
    console.log(err);
  }
};

exports.read = async (req, res) => {
  let origin = await Origin.findOne({
    slug: req.params.slug,
    status: "Active",
  }).exec();
  res.json(origin);
};

exports.update = async (req, res) => {
  const { name, status } = req.body;
  try {
    const updated = await Origin.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name), status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Recipe origin update failed");
  }
};

exports.removeSoft = async (req, res) => {
  try {
    const deleted = await Origin.findOneAndUpdate(
      { slug: req.params.slug },
      { status: "Inactive" },
      { new: true }
    );
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Recipe origin delete failed");
  }
};

exports.originCount = async (req, res) => {
  let total = await Origin.find({ status: "Active" })
    .estimatedDocumentCount()
    .exec();
  res.json(total);
};
