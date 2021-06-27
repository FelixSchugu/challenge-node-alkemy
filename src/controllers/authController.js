import bcryptjs from "bcryptjs";
import User from "./../models/User.js";
import pkg from "sequelize";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey("insertar api key aqui");

const { Op } = pkg;

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userExists = await User.findOne({
      where: { username: username },
    });

    if (userExists) {
      const compare = bcryptjs.compareSync(password, userExists.password);

      if (compare) {
        res.status(200).json({ message: "Inicio de sesión exitoso" });
      } else {
        res.status(403).json({ message: "Contraseña incorrecta" });
      }
    } else {
      res.status(403).json({ message: "Ingrese bien las credenciales" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const msg = {
    to: email,
    from: "horaciochuru@gmail.com",
    subject: "Bienvenido a la api de disney!!",
    text: "Usted se a registrado con exito",
    html: "<strong>Hola mundo</strong>",
  };

  try {
    const dataExists = await User.findOne({
      where: {
        [Op.or]: [{ username: username }, { email: email }],
      },
    });

    if (dataExists) {
      res
        .status(403)
        .json({ error: "Ya existe un usuario o email registrado" });
    } else {
      const passwordHash = await bcryptjs.hash(password, 8);
      const newUser = await User.create(
        {
          username: username,
          email: email,
          password: passwordHash,
        },
        { fields: ["username", "email", "password"] }
      );

      sgMail
        .send(msg)
        .then((response) => {
          console.log(response[0].statusCode);
          console.log(response[0].headers);
        })
        .catch((error) => {
          console.error("error:", error.response.body);
        });

      res.json({ message: "Cuenta creada exitosamente" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
