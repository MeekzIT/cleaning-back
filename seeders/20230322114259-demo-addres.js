"use strict";
const data = require("../mock/address-mock");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Addres", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Addres", null, {});
  },
};
