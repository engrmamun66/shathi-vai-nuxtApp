'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Users', [
      {
      username: 'Mamun',
      password: 'asdf',
      email: 'dev1@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'Hasinur Rahman',
      password: 'Doe',
      email: 'dev1@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'John',
      password: 'Doe',
      email: 'dev1@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'John',
      password: 'Doe',
      email: 'dev1@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
