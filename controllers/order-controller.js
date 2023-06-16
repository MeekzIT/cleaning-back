const Order = require("../models").Order;
const Users = require("../models").User;
const Addres = require("../models").Addres;
const Category = require("../models").Category;
const SubCategory = require("../models").SubCategory;
const Workers = require("../models").Workers;
const { Op } = require("sequelize");

const create = async (req, res) => {
  try {
    const {
      userId,
      firstName,
      lastName,
      email,
      number,
      secondNumber,
      date,
      address,
      notes,
      area,
      addressId,
      ourUser,
      categoryId,
      subCategoryId,
      prePay,
    } = req.body;
    const category = await SubCategory.findOne({
      where: {
        categoryId,
        id: subCategoryId,
      },
    });
    if (ourUser) {
      const user = await Users.findOne({
        where: { id: userId },
      });
      const addres = await Addres.findOne({
        where: { id: addressId },
      });
      if (prePay) {
      } else {
        await Order.create({
          userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          number: user.phoneNumber,
          secondNumber: user.phoneNumber,
          startDate:date,
          endDate:
            date.slice(0, 12) +
            String(Number(date.slice(12, 13)) + 1) +
            date.slice(13, 16),
          workerId: 0,
          status: "new",
          address: "null",
          notes,
          area: addres.area,
          archive: false,
          addressId,
          ourUser: true,
          paymentStatus: "null",
          expectedPrice: String(Number(addres.area) * Number(category.price)),
          dedactoPrice: "null",
          categoryId,
          subCategoryId,
          prePay: false,
        });
      }
      return res.json({ succes: true });
    } else {
      if (prePay) {
      } else {
        await Order.create({
          userId: 0,
          firstName,
          lastName,
          email,
          number,
          secondNumber,
          startDate:date,
          endDate:
            date.slice(0, 12) +
            String(Number(date.slice(12, 13)) + 1) +
            date.slice(13, 16),
          workerId: 0,
          status: "new",
          address,
          notes,
          area,
          archive: false,
          addressId: 0,
          ourUser,
          paymentStatus: "new",
          expectedPrice: String(Number(area) * Number(category.price)),
          dedactoPrice: "null",
          categoryId,
          subCategoryId,
          prePay: false,
        });
      }
      return res.json({ succes: true });
    }
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const assigneeToWorker = async (req, res) => {
  try {
    const { orderId, workerId } = req.body;
    const order = await Order.findOne({ where: { id: orderId } });
    const worker = await Workers.findOne({
      where: { id: workerId },
    });
    order.workerId = workerId;
    order.status = worker.firstName.toString();
    await order.save();
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const setArchive = async (req, res) => {
  try {
    const { id, val } = req.body;
    const order = await Order.findOne({ where: { id } });
    order.archive = val;
    await order.save();
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const ChangeDefacto = async (req, res) => {
  try {
    const { id, val } = req.body;
    const order = await Order.findOne({ where: { id } });
    order.dedactoPrice = val;
    await order.save();
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const finishOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findOne({ where: { id: orderId } });
    order.status = "finish";
    order.archive = true;
    await order.save();
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const delOrder = async (req, res) => {
  try {
    const { id } = req.body;
    const order = await Order.findOne({ where: { id } });
    await order.destroy();
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

const getAll = async (req, res) => {
  try {
    const { search } = req.query;
    const offset = Number.parseInt(req.query.offset) || 0;
    const limit = Number.parseInt(req.query.limit) || 16;
    let queryObj = {};
    if (search) {
      let searchedItems = JSON.parse(search);
      if (searchedItems.status)
        queryObj.status = { [Op.eq]: searchedItems.status };

      if (searchedItems.categoryId)
        queryObj.categoryId = { [Op.eq]: searchedItems.categoryId };

      if (
        String(searchedItems.ourUser).length === 4 ||
        String(searchedItems.ourUser).length === 5
      )
        queryObj.ourUser = { [Op.eq]: searchedItems.ourUser };

      if (searchedItems.number)
        queryObj.number = { [Op.like]: `%${searchedItems.number}%` };

      if (searchedItems.archive)
        queryObj.archive = { [Op.eq]: searchedItems.archive };
      console.log(queryObj);
    }
    const count = await Order.findAll({
      where: {
        ...queryObj,
      },
    });
    const allItems = await Order.findAll({
      where: {
        ...queryObj,
      },
      offset: offset * limit,
      limit,
      include: [
        {
          model: Category,
        },
        {
          model: SubCategory,
        },
        {
          model: Workers,
        },
      ],
    });
    return res.json({ paginateData: allItems, count: count.length });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

module.exports = {
  create,
  assigneeToWorker,
  finishOrder,
  getAll,
  delOrder,
  setArchive,
  ChangeDefacto,
};
