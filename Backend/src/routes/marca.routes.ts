import { Router } from "express";
import MarcaController from "../controllers/marca.controllers";
import { validate } from "../middlewares/validate.middleware";
import authMiddleware from "../middlewares/auth.middleware";
import { checarPermissao } from "../middlewares/permissao.middleware";
import {
  createMarcaSchema,
  updateMarcaSchema,
} from "../validators/marca.validator";

const router = Router();

router.get("/", MarcaController.findAll);
router.get("/:id", MarcaController.findById);

router.post("/", authMiddleware, checarPermissao("criar_marca"), validate(createMarcaSchema), MarcaController.create);
router.put("/:id", authMiddleware, checarPermissao("editar_marca"), validate(updateMarcaSchema), MarcaController.update);
router.delete("/:id", authMiddleware, checarPermissao("excluir_marca"), MarcaController.delete);

export default router;