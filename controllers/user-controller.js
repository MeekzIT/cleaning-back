const Users = require("../models").User;
const Addres = require("../models").Addres;
const City = require("../models").City;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const create = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber } = req.body;
    const oldUser = await Users.findOne({
      where: { email },
    });
    if (oldUser) {
      return res.json({ message: "alredy exist" });
    } else {
      let encryptedPassword = await bcrypt.hash(password, 10);
      await Users.create({
        firstName,
        lastName,
        email: email.toLowerCase(),
        phoneNumber,
        password: encryptedPassword,
      });

      return res.json({ succes: true });
    }
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.json({
        error: ["Password and email are required fields"],
      });
    }

    const user = await Users.findOne({
      where: { email: email.toLowerCase() },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user.id, email },
        process.env.TOKEN_KEY
      );
      user.token = token;
      user.save();
      return res.json({ succes: true, data: user });
    }
    return res.json({ error: ["Invalid credentials"] });
  } catch (err) {
    return res.json({ error: ["Error"] });
  }
};

const logout = async (req, res) => {
  try {
    const { user_id } = req.user;
    const user = await Users.findOne({ where: { id: user_id } });
    user.token = null;
    await user.save();
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const editAccount = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber } = req.body;
    const { user_id } = req.user;
    const user = await Users.findOne({
      where: { id: user_id },
    });

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email.toLowerCase();
    user.phoneNumber = phoneNumber;
    await user.save();

    return res.json(user);
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const changePassword = async (req, res) => {
  try {
    const { password } = req.body;
    const { user_id } = req.user;
    const user = await Users.findOne({
      where: { id: user_id },
    });
    let encryptedPassword = await bcrypt.hash(password, 10);
    user.password = encryptedPassword;
    await user.save();

    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const changeAvatar = async (req, res) => {
  try {
    const { image } = req.body;
    const { user_id } = req.user;
    const user = await Users.findOne({
      where: { id: user_id },
    });
    user.image = image;
    await user.save();

    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

//admin controllers

const getAll = async (req, res) => {
  const { search } = req.query;
  const offset = Number.parseInt(req.query.offset) || 0;
  const limit = Number.parseInt(req.query.limit) || 6;
  const count = await Users.findAll();
  let queryObj = {};
  if (search) {
    queryObj["phoneNumber"] = {
      [Op.like]: "%" + String(search) + "%",
    };
  }
  try {
    const allUsers = await Users.findAll({
      where: {
        ...queryObj,
      },
      offset: offset * limit,
      limit,
      include: [
        {
          model: Addres,
          include: [City],
        },
      ],
    });
    return res.json({ paginateData: allUsers, count: count.length });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getSingle = async (req, res) => {
  try {
    const { user_id } = req.user;
    if (user_id) {
      const user = await Users.findOne({
        where: { id: user_id },
        include: [
          {
            model: Addres,
            include: [City],
          },
        ],
      });
      return res.json(user);
    } else return res.json(true);
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const delateAccount = async (req, res) => {
  try {
    const { id } = req.body;

    const user = await Users.findOne({ where: { id } });
    await user.destroy();
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

module.exports = {
  create,
  login,
  logout,
  changeAvatar,
  editAccount,
  changeAvatar,
  changePassword,
  getAll,
  getSingle,
  delateAccount,
};
