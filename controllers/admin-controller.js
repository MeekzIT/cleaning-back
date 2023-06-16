const Admin = require("../models").Admin;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.json({
        error: ["Password and email are required fields"],
      });
    }

    const user = await Admin.findOne({
      where: { email: email.toLowerCase() },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user.id, email },
        process.env.TOKEN_KEY_ADMIN
      );
      user.token = token;
      user.save();
      return res.json(user);
    }
    return res.json({ error: ["Invalid credentials"] });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const logout = async (req, res) => {
  try {
    const user = await Admin.findOne({ where: { id: 1 } });
    user.token = null;
    await user.save();
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const changeSettings = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const user = await Admin.findOne({ where: { id } });
    user.email = email;
    user.password = password;
    user.firstName = firstName;
    user.lastName = lastName;
    await user.save();
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

module.exports = {
  login,
  logout,
  changeSettings,
};
