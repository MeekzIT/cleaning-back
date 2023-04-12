"use strict";
const data = require("../mock/subCategory-mock");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("SubCategories", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("SubCategories", null, {});
  },
};
