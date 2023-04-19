const Images = require("../models").Images;

const create = async (req, res) => {
  try {
    const { subCategoryId, image } = req.body;
    await Images.create({
      subCategoryId,
      image,
    });
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const edit = async (req, res) => {
  try {
    const { id, subCategoryId, image } = req.body;
    const item = await Images.findOne({ where: { id } });
    item.subCategoryId = subCategoryId;
    item.image = image;
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const delateItem = async (req, res) => {
  try {
    const { id } = req.body;
    await Images.destroy({ where: { id } });
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getAll = async (req, res) => {
  try {
    const offset = Number.parseInt(req.query.offset) || 0;
    const limit = Number.parseInt(req.query.limit) || 18;
    const count = await Images.findAll();

    const allItems = await Images.findAll({
      offset: offset * limit,
      limit,
    });
    return res.json({ paginateData: allItems, count: count.length });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

module.exports = {
  create,
  edit,
  delateItem,
  getAll,
};
