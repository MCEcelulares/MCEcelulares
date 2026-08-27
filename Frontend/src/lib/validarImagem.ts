const TAMANHO_MAXIMO_BYTES = 5 * 1024 * 1024;

const TIPOS_PERMITIDOS = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
];

export type ValidarImagemResult = {
    valido: boolean;
    erro: string | null;
};

export function validarImagem(file: File): ValidarImagemResult {
    if (file.size > TAMANHO_MAXIMO_BYTES) {
        return { valido: false, erro: 'Arquivo muito grande. Tamanho máximo: 5MB' };
    }

    if (!TIPOS_PERMITIDOS.includes(file.type)) {
        return {
            valido: false,
            erro: 'Tipo de arquivo não permitido. Apenas JPEG, PNG, GIF e WebP são aceitos.',
        };
    }

    return { valido: true, erro: null };
}