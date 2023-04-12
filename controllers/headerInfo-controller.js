const Header = require("../models").HeaderInfo;

const edit = async (req, res) => {
  try {
    const {
      titleHy,
      titleRu,
      titleEn,
      descHy,
      descRu,
      descEn,
      image,
      imageTextHy,
      imageTextRu,
      imageTextEn,
    } = req.body;
    const item = await Header.findOne({ where: { id: 1 } });
    item.titleHy = titleHy;
    item.titleRu = titleRu;
    item.titleEn = titleEn;
    item.descHy = descHy;
    item.descRu = descRu;
    item.descEn = descEn;
    item.image = image;
    item.imageTextHy = imageTextHy;
    item.imageTextRu = imageTextRu;
    item.imageTextEn = imageTextEn;
    await item.save();
    return res.json(item);
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getAll = async (req, res) => {
  try {
    const about = await Header.findOne({
      where: { id: 1 },
    });

    return res.json(about);
  } catch (e) {
    console.log("something went wrong", e);
  }
};

module.exports = {
  edit,
  getAll,
};
