import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

type ContatoInput = {
  nome: string;
  telefone: string;
  email: string;
  assunto: string;
  mensagem: string;
};

class ContatoService {
  static async enviarEmail(input: ContatoInput) {
    const nome = escapeHtml(input.nome);
    const telefone = escapeHtml(input.telefone);
    const email = escapeHtml(input.email);
    const assunto = escapeHtml(input.assunto);
    const mensagem = escapeHtml(input.mensagem);

    await resend.emails.send({
      from: "Contato App <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL as string,
      subject: `Novo Contato: ${assunto} - ${nome}`,
      replyTo: input.email,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #7929c8;">Novo contato através do app MCe Celulares</h2>
          <p><strong>Nome:</strong> ${nome}</p>
          <p><strong>Telefone:</strong> ${telefone}</p>
          <p><strong>E-mail:</strong> ${email}</p>
          <p><strong>Assunto:</strong> ${assunto}</p>
          <hr />
          <p><strong>Mensagem:</strong></p>
          <p style="background: #f4f4f4; padding: 15px; border-radius: 8px;">${mensagem}</p>
        </div>
      `,
    });
  }
}

export default ContatoService;