'use client';

import { useState } from 'react';
import { Icon } from '@/src/components/layout/Icon';
import { useAuth } from '@/src/contexts/AuthContext';

const STATUS_OPTIONS = ['AGUARDANDO_PAGAMENTO', 'PAGO', 'ENVIADO', 'ENTREGUE', 'CANCELADO'] as const;
type StatusType = typeof STATUS_OPTIONS[number];

const STATUS_LABELS: Record<StatusType, string> = {
  AGUARDANDO_PAGAMENTO: 'Aguardando Pagamento',
  PAGO:      'Pago',
  ENVIADO:   'Enviado',
  ENTREGUE:  'Entregue',
  CANCELADO: 'Cancelado',
};

const STATUS_STYLES: Record<StatusType, string> = {
  AGUARDANDO_PAGAMENTO: 'bg-yellow-100 text-yellow-700',
  PAGO:      'bg-blue-100 text-blue-700',
  ENVIADO:   'bg-indigo-100 text-indigo-700',
  ENTREGUE:  'bg-green-100 text-green-700',
  CANCELADO: 'bg-red-100 text-red-700',
};

interface PedidoCardProps {
  pedido: PedidoType;
}

export const PedidoCard = ({ pedido }: PedidoCardProps) => {
  const { token } = useAuth();
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  const status = (pedido.status as StatusType) ?? 'AGUARDANDO_PAGAMENTO';
  const statusLabel = STATUS_LABELS[status] ?? pedido.status ?? 'Em andamento';
  const statusStyle = STATUS_STYLES[status] ?? 'bg-gray-100 text-gray-700';

  // TESTE CRU DE INTEGRAÇÃO COM MERCADO PAGO — mesma lógica do EnderecoSelector,
  // só que aqui o pedido já existe, então só chama o /checkout direto.
  const handleCheckout = async () => {
    setLoadingCheckout(true);
    try {
      const resCheckout = await fetch(`/api/pedido/${pedido.id_pedido}/checkout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const checkout = await resCheckout.json();
      console.log('checkout criado:', checkout);

      window.location.href = checkout.checkout_url;
    } catch (error) {
      console.error('erro no checkout cru:', error);
      setLoadingCheckout(false);
    }
  };

  return (
    <div className="bg-white rounded-[24px] p-5 flex flex-col gap-3 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="font-bold text-gray-900 text-sm">Pedido #{pedido.id_pedido}</p>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusStyle}`}>
          {statusLabel}
        </span>
      </div>

      {pedido.enderecoPedido && (
        <div className="flex items-start gap-2 text-xs text-gray-500">
          <Icon name="faLocationDot" className="text-purple-700 mt-0.5" />
          <p>
            {pedido.enderecoPedido.endereco}, {pedido.enderecoPedido.numero} — {pedido.enderecoPedido.cidade}/{pedido.enderecoPedido.estado}
          </p>
        </div>
      )}

      {pedido.itens?.length > 0 && (
        <div className="flex flex-col gap-1">
          {pedido.itens.map((item: ItemPedidoType) => (
            <div key={item.id_item_pedido || item.nome_produto} className="flex justify-between text-xs text-gray-600">
              <span>{item.quantidade}x {item.nome_produto}</span>
              <span>R$ {Number(item.preco_unitario).toFixed(2).replace('.', ',')}</span>
            </div>
          ))}
        </div>
      )}

      <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
        <p className="text-xs text-gray-400">
          {new Date(pedido.data).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
        <p className="font-bold text-purple-700">
          R$ {Number(pedido.valor_total).toFixed(2).replace('.', ',')}
        </p>
      </div>

      {status === 'AGUARDANDO_PAGAMENTO' && (
        <button
          onClick={handleCheckout}
          disabled={loadingCheckout}
          className={`flex items-center justify-center gap-2 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 transition-colors rounded-xl py-2
            ${loadingCheckout ? 'opacity-60 cursor-not-allowed' : ''}
          `}
        >
          <Icon name="faCreditCard" className="text-purple-700" />
          {loadingCheckout ? 'Redirecionando...' : 'Finalizar pagamento'}
        </button>
      )}
    </div>
  );
};