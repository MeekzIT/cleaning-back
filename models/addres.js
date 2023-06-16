"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Addres extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Addres.init(
    {
      userId: DataTypes.INTEGER,
      city: DataTypes.INTEGER,
      street: DataTypes.STRING,
      home: DataTypes.STRING,
      floor: DataTypes.STRING,
      notes: DataTypes.STRING,
      area:DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Addres",
    }
  );

  let Users = sequelize.define("User");
  let City = sequelize.define("City");
  let Order = sequelize.define("Order")
  Addres.belongsTo(Users, {
    foreignKey: "id",
  });
  Addres.belongsTo(City, {
    foreignKey: "city",
  });
  Addres.belongsTo(Order,{
    foreignKey:"id"
  })
  return Addres;
};
