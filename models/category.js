"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Category.init(
    {
      naemHy: DataTypes.STRING,
      nameRu: DataTypes.STRING,
      nameEn: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Category",
    }
  );

  let SubCategory = sequelize.define("SubCategory");
  let Order = sequelize.define("Order");
  Category.hasMany(SubCategory, {
    foreignKey: "categoryId",
  });
  Category.belongsTo(Order, {
    foreignKey: "id",
  });
  return Category;
};
