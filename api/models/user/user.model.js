const sequelize = require("sequelize");
const bcrypt = require("bcrypt-nodejs");
const constants = require("../../common/constants");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      password: {
        type: DataTypes.STRING
      },
      fullname: {
        type: DataTypes.STRING,
        require: true
      },
      phone_number: {
        type: DataTypes.STRING,
        require: true
      },
      address: {
        type: DataTypes.STRING,
        require: true
      }
    },
    {
      timestamps: true,
      underscored: true,
      freezeTableName: true,
      tableName: "user"
    }
  );

  User.associate = models => {
    models.User.belongsToMany(models.Role, {
      as: "roles",
      through: models.UserRole,
      foreignKey: "user_id"
    });
  };

  User.hook("beforeCreate", (user, options) => {
    if (user.password) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(12));
    }
    return Promise.resolve(user);
  });

  return User;
};