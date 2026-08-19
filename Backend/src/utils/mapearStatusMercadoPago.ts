export function mapearStatusPagamento(
  status: string,
): "PENDENTE" | "PROCESSANDO" | "PAGO" | "RECUSADO" | "CANCELADO" {
  switch (status) {
    case "approved":
      return "PAGO";
    case "in_process":
    case "pending":
      return "PROCESSANDO";
    case "rejected":
      return "RECUSADO";
    case "cancelled":
    case "refunded":
    case "charged_back":
      return "CANCELADO";
    default:
      return "PENDENTE";
  }
}

export function mapearStatusPedido(
  statusPagamento: string,
): "AGUARDANDO_PAGAMENTO" | "PAGO" | "CANCELADO" {
  if (statusPagamento === "PAGO") return "PAGO";
  if (statusPagamento === "RECUSADO" || statusPagamento === "CANCELADO") return "CANCELADO";
  return "AGUARDANDO_PAGAMENTO";
}