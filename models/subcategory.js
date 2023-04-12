"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SubCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SubCategory.init(
    {
      categoryId: DataTypes.INTEGER,
      naemHy: DataTypes.STRING,
      nameRu: DataTypes.STRING,
      nameEn: DataTypes.STRING,
      mainImage: DataTypes.STRING,
      descHy: DataTypes.STRING(1234),
      descRu: DataTypes.STRING(1234),
      descEn: DataTypes.STRING(1234),
      price: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "SubCategory",
    }
  );

  let Category = sequelize.define("Category");
  SubCategory.belongsTo(Category, {
    foreignKey: "id",
  });

  return SubCategory;
};
