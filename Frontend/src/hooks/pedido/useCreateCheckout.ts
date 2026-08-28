import { createCheckoutAPI } from '@/src/actions/pedido';
import { useAuth } from '@/src/contexts/AuthContext';
import { useState, useCallback } from 'react';
import Swal from 'sweetalert2';

export const useCreateCheckout = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const execute = useCallback(async (id_pedido: number) => {
    setLoading(true);
    try {
      const data = await createCheckoutAPI(token!, id_pedido);

      if (!data.success) throw new Error(data.error);

      window.location.assign(data.checkoutUrl);
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
  }, [token]);

  return { execute, loading };
};