const Addres = require("../models").Addres;

const create = async (req, res) => {
  try {
    const { userId, city, street, home, floor, notes } = req.body;

    await Addres.create({
      userId,
      city,
      street,
      home,
      floor,
      notes,
    });

    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const delateAddres = async (req, res) => {
  try {
    const { id } = req.body;

    const addres = await Addres.findOne({
      where: { id },
    });
    await addres.destroy();
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const editAddres = async (req, res) => {
  try {
    const { id, city, street, home, floor, notes } = req.body;

    const addres = await Addres.findOne({
      where: { id },
    });
    addres.city = city;
    addres.street = street;
    addres.home = home;
    addres.floor = floor;
    addres.notes = notes;
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
