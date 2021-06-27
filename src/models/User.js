import sequelizeInstance from "../database/database.js";
import Sequelize from "sequelize";

const User = sequelizeInstance.define(
  "user",
  {
    username: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },

    password: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
      },
    },
  },
  { timestamps: false }
);

export default User;
