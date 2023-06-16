const Workers = require("../models").Workers;

const create = async (req, res) => {
  try {
    const { firstName, lastName, number } = req.body;

    await Workers.create({
      firstName,
      lastName,
      number,
      active: true,
    });
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const deleateWorker = async (req, res) => {
  try {
    const { id } = req.body;

    const worker = await Workers.findOne({
      where: { id },
    });
    await worker.destroy();
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const editWorker = async (req, res) => {
  try {
    const { id, firstName, lastName, number, active } = req.body;

    const worker = await Workers.findOne({
      where: { id },
    });
    worker.firstName = firstName;
    worker.lastName = lastName;
    worker.number = number;
    worker.active = active;
    await worker.save();
    const count = await Workers.findAll();
    return res.json({ paginateData: count });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getAll = async (req, res) => {
  const { search, active } = req.query;
  const offset = Number.parseInt(req.query.offset) || 0;
  const limit = Number.parseInt(req.query.limit) || 6;
  const count = await Workers.findAll();
  let queryObj = {};
  if (search) {
    queryObj["number"] = {
      [Op.like]: "%" + String(search) + "%",
    };
  }
  if (active) {
    queryObj["active"] = {
      active,
    };
  }

  try {
    const allUsers = await Workers.findAll({
      where: {
        ...queryObj,
      },
      offset: offset * limit,
      limit,
    });
    return res.json({ paginateData: allUsers, count: count.length });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getSingle = async (req, res) => {
  try {
    const { id } = req.body;

    const worker = await Workers.findOne({
      where: { id },
    });
    return res.json(worker);
  } catch (e) {
    console.log("something went wrong", e);
  }
};

module.exports = {
  create,
  deleateWorker,
  editWorker,

  getAll,
  getSingle,
};
