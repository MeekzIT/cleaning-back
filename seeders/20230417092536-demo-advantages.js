"use strict";
const data = require("../mock/advantages-mock");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Advantages", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Advantages", null, {});
  },
};
