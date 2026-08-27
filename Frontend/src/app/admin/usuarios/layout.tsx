import { PermissionRoute } from '@/src/components/guards/PermissionRoute';
import { PERMISSOES } from '@/src/lib/permissoes';

export default function UsuariosLayout({ children }: { children: React.ReactNode }) {
  return (
    <PermissionRoute anyOf={[PERMISSOES.VISUALIZAR_USUARIO]}>
      {children}
    </PermissionRoute>
  );
}