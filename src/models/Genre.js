import sequelizeInstance from "../database/database.js";
import Sequelize from "sequelize";

const Genre = sequelizeInstance.define(
  "genre",
  {
    name: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
  },
  { timestamps: false }
);

export default Genre;
