import { z } from "zod";

const numeroObrigatorio = (mensagem: string) =>
  z.coerce.number({ error: mensagem });

const booleanoOpcional = (mensagem: string) =>
  z.preprocess((val) => {
    if (typeof val === "boolean") return val;
    if (typeof val === "string") return val === "true" || val === "1";
    return val;
  }, z.boolean({ error: mensagem }).optional());

export const createProdutoSchema = z.object({
  nome: z.string({ error: "Nome é obrigatório" })
    .min(1, "Nome é obrigatório")
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(200, "Nome muito longo"),

  preco: numeroObrigatorio("Preço é obrigatório")
    .positive("Preço deve ser maior que zero"),

  estoque: numeroObrigatorio("Estoque é obrigatório")
    .int("Estoque deve ser inteiro")
    .min(0, "Estoque não pode ser negativo"),

  id_marca: numeroObrigatorio("Marca é obrigatória")
    .int("Marca inválida")
    .positive("Marca inválida"),

  id_categoria: numeroObrigatorio("Categoria é obrigatória")
    .int("Categoria inválida")
    .positive("Categoria inválida"),

  descricao: z.string({ error: "Descrição inválida" })
    .max(2000, "Descrição muito longa")
    .optional(),

  destaque: booleanoOpcional("Campo destaque deve ser verdadeiro ou falso"),
  ativo: booleanoOpcional("Campo ativo deve ser verdadeiro ou falso"),
});

export const updateProdutoSchema = z.object({
  nome: z.string({ error: "Nome inválido" })
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(200, "Nome muito longo")
    .optional(),

  preco: numeroObrigatorio("Preço inválido")
    .positive("Preço deve ser maior que zero")
    .optional(),

  estoque: numeroObrigatorio("Estoque inválido")
    .int("Estoque deve ser inteiro")
    .min(0, "Estoque não pode ser negativo")
    .optional(),

  id_marca: numeroObrigatorio("Marca inválida")
    .int("Marca inválida")
    .positive("Marca inválida")
    .optional(),

  id_categoria: numeroObrigatorio("Categoria inválida")
    .int("Categoria inválida")
    .positive("Categoria inválida")
    .optional(),

  descricao: z.string({ error: "Descrição inválida" })
    .max(2000, "Descrição muito longa")
    .optional(),

  destaque: booleanoOpcional("Campo destaque deve ser verdadeiro ou falso"),
  ativo: booleanoOpcional("Campo ativo deve ser verdadeiro ou falso"),
});