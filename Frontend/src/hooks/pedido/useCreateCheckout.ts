import { createCheckoutAPI } from '@/src/actions/pedido';
import { useAuth } from '@/src/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import Swal from 'sweetalert2';

export const useCreateCheckout = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const router = useRouter();

  const execute = useCallback(async (id_pedido: number) => {
    setLoading(true);
    try {
      const data = await createCheckoutAPI(token!, id_pedido);

      if (!data.success) throw new Error(data.error);

      // Usa replace para que a página de checkout não fique no histórico,
      // impedindo o retorno a ela após o pedido ser finalizado.
      router.replace('/pedidos');
      window.open(data.checkoutUrl, '_blank', 'noopener,noreferrer');
      return { success: true };
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao abrir pagamento',
        text: (error as Error).message || 'Não foi possível iniciar o pagamento',
      });
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, [token, router]);

  return { execute, loading };
};