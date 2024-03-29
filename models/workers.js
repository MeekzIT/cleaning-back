"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Workers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Workers.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      number: DataTypes.STRING,
      secondNumber: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Workers",
    }
  );

  let Order = sequelize.define("Order");
  Workers.belongsTo(Order, {
    foreignKey: "id",
  });

  return Workers;
};
