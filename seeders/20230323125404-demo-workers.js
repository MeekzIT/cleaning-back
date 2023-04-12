"use strict";
const data = require("../mock/workers-mock");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Workers", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Workers", null, {});
  },
};
