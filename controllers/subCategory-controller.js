const SubCategory = require("../models").SubCategory;
const Category = require("../models").Category;

const create = async (req, res) => {
  try {
    const {
      categoryId,
      naemHy,
      nameRu,
      nameEn,
      mainImage,
      descHy,
      descRu,
      descEn,
      price,
      withArea
    } = req.body;

    await SubCategory.create({
      categoryId,
      naemHy,
      nameRu,
      nameEn,
      mainImage,
      descHy,
      descRu,
      descEn,
      price,
      withArea
    });

    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const editSubCategory = async (req, res) => {
  try {
    const {
      id,
      categoryId,
      nameHy,
      nameRu,
      nameEn,
      mainImage,
      descHy,
      descRu,
      descEn,
      price,
    } = req.body;

    const category = await SubCategory.findOne({
      where: { id },
    });
    category.categoryId = categoryId;
    category.naemHy = nameHy;
    category.nameRu = nameRu;
    category.nameEn = nameEn;
    category.mainImage = mainImage;
    category.descHy = descHy;
    category.descRu = descRu;
    category.descEn = descEn;
    category.price = price;
    await category.save();
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

const delateCategory = async (req, res) => {
  //todo delate all child subcategorys
  try {
    const { id } = req.body;

    const category = await SubCategory.findOne({
      where: { id },
    });
    await category.destroy();
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getSingle = async (req, res) => {
  try {
    const { id } = req.query;
    const data = await SubCategory.findOne({
      where: { id },
    });
    return res.json(data);
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getAll = async (req, res) => {
  try {
    const data = await SubCategory.findAll();
    return res.json(data);
  } catch (e) {
    console.log("something went wrong", e);
  }
};

module.exports = {
  create,
  editSubCategory,
  getSingle,
  getAll,
  delateCategory,
};
