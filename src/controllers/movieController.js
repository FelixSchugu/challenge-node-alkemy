import Movies from "../models/Movies.js";
import pkg from "sequelize";
const { Op } = pkg;

export const getMovies = async (req, res) => {
  const { title, genre, order } = req.query;

  const orderSettings = order === "ASC" || order === "DESC" ? [["title", order]] : [];

  try {
    if (title || genre || order) {
      const findedMovies = await Movies.findAll({
        where: {
          [Op.and]: [title && { title: title }, genre && { genre: genre }],
        },

        order: orderSettings,
      });

      res.status(200).json({ message: "Coincidencias", data: findedMovies });
    } else {
      const movies = await Movies.findAll();
      res.send({
        message: "Lista de peliculas recibidas exitosamente",
        data: movies,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

export const createMovie = async (req, res) => {
  const { image, title, creationDate, rate, genre } = req.body;

  try {
    const newMovie = await Movies.create(
      {
        image,
        title,
        creationDate,
        rate,
        genre,
      },
      { fields: ["image", "title", "creationDate", "rate", "characters", "genre"] }
    );
    res.send({
      message: "Pelicula o serie creada correctamente",
      data: newMovie,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

export const modifyMovie = async (req, res) => {
  const { id } = req.params;
  const { image, title, creationDate, rate, genre } = req.body;

  try {
    const movies = await Movies.findOne({
      where: { id: id },
    });

    if (movies) {
      await Movies.update(
        { image, title, creationDate, rate, genre },
        { where: { id: id } }
      );
      res.json({
        message: "Pelicula o serie actualizada correctamente",
      });
    } else {
      res.json({
        message: "No se encontraron coincidencias",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

export const deleteMovie = async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await Movies.findOne({
      where: { id: id },
    });

    if (movie) {
      await Movies.destroy({ where: { id: id } });
      res.json({ message: "Película borrada correctamente" });
    } else {
      res.json({ error: "No se encontro la id de la pelicula" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
};
