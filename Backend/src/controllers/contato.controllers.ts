import { Request, Response, NextFunction } from "express";
import ContatoService from "../services/contato.service";

class ContatoController {
  static async send(req: Request, res: Response, next: NextFunction) {
    try {
      const { nome, telefone, email, assunto, mensagem } = req.body;

      await ContatoService.enviarEmail({ nome, telefone, email, assunto, mensagem });

      return res.status(200).json({ message: "Mensagem enviada com sucesso." });
    } catch (error) {
      console.error("Erro ao enviar e-mail via Resend:", error);
      next(error);
    }
  }
}

export default ContatoController;