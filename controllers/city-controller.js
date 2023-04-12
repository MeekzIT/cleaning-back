const City = require("../models").City;

const create = async (req, res) => {
  try {
    const { nameHy, nameRu, nameEn } = req.body;

    await City.create({
      nameHy,
      nameRu,
      nameEn,
    });

    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const delateCity = async (req, res) => {
  try {
    const { id } = req.body;

    const city = await City.findOne({
      where: { id },
    });
    await city.destroy();
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const editCity = async (req, res) => {
  try {
    const { id, nameHy, nameRu, nameEn } = req.body;

    const city = await City.findOne({
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
    const cityes = await City.findAll();
    return res.json(cityes);
  } catch (e) {
    console.log("something went wrong", e);
  }
};

module.exports = {
  getAll,
  create,
  editCity,
  delateCity,
};
