'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@/src/components/layout/Icon';
import { useAuth } from '@/src/contexts/AuthContext';
import { PERMISSOES } from '@/src/lib/permissoes';

export const AdminSidebar = () => {
  const pathname = usePathname();
  const { hasPermissao } = useAuth();

  const linkClass = (href: string) => {
    const isActive = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);
    return `flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-sm transition-all ${isActive ? 'bg-white text-[#5714d7] shadow-md' : 'text-white/80 hover:bg-white/10 hover:text-white'
      }`;
  };

  return (
    <aside className="w-64 min-h-screen bg-linear-to-b from-[#5714d7] to-[#7929c8] flex flex-col text-white shrink-0">
      <div className="px-6 py-7 border-b border-white/20">
        <p className="text-xs uppercase tracking-widest font-semibold text-white/60 mb-1">Painel</p>
        <h1 className="text-xl font-bold">Administração</h1>
      </div>

      <nav className="flex flex-col gap-1 p-4 flex-1">
        {hasPermissao(PERMISSOES.VISUALIZAR_DASHBOARD) && (
          <Link href="/admin" className={linkClass('/admin')}>
            <Icon name="faChartBar" className="w-4" />
            Dashboard
          </Link>
        )}

        {hasPermissao(PERMISSOES.VISUALIZAR_PRODUTO) && (
          <Link href="/admin/produtos" className={linkClass('/admin/produtos')} data-testid="produto-button">
            <Icon name="faMobileScreen" className="w-4" />
            Produtos
          </Link>
        )}

        {hasPermissao(PERMISSOES.VISUALIZAR_CATEGORIA) && (
          <Link href="/admin/categorias" className={linkClass('/admin/categorias')}>
            <Icon name="faTag" className="w-4" />
            Categorias
          </Link>
        )}

        {hasPermissao(PERMISSOES.VISUALIZAR_MARCA) && (
          <Link href="/admin/marcas" className={linkClass('/admin/marcas')} data-testid="marca-button">
            <Icon name="faStar" className="w-4" />
            Marcas
          </Link>
        )}

        {hasPermissao(PERMISSOES.VISUALIZAR_PEDIDO) && (
          <Link href="/admin/pedidos" className={linkClass('/admin/pedidos')}>
            <Icon name="faBox" className="w-4" />
            Pedidos
          </Link>
        )}

        {hasPermissao(PERMISSOES.VISUALIZAR_USUARIO) && (
          <Link href="/admin/usuarios" className={linkClass('/admin/usuarios')}>
            <Icon name="faUsers" className="w-4" />
            Usuários
          </Link>
        )}

        <Link
          href="/"
          className="border-2 border-white text-white px-5 py-2 rounded-full font-semibold text-sm hover:bg-white hover:text-[#7929c8] transition-all flex items-center gap-2 mt-2"
        >
          <Icon name="faArrowLeft" className="w-3" />
          Voltar
        </Link>
      </nav>
    </aside>
  );
};  