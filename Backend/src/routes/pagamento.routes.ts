import { Router } from "express";
import PagamentoController from "../controllers/pagamento.controllers";
import { validate } from "../middlewares/validate.middleware";
import {
  createPagamentoSchema,
  updatePagamentoSchema,
} from "../validators/pagamento.validator";
import authMiddleware from "../middlewares/auth.middleware";
import { checarPermissao } from "../middlewares/permissao.middleware";

const router = Router();

router.get("/", authMiddleware, checarPermissao("gerenciar_pedido"), PagamentoController.findAll);
router.post("/", authMiddleware, checarPermissao("gerenciar_pedido"), validate(createPagamentoSchema), PagamentoController.create);
router.get("/:id", authMiddleware, checarPermissao("gerenciar_pedido"), PagamentoController.findById);
router.put("/:id", authMiddleware, checarPermissao("gerenciar_pedido"), validate(updatePagamentoSchema), PagamentoController.update);
router.delete("/:id", authMiddleware, checarPermissao("gerenciar_pedido"), PagamentoController.delete);

router.post("/webhook", PagamentoController.webhook);

export default router;