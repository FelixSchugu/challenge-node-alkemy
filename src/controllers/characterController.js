import Character from "../models/character.js";
import pkg from "sequelize";
const { Op } = pkg;

export const getCharacters = async (req, res) => {
  const { name, age, movies } = req.query;

  try {
    if (name || age || movies) {
      const findedCharacters = await Character.findAll({
        where: {
          [Op.and]: [
            name && { name: name },
            age && { age: age },
            movies && { movies: movies },
          ],
        },
      });
      res
        .status(200)
        .json({ message: "Coincidencias", data: findedCharacters });
    } else {
      const characters = await Character.findAll({
        attributes: ["image", "name"],
      });

      res.json({ message: "Todos los personajes", data: characters });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error", message: error });
  }
};

export const findCharacters = (req, res) => {
  const { name, age, movies } = req.query;

  console.log(req.query);

  res.json({ data: req.query });
};

export const createCharacter = async (req, res) => {
  const { image, name, age, weight, history } = req.body;

  try {
    const newCharacter = await Character.create(
      {
        image,
        name,
        age,
        weight,
        history,
      },
      { fields: ["image", "name", "age", "weight", "history"] }
    );

    res.json({ message: "Character created successfully", data: newCharacter });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error", message: error });
  }

  res.json({ image, name, age, weight, history });
};
export const modifyCharacter = async (req, res) => {
  const { id } = req.params;
  const { image, name, age, weight, history } = req.body;

  try {
    const character = await Character.findOne({ where: { id: id } });

    if (character) {
      await Character.update(
        { image, name, age, weight, history },
        { where: { id: id } }
      );

      res.json({ message: "Personaje modificado exitosamente" });
    } else {
      res.json({ message: "No se encontró el personaje" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error", message: error });
  }
};

export const deleteCharacter = async (req, res) => {
  const { id } = req.params;
  try {
    const character = await Character.findOne({ where: { id: id } });

    if (character) {
      Character.destroy({ where: { id: id } });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error", message: error });
  }
};
