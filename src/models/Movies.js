import sequelizeInstance from "../database/database.js";
import Sequelize from "sequelize";

const Movies = sequelizeInstance.define(
  "movies",
  //Son las peliculas o series donde aparece el personaje
  {
    image: {
      type: Sequelize.STRING,
    },
    title: {
      type: Sequelize.STRING,
    },
    creationDate: {
      type: Sequelize.DATE,
    },
    rate: {
      type: Sequelize.INTEGER,
    },
    characters: {
      type: Sequelize.ARRAY(Sequelize.STRING),
    },
    genre: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
);

export default Movies;
