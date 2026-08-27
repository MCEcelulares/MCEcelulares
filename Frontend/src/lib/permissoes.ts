export const PERMISSOES = {
  VISUALIZAR_DASHBOARD: "visualizar_dashboard",

  VISUALIZAR_PRODUTO: "visualizar_produto",
  CRIAR_PRODUTO: "criar_produto",
  EDITAR_PRODUTO: "editar_produto",
  EXCLUIR_PRODUTO: "excluir_produto",

  VISUALIZAR_MARCA: "visualizar_marca",
  CRIAR_MARCA: "criar_marca",
  EDITAR_MARCA: "editar_marca",
  EXCLUIR_MARCA: "excluir_marca",

  VISUALIZAR_CATEGORIA: "visualizar_categoria",
  CRIAR_CATEGORIA: "criar_categoria",
  EDITAR_CATEGORIA: "editar_categoria",
  EXCLUIR_CATEGORIA: "excluir_categoria",

  VISUALIZAR_USUARIO: "visualizar_usuario",

  VISUALIZAR_PEDIDO: "visualizar_pedido",
  EDITAR_STATUS_PEDIDO: "editar_status_pedido",
  EXCLUIR_PEDIDO: "excluir_pedido",
  GERENCIAR_PEDIDO: "gerenciar_pedido",

  REALIZAR_COMPRA: "realizar_compra",
} as const;

export const PERMISSOES_PAINEL = Object.values(PERMISSOES).filter(
  (permissao) => permissao !== PERMISSOES.REALIZAR_COMPRA
);

const ROTAS_PAINEL_EM_ORDEM: { permissao: string; rota: string }[] = [
  { permissao: PERMISSOES.VISUALIZAR_DASHBOARD, rota: "/admin" },
  { permissao: PERMISSOES.VISUALIZAR_PRODUTO, rota: "/admin/produtos" },
  { permissao: PERMISSOES.VISUALIZAR_CATEGORIA, rota: "/admin/categorias" },
  { permissao: PERMISSOES.VISUALIZAR_MARCA, rota: "/admin/marcas" },
  { permissao: PERMISSOES.VISUALIZAR_PEDIDO, rota: "/admin/pedidos" },
  { permissao: PERMISSOES.VISUALIZAR_USUARIO, rota: "/admin/usuarios" },
];

export function getRotaInicialPainel(permissoes: string[]): string {
  const rota = ROTAS_PAINEL_EM_ORDEM.find((item) => permissoes.includes(item.permissao));
  return rota?.rota ?? "/admin";
}