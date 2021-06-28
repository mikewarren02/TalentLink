'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'talent', {
      type: Sequelize.STRING,
     
    })
   
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'talent', {
      type: Sequelize.STRING,
     
    })
   
  }
};
