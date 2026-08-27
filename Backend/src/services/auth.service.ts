import bcrypt from "bcrypt";
import Usuario from "../models/Usuario";
import Cargo from "../models/Cargo";
import Permissao from "../models/Permissao";

class AuthService {
  static async login(email: string, senha: string) {
    const usuario = await Usuario.findOne({
      where: { email },
      include: [
        {
          model: Cargo,
          as: "cargos",
          include: [{ model: Permissao, as: "permissoes" }],
        },
      ],
    });

    if (!usuario) return null;

    const senhaHash = usuario.get("senha") as string;

    const senhaValida = await bcrypt.compare(senha, senhaHash);

    if (!senhaValida) return null;

    return usuario;
  }

  static obterPermissoes(usuario: Usuario): string[] {
    const cargos = (usuario.get("cargos") as any[]) ?? [];

    const permissoes = cargos.flatMap((cargo) =>
      ((cargo.permissoes as any[]) ?? []).map((permissao) => permissao.nome)
    );

    return Array.from(new Set(permissoes));
  }
}

export default AuthService;