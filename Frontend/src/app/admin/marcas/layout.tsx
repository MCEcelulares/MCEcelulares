import { PermissionRoute } from '@/src/components/guards/PermissionRoute';
import { PERMISSOES } from '@/src/lib/permissoes';

export default function MarcasLayout({ children }: { children: React.ReactNode }) {
  return (
    <PermissionRoute anyOf={[PERMISSOES.VISUALIZAR_MARCA]}>
      {children}
    </PermissionRoute>
  );
}