'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HeaderInfos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titleHy: {
        type: Sequelize.STRING
      },
      titleRu: {
        type: Sequelize.STRING
      },
      titleEn: {
        type: Sequelize.STRING
      },
      descHy: {
        type: Sequelize.STRING(1234)
      },
      descRu: {
        type: Sequelize.STRING(1234)
      },
      descEn: {
        type: Sequelize.STRING(1234)
      },
      image: {
        type: Sequelize.STRING
      },
      imageTextHy: {
        type: Sequelize.STRING
      },
      imageTextRu: {
        type: Sequelize.STRING
      },
      imageTextEn: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('HeaderInfos');
  }
};