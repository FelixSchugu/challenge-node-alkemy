import { Router } from "express";
import {
  getMovies,
  createMovie,
  modifyMovie,
  deleteMovie,
} from "./../controllers/movieController.js";
const router = Router();

router.get("/", getMovies);
router.post("/", createMovie);
router.put("/:id", modifyMovie);
router.delete("/:id", deleteMovie);

export default router;
