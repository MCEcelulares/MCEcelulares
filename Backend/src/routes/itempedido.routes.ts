import { Router } from "express";
import { validate } from "../middlewares/validate.middleware";
import {
  createItemPedidoSchema,
  updateItemPedidoSchema,
} from "../validators/itemPedido.validator";
import authMiddleware from "../middlewares/auth.middleware";
import { checarPermissao } from "../middlewares/permissao.middleware";
import ItemPedidoController from "../controllers/itempedido.controllers";

const router = Router();

router.get("/", authMiddleware, checarPermissao("gerenciar_pedido"), ItemPedidoController.findAll);
router.post("/", authMiddleware, checarPermissao("gerenciar_pedido"), validate(createItemPedidoSchema), ItemPedidoController.create);
router.get("/:id", authMiddleware, checarPermissao("gerenciar_pedido"), ItemPedidoController.findById);
router.put("/:id", authMiddleware, checarPermissao("gerenciar_pedido"), validate(updateItemPedidoSchema), ItemPedidoController.update);
router.delete("/:id", authMiddleware, checarPermissao("gerenciar_pedido"), ItemPedidoController.delete);

export default router;