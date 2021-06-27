import express, { json } from "express";
import morgan from "morgan";
import moviesRouter from "./routes/moviesRoutes.js";
import characterRouter from "./routes/characterRoutes.js";
import authRouter from "./routes/authRoutes.js";
import genreRouter from "./routes/genresRoutes.js";
import Character from "./models/Character.js";
import Genre from "./models/Genre.js";
import Movies from "./models/Movies.js";
import User from "./models/User.js";

const app = express();

// creación de tablas mediante el ORM. Se crea una tabla si no existe
Character.sync();
Genre.sync();
Movies.sync();
User.sync();

//settings
app.use(json());
app.use(morgan("dev")); // Muestra en consola las peticiones y sus códigos

//middlewares
app.use("/api/movies", moviesRouter);
app.use("/api/characters", characterRouter);
app.use("/api/auth", authRouter);
app.use("/api/genre/", genreRouter);

export default app;
