'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   return queryInterface.addColumn('Users', 'isBand', {
     type: Sequelize.BOOLEAN,
    
   })
  
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'isBand', {
      type: Sequelize.BOOLEAN,
    
    })
   
  }
};
