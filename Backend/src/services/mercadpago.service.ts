import { Payment, Preference } from "mercadopago";
import mercadopago from "../config/mercadopago";
import Pedido from "../models/Pedido";

export async function criarPreferenciaPagamento(pedido: Pedido) {

  const preference = new Preference(mercadopago);

  const itens = (pedido as any).itens ?? [];

  const response = await preference.create({
    body: {
      items: itens.map((item: any) => ({
        id: String(item.id_item),
        title: item.nome_produto,
        quantity: item.quantidade,
        unit_price: Number(item.preco_unitario),
        currency_id: "BRL",
      })),
      external_reference: String(pedido.id_pedido),
      back_urls: {
        success: `${process.env.FRONTEND_URL}/pedidos/${pedido.id_pedido}/sucesso`,
        failure: `${process.env.FRONTEND_URL}/pedidos/${pedido.id_pedido}/falha`,
        pending: `${process.env.FRONTEND_URL}/pedidos/${pedido.id_pedido}/pendente`,
      },
      notification_url: `${process.env.BACKEND_URL}/pagamento/webhook`,
    },
  });

  return response;
}

export async function buscarPagamentoMercadoPago(id: string) {
  const payment = new Payment(mercadopago);
  return payment.get({ id });
}