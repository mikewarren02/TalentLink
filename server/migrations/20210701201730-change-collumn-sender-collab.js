'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Collabs', 'senderId', 'userId', {
      type: Sequelize.STRING,
     
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Collabs', 'senderId', 'userId', {
      type: Sequelize.STRING,
     
    })
  }
};
