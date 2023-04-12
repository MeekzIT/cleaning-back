const SubCategory = require("../models").SubCategory;

const create = async (req, res) => {
  try {
    const {
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

    await SubCategory.create({
      categoryId,
      nameHy,
      nameRu,
      nameEn,
      mainImage,
      descHy,
      descRu,
      descEn,
      price,
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
    category.nameHy = nameHy;
    category.nameRu = nameRu;
    category.nameEn = nameEn;
    category.mainImage = mainImage;
    category.descHy = descHy;
    category.descRu = descRu;
    category.descEn = descEn;
    category.price = price;
    await category.save();
    return res.json({ succes: true });
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

module.exports = {
  create,
  editSubCategory,
};
