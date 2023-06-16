"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      number: {
        type: Sequelize.STRING,
      },
      secondNumber: {
        type: Sequelize.STRING,
      },
      startDate: {
        type: Sequelize.STRING,
      },
      endDate: {
        type: Sequelize.STRING,
      },
      workerId: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      notes: {
        type: Sequelize.STRING,
      },
      area: {
        type: Sequelize.STRING,
      },
      archive: {
        type: Sequelize.BOOLEAN,
      },
      addressId: {
        type: Sequelize.INTEGER,
      },
      ourUser: {
        type: Sequelize.BOOLEAN,
      },
      paymentStatus: {
        type: Sequelize.STRING,
      },
      expectedPrice: {
        type: Sequelize.STRING,
      },
      dedactoPrice: {
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
      categoryId: {
        type: Sequelize.INTEGER,
      },
      subCategoryId: {
        type: Sequelize.INTEGER,
      },
      prePay: {
        type: Sequelize.BOOLEAN,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Orders");
  },
};
