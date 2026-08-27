import { Router } from "express";
import CategoriaController from "../controllers/categoria.controllers";
import { validate } from "../middlewares/validate.middleware";
import authMiddleware from "../middlewares/auth.middleware";
import { checarPermissao } from "../middlewares/permissao.middleware";
import {
  createCategoriaSchema,
  updateCategoriaSchema,
} from "../validators/categoria.validator";

const router = Router();

router.get("/", CategoriaController.findAll);
router.get("/:id", CategoriaController.findById);

router.post("/", authMiddleware, checarPermissao("criar_categoria"), validate(createCategoriaSchema), CategoriaController.create);
router.put("/:id", authMiddleware, checarPermissao("editar_categoria"), validate(updateCategoriaSchema), CategoriaController.update);
router.delete("/:id", authMiddleware, checarPermissao("excluir_categoria"), CategoriaController.delete);

export default router;