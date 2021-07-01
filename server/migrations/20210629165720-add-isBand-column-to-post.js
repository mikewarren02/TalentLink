'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Posts', 'isBand', {
      type: Sequelize.BOOLEAN,
     
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Posts', 'isBand', {
      type: Sequelize.BOOLEAN,
     
    })
  }
};
