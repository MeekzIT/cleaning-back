const { get } = require("../routes");

const Category = require("../models").Category;
const SubCategory = require("../models").SubCategory;

const create = async (req, res) => {
  try {
    const { nameHy, nameRu, nameEn } = req.body;

    await Category.create({
      nameHy,
      nameRu,
      nameEn,
    });

    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const delateCategory = async (req, res) => {
  //todo delate all child subcategorys
  try {
    const { id } = req.body;

    const city = await Category.findOne({
      where: { id },
    });
    await city.destroy();
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const editCategory = async (req, res) => {
  try {
    const { id, nameHy, nameRu, nameEn } = req.body;

    const city = await Category.findOne({
      where: { id },
    });
    city.nameHy = nameHy;
    city.nameRu = nameRu;
    city.nameEn = nameEn;
    await city.save();
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getAll = async (req, res) => {
  try {
    const cityes = await Category.findAll({
      include: [
        {
          model: SubCategory,
        },
      ],
    });
    return res.json(cityes);
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getSingle = async (req, res) => {
  try {
    const { id } = req.query;
    const cityes = await Category.findOne({
      where: { id },
      include: [
        {
          model: SubCategory,
        },
      ],
    });
    return res.json(cityes);
  } catch (e) {
    console.log("something went wrong", e);
  }
};

module.exports = {
  getAll,
  create,
  editCategory,
  delateCategory,
  getSingle,
};
