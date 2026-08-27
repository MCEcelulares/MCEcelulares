import { PermissionRoute } from '@/src/components/guards/PermissionRoute';
import { PERMISSOES } from '@/src/lib/permissoes';

export default function PedidosLayout({ children }: { children: React.ReactNode }) {
  return (
    <PermissionRoute anyOf={[PERMISSOES.VISUALIZAR_PEDIDO]}>
      {children}
    </PermissionRoute>
  );
}