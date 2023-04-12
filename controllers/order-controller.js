const Order = require("../models").Order;
const Users = require("../models").User;
const Addres = require("../models").Addres;
const SubCategory = require("../models").SubCategory;
const Workers = require("../models").Workers;

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
        where: { id: ourUser },
      });
      const addres = await Addres.findOne({
        where: { id: addressId },
      });

      if (prePay) {
        // await Order.create({
        //   userId,
        //   firstName: user.firstName,
        //   lastName: user.lastName,
        //   email: user.email,
        //   number: user.phoneNumber,
        //   secondNumber: user.phoneNumber,
        //   date,
        //   workerId: null,
        //   status: "new",
        //   address: null,
        //   notes,
        //   area: addres.area,
        //   archive: false,
        //   addressId,
        //   ourUser: true,
        //   paymentStatus: "new",
        //   expectedPrice: String(Number(addres.area) * Number(category.price)),
        //   dedactoPrice: null,
        //   categoryId,
        //   subCategoryId,
        //   prePay,
        // });
      } else {
        await Order.create({
          userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          number: user.phoneNumber,
          secondNumber: user.phoneNumber,
          date,
          workerId: "null",
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
        // await Order.create({
        //   userId,
        //   firstName,
        //   lastName,
        //   email,
        //   number,
        //   secondNumber,
        //   date,
        //   workerId: null,
        //   status: "new",
        //   address,
        //   notes,
        //   area,
        //   archive: false,
        //   addressId,
        //   ourUser,
        //   paymentStatus: null,
        //   expectedPrice,
        //   dedactoPrice,
        //   categoryId,
        //   subCategoryId,
        //   prePay,
        // });
      } else {
        await Order.create({
          userId,
          firstName,
          lastName,
          email,
          number,
          secondNumber,
          date,
          workerId: "null",
          status: "new",
          address,
          notes,
          area,
          archive: false,
          addressId,
          ourUser,
          paymentStatus: "new",
          expectedPrice: String(Number(addres.area) * Number(category.price)),
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

//toDo getOrders

const getAll = async (req, res) => {
  try {
    return res.json({ succes: true });
  } catch (e) {
    console.log("something went wrong", e);
  }
};

module.exports = {
  create,
  assigneeToWorker,
  finishOrder,
  getAll,
};
