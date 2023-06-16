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
      startDate: DataTypes.STRING,
      endDate: DataTypes.STRING,
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

  let SubCategory = sequelize.define("SubCategory");
  let Category = sequelize.define("Category");
  let Workers = sequelize.define("Workers");
  let Addres = sequelize.define("Addres")
  Order.belongsTo(SubCategory, {
    foreignKey: "subCategoryId",
  });
  Order.belongsTo(Category, {
    foreignKey: "categoryId",
  });
  Order.belongsTo(Workers,{
    foreignKey:"workerId"
  })
  Order.belongsTo(Addres,{
    foreignKey:"addressId"
  })
  return Order;
};
