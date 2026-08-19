import { NextFunction, Request, Response } from "express";
import Pedido from "../models/Pedido";
import Carrinho from "../models/Carrinho";
import { HttpError } from "../types/http_error";
import { obterPaginacao } from "../utils/paginacao";
import { fazerPaginacaoResponse } from "../utils/paginacaoResponse";
import { findByIdOuErroPedido } from "../utils/FindByIdOuErro/findByIdOuErroPedido";
import { decrementarEstoque } from "../utils/decrementarEstoque";
import { obterCarrinhoComItens } from "../utils/obterCarrinhoComItens";
import { calcularValorTotal } from "../utils/calcularValorTotal";
import { criarItensPedido } from "../utils/criarItensPedido";
import { criarUsuarioPedido } from "../utils/criarUsuarioPedido";
import { criarEnderecoPedido } from "../utils/criarEnderecoPedido";
import { buscarPagamentoMercadoPago, criarPreferenciaPagamento } from "../services/mercadpago.service";

interface AuthenticatedRequest extends Request {
  userId?: number;
  isAdmin?: boolean;
}

const PEDIDO_INCLUDES = [
  { association: "usuarioPedido" },
  { association: "enderecoPedido" },
  { association: "itens" },
];

class PedidoController {
  static async findAll(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { page, limit } = obterPaginacao(req.query);
      const { id_usuario, status } = req.query;

      const includeUsuarioPedido: Record<string, any> = { association: "usuarioPedido" };

      if (req.isAdmin) {
        if (id_usuario) {
          includeUsuarioPedido.where = { id_usuario: Number(id_usuario) };
          includeUsuarioPedido.required = true;
        }
      } else {
        includeUsuarioPedido.where = { id_usuario: req.userId };
        includeUsuarioPedido.required = true;
      }

      const where: Record<string, any> = { ativo: true };
      if (status) where.status = status;

      const { count, rows } = await Pedido.findAndCountAll({
        where,
        subQuery: false,
        include: [
          includeUsuarioPedido,
          { association: "enderecoPedido" },
          { association: "itens" },
        ],
        distinct: true,
        limit,
        offset: (page - 1) * limit,
        order: [["id_pedido", "DESC"]],
      });

      return res.status(200).json(fazerPaginacaoResponse(page, limit, count, rows));
    } catch (error) {
      next(error);
    }
  }

  static async findById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const pedido = await findByIdOuErroPedido(Number(id), {
        include: PEDIDO_INCLUDES,
      });

      const dono = (pedido as any).usuarioPedido?.id_usuario;
      if (dono !== req.userId && !req.isAdmin) {
        return next(new HttpError(403, "Você não tem permissão para ver este pedido"));
      }

      return res.status(200).json(pedido);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { carrinho, itensCarrinho } = await obterCarrinhoComItens(req.userId!);
      const valor_total = calcularValorTotal(itensCarrinho);

      const pedido = await Pedido.create({ valor_total });

      await criarUsuarioPedido(pedido.id_pedido, req.userId!);
      await criarEnderecoPedido(pedido.id_pedido, req.body.id_endereco);
      await criarItensPedido(pedido.id_pedido, itensCarrinho);
      await decrementarEstoque(itensCarrinho);
      await Carrinho.destroy({ where: { id_carrinho: carrinho.id_carrinho } });

      return res.status(201).json(pedido);
    } catch (error) {
      next(error);
    }
  }

  static async criarCheckout(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const pedido = await findByIdOuErroPedido(Number(id), {
        include: [{ association: "itens" }, { association: "usuarioPedido" }],
      });

      const dono = (pedido as any).usuarioPedido?.id_usuario;
      if (dono !== req.userId && !req.isAdmin) {
        return next(new HttpError(403, "Você não tem permissão para pagar este pedido"));
      }

      if (pedido.status !== "AGUARDANDO_PAGAMENTO") {
        return next(new HttpError(400, "Este pedido não está aguardando pagamento"));
      }

      const preference = await criarPreferenciaPagamento(pedido);

      return res.status(200).json({ checkout_url: preference.init_point });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const pedido = await findByIdOuErroPedido(Number(id));

      await pedido.update(req.body);

      return res.status(200).json(pedido);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const pedido = await findByIdOuErroPedido(Number(id));

      await pedido.update({ ativo: false, status: "CANCELADO" });

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default PedidoController;