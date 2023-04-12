"use strict";
const data = require("../mock/headerInfo-mock");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("HeaderInfos", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("HeaderInfos", null, {});
  },
};
