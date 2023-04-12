"use strict";
const data = require("../mock/city-mock");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Cities", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Cities", null, {});
  },
};
