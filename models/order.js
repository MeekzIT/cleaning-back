"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init(
    {
      userId: DataTypes.INTEGER,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      number: DataTypes.STRING,
      secondNumber: DataTypes.STRING,
      date: DataTypes.STRING,
      workerId: DataTypes.INTEGER,
      status: DataTypes.STRING,
      address: DataTypes.STRING,
      notes: DataTypes.STRING,
      area: DataTypes.STRING,
      archive: DataTypes.BOOLEAN,
      addressId: DataTypes.INTEGER,
      ourUser: DataTypes.BOOLEAN,
      paymentStatus: DataTypes.STRING,
      expectedPrice: DataTypes.STRING,
      dedactoPrice: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
      subCategoryId: DataTypes.INTEGER,
      prePay: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
