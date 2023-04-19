"use strict";
const data = require("../mock/images-mock");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Images", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Images", null, {});
  },
};
