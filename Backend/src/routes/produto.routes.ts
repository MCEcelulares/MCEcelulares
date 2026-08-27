import { Router } from "express";
import ProdutoController from "../controllers/produto.controllers";
import { validate } from "../middlewares/validate.middleware";
import authMiddleware from "../middlewares/auth.middleware";
import { checarPermissao } from "../middlewares/permissao.middleware";
import uploadProdutoImagem from "../middlewares/upload.middleware";
import {
  createProdutoSchema,
  updateProdutoSchema,
} from "../validators/produto.validator";

const router = Router();

router.get("/", ProdutoController.findAll);
router.get("/:id", ProdutoController.findById);

router.post(
  "/",
  authMiddleware,
  checarPermissao("criar_produto"),
  uploadProdutoImagem,
  validate(createProdutoSchema),
  ProdutoController.create
);

router.put(
  "/:id",
  authMiddleware,
  checarPermissao("editar_produto"),
  uploadProdutoImagem,
  validate(updateProdutoSchema),
  ProdutoController.update
);

router.delete("/:id", authMiddleware, checarPermissao("excluir_produto"), ProdutoController.delete);

export default router;