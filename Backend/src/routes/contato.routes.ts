import { Router } from "express";
import ContatoController from "../controllers/contato.controllers";
import { validate } from "../middlewares/validate.middleware";
import { createContatoSchema } from "../validators/contato.validator";

const router = Router();

router.post("/", validate(createContatoSchema), ContatoController.send);

export default router;