const ContactUs = require("../models").ContactUs;
const nodemailer = require("nodemailer");
const create = async (req, res) => {
  try {
    const { firstName, surname, email, subject, message } = req.body;
    const newContact = await ContactUs.create({
      firstName,
      surname,
      email,
      subject,
      message,
    });
    return res.json(newContact);
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getAll = async (req, res) => {
  try {
    const offset = Number.parseInt(req.query.offset) || 0;
    const limit = Number.parseInt(req.query.limit) || 2;
    const allPosts = await ContactUs.findAll({
      offset: offset * limit,
      limit,
    });
    const all = await ContactUs.findAll();

    return res.json({ posts: allPosts, count: all.length });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const sendAnswer = async (req, res) => {
  try {
    const { id, email, message } = req.body;
    const question = await ContactUs.findOne({
      where: { id },
    });
    question.answer = message;
    await question.save();

    let transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "vaheemkrtchyan@gmail.com",
        pass: "yaChasNeLondone",
      },
    });
    
    await transporter.sendMail(
      {
        from: "vaheemkrtchyan@gmail.com",
        to: email,
        subject: "Verification",
        text: message,
      },
      function (error, info) {
        if (error) {
          console.log("something went wrong", error);
        } else {
          console.log("Email sent: " + info.response);
          return res.json({ success: true });
        }
      }
    );
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.body;
    await ContactUs.destroy({
      where: { id },
    });
    return res.json({ success: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

module.exports = {
  create,
  getAll,
  sendAnswer,
  deleteItem,
};
