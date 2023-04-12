'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HeaderInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HeaderInfo.init({
    titleHy: DataTypes.STRING,
    titleRu: DataTypes.STRING,
    titleEn: DataTypes.STRING,
    descHy: DataTypes.STRING(1234),
    descRu: DataTypes.STRING(1234),
    descEn: DataTypes.STRING(1234),
    image: DataTypes.STRING,
    imageTextHy: DataTypes.STRING,
    imageTextRu: DataTypes.STRING,
    imageTextEn: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'HeaderInfo',
  });
  return HeaderInfo;
};