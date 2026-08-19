import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { MulterError } from "multer";
import { HttpError } from "../types/http_error";

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof HttpError) {
    return res.status(error.status).json({
      message: error.message,
    });
  }
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: error.issues.map((issue) => issue.message).join("\n"),
    });
  }

  if (error instanceof MulterError) {
    const mensagens: Record<string, string> = {
      LIMIT_FILE_SIZE: "Arquivo muito grande. Tamanho máximo permitido: 5MB",
      LIMIT_FILE_COUNT: "Muitos arquivos. Envie apenas uma imagem por vez",
      LIMIT_UNEXPECTED_FILE: 'Campo de arquivo inesperado. Use o campo "imagem"',
    };

    return res.status(400).json({
      message: mensagens[error.code] || `Erro no upload: ${error.message}`,
    });
  }

  if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({ message: "Este registro já existe no sistema." });
  }

  if (error.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({
      message: "Operação inválida: Você está fazendo referência a um dado que não existe ou tentando apagar algo que está em uso."
    });
  }

  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({
      message: "Os dados enviados são inválidos.",
    });
  }

  return res.status(500).json({
    message: "Erro interno do servidor. Tente novamente mais tarde.",
  });
};