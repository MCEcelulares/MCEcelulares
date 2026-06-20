import { expect, Locator, Page } from "@playwright/test";

export default class ProdutoPage {
    private readonly page: Page;
    private readonly adminButton: Locator;
    private readonly produtoButton: Locator;
    private readonly produtoCards: Locator;
    private readonly createButton: Locator;
    private readonly inputNome: Locator;
    private readonly inputDescricao: Locator;
    private readonly inputPreco: Locator;
    private readonly inputEstoque: Locator;
    private readonly selectDestaque: Locator;
    private readonly selectAtivo: Locator;
    private readonly selectCategoria: Locator;
    private readonly selectMarca: Locator;
    private readonly submitButton: Locator;
    private readonly editButton: Locator;
    private readonly deleteButton: Locator;
    private readonly swalTitle: Locator;
    private readonly swalMessage: Locator;
    private readonly swalConfirmButton: Locator;
    private readonly swalCancelButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.adminButton = page.getByTestId('admin-button');
        this.produtoButton = page.getByTestId('produto-button');
        this.produtoCards = page.getByTestId('produto-card');
        this.createButton = page.getByTestId('create-produto-button');
        this.inputNome = page.getByTestId('input-nome-produto');
        this.inputDescricao = page.getByTestId('input-descricao-produto');
        this.inputPreco = page.getByTestId('input-preco-produto');
        this.inputEstoque = page.getByTestId('input-estoque-produto');
        this.selectDestaque = page.getByTestId('select-destaque-produto');
        this.selectAtivo = page.getByTestId('select-ativo-produto');
        this.selectCategoria = page.getByTestId('select-categoria-produto');
        this.selectMarca = page.getByTestId('select-marca-produto');
        this.submitButton = page.getByTestId('submit-produto');
        this.editButton = page.getByTestId('btn-editar-produto');
        this.deleteButton = page.getByTestId('btn-excluir-produto');
        this.swalTitle = page.locator('.swal2-title');
        this.swalMessage = page.locator('.swal2-html-container');
        this.swalConfirmButton = page.locator('.swal2-confirm');
        this.swalCancelButton = page.locator('.swal2-cancel');
    }

    async visit() {
        await this.adminButton.click();
        await expect(this.page).toHaveURL("/admin")
        await this.produtoButton.click();
        await expect(this.page).toHaveURL("/admin/produtos")
    }

    async list() {
        const temProdutos = await this.produtoCards.first().isVisible()

        if (temProdutos) {
            const quantidade = await this.produtoCards.count()
            expect(quantidade).toBeGreaterThan(0)
        } else {
            await expect(this.page.getByTestId('empty-produtos')).toBeVisible()
        }
    }

    async create(dados: {
        nome: string;
        descricao: string;
        preco: string;
        estoque: string;
        destaque: '1' | '0';
        ativo: '1' | '0';
        idCategoria: string;
        idMarca: string;
    }) {
        await this.createButton.click();
        await expect(this.page).toHaveURL("/admin/produtos/cadastro")

        await this.inputNome.fill(dados.nome)
        await this.inputDescricao.fill(dados.descricao)
        await this.inputPreco.fill(dados.preco)
        await this.inputEstoque.fill(dados.estoque)

        await this.selectCategoria.selectOption(dados.idCategoria)
        await this.selectMarca.selectOption(dados.idMarca)

        await this.selectDestaque.selectOption(dados.destaque)
        await this.selectAtivo.selectOption(dados.ativo)
        await this.submitButton.click()

        await expect(this.swalConfirmButton).toBeVisible()
        await this.swalConfirmButton.click()

        await this.page.waitForURL("/admin/produtos")
    }

    /**
     * Cenário de erro: id_categoria/id_marca são hidden inputs sem
     * "required", então o HTML não impede o submit sem selecioná-los,
     * mas o backend exige ambos no createProdutoSchema.
     */
    async createSemCategoriaEMarca(dados: {
        nome: string;
        descricao: string;
        preco: string;
        estoque: string;
        destaque: '1' | '0';
        ativo: '1' | '0';
    }) {
        await this.createButton.click();
        await expect(this.page).toHaveURL("/admin/produtos/cadastro")

        await this.inputNome.fill(dados.nome)
        await this.inputDescricao.fill(dados.descricao)
        await this.inputPreco.fill(dados.preco)
        await this.inputEstoque.fill(dados.estoque)

        // Propositalmente não seleciona categoria nem marca
        await this.selectDestaque.selectOption(dados.destaque)
        await this.selectAtivo.selectOption(dados.ativo)
        await this.submitButton.click()
    }

    async edit(dados: {
        nome: string;
        descricao: string;
        preco: string;
        estoque: string;
        destaque: '1' | '0';
        ativo: '1' | '0';
        idCategoria: string;
        idMarca: string;
    }) {
        await this.produtoCards.first().click()

        await this.editButton.click()

        await this.inputNome.fill(dados.nome)
        await this.inputDescricao.fill(dados.descricao)
        await this.inputPreco.fill(dados.preco)
        await this.inputEstoque.fill(dados.estoque)

        await this.selectCategoria.selectOption(dados.idCategoria)
        await this.selectMarca.selectOption(dados.idMarca)

        await this.selectDestaque.selectOption(dados.destaque)
        await this.selectAtivo.selectOption(dados.ativo)
        await this.submitButton.click()

        await expect(this.swalConfirmButton).toBeVisible()
        await this.swalConfirmButton.click()
    }

    async delete() {
        await this.produtoCards.first().click()

        await this.deleteButton.click()

        // SweetAlert de confirmação ("Excluir produto?")
        await expect(this.swalMessage).toBeVisible()
        await expect(this.swalTitle).toHaveText("Excluir produto?")
        await this.swalConfirmButton.click()

        // SweetAlert de sucesso ("Produto excluído com sucesso!")
        await expect(this.swalMessage).toBeVisible()
        await expect(this.swalTitle).toHaveText("Produto excluído com sucesso!")
        await this.swalConfirmButton.click()

        await this.page.waitForURL("/admin/produtos")
    }

    /**
     * Cenário de erro: cancelar a confirmação não deve excluir o produto.
     * Conforme useDeleteProduto.ts, se !confirm.isConfirmed a função
     * retorna antes de chamar a API e nenhum outro SweetAlert é exibido.
     */
    async cancelarExclusao() {
        await this.produtoCards.first().click()

        await this.deleteButton.click()

        await expect(this.swalMessage).toBeVisible()
        await expect(this.swalTitle).toHaveText("Excluir produto?")

        await this.swalCancelButton.click()

        await expect(this.swalMessage).not.toBeVisible()
        await expect(this.page.getByTestId('produto-detalhes')).toBeVisible()
    }

    /**
     * Cenário de erro: o input[type=number] tem min={0.01} no HTML, mas
     * o Playwright usa .fill() e não aciona a validação nativa do browser.
     * Com preco=0 o submit chega ao backend, onde o Zod rejeita com
     * .positive("Preço deve ser maior que zero").
     */
    async createComPrecoInvalido(dados: {
        nome: string;
        descricao: string;
        preco: string;          // ex: "0" ou "-1"
        estoque: string;
        destaque: '1' | '0';
        ativo: '1' | '0';
        idCategoria: string;
        idMarca: string;
    }) {
        await this.createButton.click();
        await expect(this.page).toHaveURL("/admin/produtos/cadastro");

        await this.inputNome.fill(dados.nome);
        await this.inputDescricao.fill(dados.descricao);
        await this.inputPreco.fill(dados.preco);     
        await this.inputEstoque.fill(dados.estoque);

        await this.selectCategoria.selectOption(dados.idCategoria);
        await this.selectMarca.selectOption(dados.idMarca);

        await this.selectDestaque.selectOption(dados.destaque);
        await this.selectAtivo.selectOption(dados.ativo);
        await this.submitButton.click();
    }

    async verifySuccessMessage() {
        await expect(this.swalMessage).toBeVisible();
        await expect(this.swalTitle).toHaveText("Produto cadastrado com sucesso!");
        await this.swalConfirmButton.click();
    }

    async verifyErrorMessage() {
        await expect(this.swalMessage).toBeVisible();
        await expect(this.swalTitle).toHaveText("Erro ao cadastrar produto");
        await this.swalConfirmButton.click();
    }

    async verifyEditSuccessMessage() {
        await expect(this.swalMessage).toBeVisible();
        await expect(this.swalTitle).toHaveText("Produto atualizado com sucesso!");
        await this.swalConfirmButton.click();
    }

    async verifyEditErrorMessage() {
        await expect(this.swalMessage).toBeVisible();
        await expect(this.swalTitle).toHaveText("Erro ao atualizar produto");
        await this.swalConfirmButton.click();
    }

    async verifyDeleteErrorMessage() {
        await expect(this.swalMessage).toBeVisible();
        await expect(this.swalTitle).toHaveText("Erro ao excluir produto");
        await this.swalConfirmButton.click();
    }
}