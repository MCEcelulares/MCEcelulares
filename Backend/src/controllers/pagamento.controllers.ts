import { NextFunction, Request, Response } from "express";
import Pagamento from "../models/Pagamento";
import { findByIdOuErroPagamento } from "../utils/FindByIdOuErro/findByIdOuErroPagamento";
import { buscarPagamentoMercadoPago } from "../services/mercadpago.service";
import { findByIdOuErroPedido } from "../utils/FindByIdOuErro/findByIdOuErroPedido";
import { mapearStatusPagamento, mapearStatusPedido } from "../utils/mapearStatusMercadoPago";

class PagamentoController {
  static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const pagamentos = await Pagamento.findAll({
        include: ["pedido"],
      });

      return res.status(200).json(pagamentos);
    } catch (error) {
      next(error)
    }
  }

  static async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const pagamento = await findByIdOuErroPagamento(Number(id), {
        include: ["pedido"],
      });

      return res.status(200).json(pagamento);
    } catch (error) {
      next(error)
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_pedido, metodo_pagamento, valor, data_pagamento, status } =
        req.body;

      const pagamento = await Pagamento.create({
        id_pedido,
        metodo_pagamento,
        valor,
        data_pagamento,
        status,
      });

      return res.status(201).json(pagamento);
    } catch (error) {
      next(error)
    }
  }


  static async webhook(req: Request, res: Response, next: NextFunction) {
    try {
      const tipo = (req.query.type as string) ?? req.body?.type;
      const idPagamentoMP = (req.query["data.id"] as string) ?? req.body?.data?.id;

      if (tipo !== "payment" || !idPagamentoMP) {
        return res.status(200).send();
      }

      const paymentInfo = await buscarPagamentoMercadoPago(idPagamentoMP);

      const id_pedido = Number(paymentInfo.external_reference);
      if (!id_pedido) return res.status(200).send();

      const pedido = await findByIdOuErroPedido(id_pedido);
      const status = mapearStatusPagamento(paymentInfo.status!);

      const [pagamento] = await Pagamento.findOrCreate({
        where: { id_pedido },
        defaults: {
          id_pedido,
          metodo_pagamento: paymentInfo.payment_method_id ?? "mercado_pago",
          valor: paymentInfo.transaction_amount,
          status,
        },
      });

      await pagamento.update({ status });
      await pedido.update({ status: mapearStatusPedido(status) });

      return res.status(200).send();
    } catch (error) {
      console.error("[webhook] ERRO:", error);
      return res.status(200).send();
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const pagamento = await findByIdOuErroPagamento(Number(id));

      const dados = req.body;

      await pagamento.update(dados);

      return res.status(200).json(pagamento);
    } catch (error) {
      next(error)
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const pagamento = await findByIdOuErroPagamento(Number(id));

      await pagamento.destroy();

      return res.status(204).send();
    } catch (error) {
      next(error)
    }
  }
}

export default PagamentoController;
