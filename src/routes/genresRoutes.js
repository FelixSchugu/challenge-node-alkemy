import { Router } from "express";
import {
  getGenres,
  createGenre,
  modifyGenre,
  deleteGenre,
} from "./../controllers/genreController.js";

const router = Router();

router.get("/", getGenres);
router.post("/", createGenre);
router.put("/", modifyGenre);
router.delete("/", deleteGenre);

export default router;
