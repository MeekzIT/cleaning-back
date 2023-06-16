const Addres = require("../models").Addres;

const create = async (req, res) => {
  try {
    const { city, street, home, floor, notes, area } = req.body;
    const { user_id } = req.user;

    await Addres.create({
      userId: user_id,
      city,
      street,
      home,
      floor,
      notes,
      area,
    });
    const data = await Addres.findOne({ where: { userId: user_id } });
    return res.json(data);
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const delateAddres = async (req, res) => {
  try {
    const { id } = req.body;
    const { user_id } = req.user;
    const addres = await Addres.findOne({
      where: { id },
    });
    await addres.destroy();
    const data = await Addres.findOne({ where: { userId: user_id } });
    return res.json(data);
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const editAddres = async (req, res) => {
  try {
    const { id, city, street, home, floor, notes, area } = req.body;

    const addres = await Addres.findOne({
      where: { id },
    });
    addres.city = city;
    addres.street = street;
    addres.home = home;
    addres.floor = floor;
    addres.notes = notes;
    addres.area = area;
    await addres.save();
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

module.exports = {
  create,
  delateAddres,
  editAddres,
};
