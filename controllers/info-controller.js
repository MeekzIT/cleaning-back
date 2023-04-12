const Info = require("../models").Info;

const edit = async (req, res) => {
  try {
    const {
        phone,
        secondPhone,
        email,
        address,
        facebook,
        instagram,
        watsapp,
        viber,
        telegram
    } = req.body;
    const item = await Info.findOne({ where: { id: 1 } });
    item.phone = phone;
    item.secondPhone = secondPhone;
    item.email = email;
    item.address = address;
    item.facebook = facebook;
    item.instagram = instagram;
    item.watsapp = watsapp;
    item.viber = viber;
    item.telegram = telegram;
    await item.save();
    return res.json(item);
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getAll = async (req, res) => {
  try {
    const about = await Info.findOne({
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
