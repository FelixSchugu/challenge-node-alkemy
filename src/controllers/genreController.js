import Genre from "../models/Genre.js";

export const getGenres = async (req, res) => {
  try {
    const genres = await Genre.findAll();

    res.status(200).json({ message: "Genereos de películas", data: genres });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server internal error" });
  }
};

export const createGenre = async (req, res) => {
  const { image, title } = req.body;

  try {
    const newGenre = await Genre.create(
      { image, title },
      { fields: ["image", "title"] }
    );

    res
      .status(200)
      .json({ message: "Género creado exitosamente", data: newGenre });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const modifyGenre = async (req, res) => {
  const { id } = req.params;
  const { image, title } = req.body;

  try {
    const genre = await Genre.update({ image, title }, { where: { id: id } });

    res.status(200).json({ message: "Género modificado exitosamente" });
  } catch (erro) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteGenre = async (req, res) => {
  const { id } = req.params;

  try {
    const genre = await Genre.destroy({ where: { id: id } });
    res.status(200).json({ message: "Género eliminado exitosamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
