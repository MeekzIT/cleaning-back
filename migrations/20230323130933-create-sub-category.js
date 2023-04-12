"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("SubCategories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      categoryId: {
        type: Sequelize.INTEGER,
      },
      naemHy: {
        type: Sequelize.STRING,
      },
      nameRu: {
        type: Sequelize.STRING,
      },
      nameEn: {
        type: Sequelize.STRING,
      },
      mainImage: {
        type: Sequelize.STRING,
      },
      descHy: {
        type: Sequelize.STRING(1234),
      },
      descRu: {
        type: Sequelize.STRING(1234),
      },
      descEn: {
        type: Sequelize.STRING(1234),
      },
      price: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("SubCategories");
  },
};
