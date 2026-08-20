import { z } from "zod";

export const createContatoSchema = z.object({
  nome: z.string({ error: "Nome é obrigatório" })
    .min(1, "Nome é obrigatório")
    .min(3, "Nome deve conter pelo menos 3 caracteres")
    .max(100, "Nome muito longo"),

  telefone: z.string({ error: "Telefone é obrigatório" })
    .min(1, "Telefone é obrigatório")
    .regex(/^\d{11}$/, "O telefone deve ter 11 dígitos"),

  email: z.string({ error: "Email é obrigatório" })
    .min(1, "Email é obrigatório")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email inválido"),

  assunto: z.string({ error: "Assunto é obrigatório" })
    .min(5, "O assunto deve ter entre 5 e 30 caracteres")
    .max(30, "O assunto deve ter entre 5 e 30 caracteres"),

  mensagem: z.string({ error: "Mensagem é obrigatória" })
    .min(20, "A mensagem deve ter entre 20 e 200 caracteres")
    .max(200, "A mensagem deve ter entre 20 e 200 caracteres"),
});