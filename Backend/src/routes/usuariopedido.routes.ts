import { Router } from "express";
import UsuarioPedidoController from "../controllers/usuariopedido.controllers";
import { validate } from "../middlewares/validate.middleware";
import {
  createUsuarioPedidoSchema,
  updateUsuarioPedidoSchema,
} from "../validators/usuarioPedido.validator";
import authMiddleware from "../middlewares/auth.middleware";
import { checarPermissao } from "../middlewares/permissao.middleware";

const router = Router();

router.get("/", authMiddleware, checarPermissao("gerenciar_pedido"), UsuarioPedidoController.findAll);
router.post("/", authMiddleware, checarPermissao("gerenciar_pedido"), validate(createUsuarioPedidoSchema), UsuarioPedidoController.create);
router.get("/:id", authMiddleware, checarPermissao("gerenciar_pedido"), UsuarioPedidoController.findById);
router.put("/:id", authMiddleware, checarPermissao("gerenciar_pedido"), validate(updateUsuarioPedidoSchema), UsuarioPedidoController.update);
router.delete("/:id", authMiddleware, checarPermissao("gerenciar_pedido"), UsuarioPedidoController.delete);

export default router;