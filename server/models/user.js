'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Post, { as: 'posts', foreignKey: 'userId' })
      models.User.hasMany(models.Membership, { as: 'memberships', foreignKey: 'userId' })
      models.User.hasMany(models.Collab, { as: 'collabs', foreignKey: 'userId' })

    }
  };
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    profile_pic: DataTypes.STRING,
    description: DataTypes.STRING,
    isBand: DataTypes.BOOLEAN,
    area: DataTypes.STRING,
    talent: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};