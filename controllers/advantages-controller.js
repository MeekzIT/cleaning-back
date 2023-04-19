const Advantages = require("../models").Advantages;

const create = async (req, res) => {
  try {
    const { subCategoryId, textHy, textRu, textEn } = req.body;

    await Advantages.create({
      subCategoryId,
      textHy,
      textRu,
      textEn,
    });

    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const delateItem = async (req, res) => {
  try {
    const { id } = req.body;

    const city = await Advantages.findOne({
      where: { id },
    });
    await city.destroy();
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const edit = async (req, res) => {
  try {
    const { id, subCategoryId, textHy, textRu, textEn } = req.body;

    const city = await Advantages.findOne({
      where: { id },
    });
    city.subCategoryId = subCategoryId;
    city.textHy = textHy;
    city.textRu = textRu;
    city.textEn = textEn;
    await city.save();
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getAll = async (req, res) => {
  try {
    const { id } = req.query;
    const cityes = await Advantages.findAll({
      where: { subCategoryId: id },
    });
    return res.json(cityes);
  } catch (e) {
    console.log("something went wrong", e);
  }
};

module.exports = {
  getAll,
  create,
  edit,
  delateItem,
};
