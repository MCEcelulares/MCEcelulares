import { Router } from "express";
import PedidoController from "../controllers/pedido.controllers";
import { validate } from "../middlewares/validate.middleware";
import {
  createPedidoSchema,
  updatePedidoSchema,
  updateStatusPedidoSchema,
} from "../validators/pedido.validator";
import authMiddleware from "../middlewares/auth.middleware";
import { checarPermissao } from "../middlewares/permissao.middleware";

const router = Router();

router.get("/", authMiddleware, PedidoController.findAll);

router.post("/", authMiddleware, checarPermissao("realizar_compra"), validate(createPedidoSchema), PedidoController.create);

router.get("/:id", authMiddleware, PedidoController.findById);

router.patch(
  "/:id/status",
  authMiddleware,
  checarPermissao("editar_status_pedido"),
  validate(updateStatusPedidoSchema),
  PedidoController.updateStatus,
);

router.put("/:id", authMiddleware, checarPermissao("gerenciar_pedido"), validate(updatePedidoSchema), PedidoController.update);

router.delete("/:id", authMiddleware, checarPermissao("excluir_pedido"), PedidoController.delete);

router.post("/:id/checkout", authMiddleware, PedidoController.criarCheckout);

export default router;