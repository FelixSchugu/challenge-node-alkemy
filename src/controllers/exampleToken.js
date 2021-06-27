import jwt from "jsonwebtoken";

export const userLogin = (req, res) => {
  const user = {
    id: 1,
    nombre: "Pedro",
    email: "pedro@gmail.com",
  };

  jwt.sign({ user: user }, "secretKey", (err, token) => {
    res.json({
      token: token,
    });
  });
};

export const pruebaDir = (req, res) => {
  jwt.verify(req.token, "secretKey", (error, authData) => {
    if (error) {
      res.send(403);
    } else {
      res.json({
        mensaje: "post fue creado",
        authData: authData,
      });
    }
  });
};

// Authorization: Bearer <token>
export const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
};
