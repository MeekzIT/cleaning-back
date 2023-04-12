'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Info.init({
    phone: DataTypes.STRING,
    secondPhone: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    facebook: DataTypes.STRING,
    instagram: DataTypes.STRING,
    watsapp: DataTypes.STRING,
    viber: DataTypes.STRING,
    telegram: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Info',
  });
  return Info;
};