import sequelizeInstance from "../database/database.js";
import Sequelize from "sequelize";

const Character = sequelizeInstance.define(
  "character",
  {
    image: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    age: {
      type: Sequelize.INTEGER,
    },
    weight: {
      type: Sequelize.INTEGER,
    },
    history: {
      type: Sequelize.TEXT,
    },
    movies: {
      type: Sequelize.ARRAY(Sequelize.STRING),
    },
  },
  {
    timestamps: false,
  }
);

export default Character;
