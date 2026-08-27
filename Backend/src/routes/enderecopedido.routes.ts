import { Router } from "express";
import EnderecoPedidoController from "../controllers/enderecopedido.controllers";
import { validate } from "../middlewares/validate.middleware";
import {
  createEnderecoPedidoSchema,
  updateEnderecoPedidoSchema,
} from "../validators/enderecoPedido.validator";
import authMiddleware from "../middlewares/auth.middleware";
import { checarPermissao } from "../middlewares/permissao.middleware";

const router = Router();

router.get("/", authMiddleware, checarPermissao("gerenciar_pedido"), EnderecoPedidoController.findAll);
router.post("/", authMiddleware, checarPermissao("gerenciar_pedido"), validate(createEnderecoPedidoSchema), EnderecoPedidoController.create);
router.get("/:id", authMiddleware, checarPermissao("gerenciar_pedido"), EnderecoPedidoController.findById);
router.put("/:id", authMiddleware, checarPermissao("gerenciar_pedido"), validate(updateEnderecoPedidoSchema), EnderecoPedidoController.update);
router.delete("/:id", authMiddleware, checarPermissao("gerenciar_pedido"), EnderecoPedidoController.delete);

export default router;