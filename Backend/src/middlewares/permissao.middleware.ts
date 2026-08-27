import { Request, Response, NextFunction } from "express";
import { HttpError } from "../types/http_error";

interface PermissaoRequest extends Request {
  permissoes?: string[];
}

export const checarPermissao = (permissaoNecessaria: string) => {
  return (req: PermissaoRequest, res: Response, next: NextFunction) => {
    const permissoesDoUsuario = req.permissoes ?? [];

    if (!permissoesDoUsuario.includes(permissaoNecessaria)) {
      return next(
        new HttpError(403, `Acesso negado: permissão "${permissaoNecessaria}" é necessária`)
      );
    }

    return next();
  };
};