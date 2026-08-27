import { PermissionRoute } from '@/src/components/guards/PermissionRoute';
import { PERMISSOES } from '@/src/lib/permissoes';

export default function ProdutosLayout({ children }: { children: React.ReactNode }) {
  return (
    <PermissionRoute anyOf={[PERMISSOES.VISUALIZAR_PRODUTO]}>
      {children}
    </PermissionRoute>
  );
}