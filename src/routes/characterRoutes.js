import { Router } from "express";
import {
  getCharacters,
  createCharacter,
  deleteCharacter,
  modifyCharacter,
  findCharacters,
} from "./../controllers/characterController.js";

const router = Router();

router.get("/", getCharacters);
router.get("/find", findCharacters);
router.post("/", createCharacter);
router.put("/:id", modifyCharacter);
router.delete("/:id", deleteCharacter);

export default router;
