import { expect, Locator, Page } from "@playwright/test";

export default class MarcaPage {
    private readonly page: Page;
    private readonly adminButton: Locator;
    private readonly marcaButton: Locator;
    private readonly marcaCards: Locator;
    private readonly loadingMarcas: Locator;
    private readonly createButton: Locator;
    private readonly inputNome: Locator;
    private readonly selectAtivo: Locator;
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
        this.marcaButton = page.getByTestId('marca-button');
        this.marcaCards = page.getByTestId('marca-card');
        this.loadingMarcas = page.getByTestId('loading-marcas');
        this.createButton = page.getByTestId('create-marca-button');
        this.inputNome = page.getByTestId('input-nome-marca');
        this.selectAtivo = page.getByTestId('select-ativo-marca');
        this.submitButton = page.getByTestId('submit-marca');
        this.editButton = page.getByTestId('btn-editar-marca');
        this.deleteButton = page.getByTestId('btn-excluir-marca');
        this.swalTitle = page.locator('.swal2-title');
        this.swalMessage = page.locator('.swal2-html-container');
        this.swalConfirmButton = page.locator('.swal2-confirm');
        this.swalCancelButton = page.locator('.swal2-cancel');
    }

    async visit() {
        await this.adminButton.click();
        await expect(this.page).toHaveURL("/admin")
        await this.marcaButton.click();
        await expect(this.page).toHaveURL("/admin/marcas")
    }

    async list() {
        await expect(this.loadingMarcas).not.toBeVisible();

        const quantidade = await this.marcaCards.count();

        if (quantidade > 0) {
            expect(quantidade).toBeGreaterThan(0);
        } else {
            await expect(this.page.getByTestId('empty-marcas')).toBeVisible();
        }
    }

    async create(dados: {
        nome: string;
        ativo: '1' | '0';
    }) {
        await this.createButton.click();
        await expect(this.page).toHaveURL("/admin/marcas/cadastro")

        await this.inputNome.fill(dados.nome)
        await this.selectAtivo.selectOption(dados.ativo)
        await this.submitButton.click()

        await expect(this.swalConfirmButton).toBeVisible()
        await this.swalConfirmButton.click()
    }

    async verifyNomeInvalido() {
        const valor = await this.inputNome.inputValue();
        expect(valor).toBe("");

        await expect(this.page).toHaveURL("/admin/marcas/cadastro");
    }

    async createComNomeVazio(dados: {
        ativo: '1' | '0';
    }) {
        await this.createButton.click();
        await expect(this.page).toHaveURL("/admin/marcas/cadastro")

        await this.selectAtivo.selectOption(dados.ativo)
        await this.submitButton.click()
    }

    async edit(dados: {
        nome: string;
        ativo: '1' | '0';
    }) {
        await this.marcaCards.first().click()

        await this.editButton.click()

        await this.inputNome.fill(dados.nome)
        await this.selectAtivo.selectOption(dados.ativo)
        await this.submitButton.click()

        await expect(this.swalConfirmButton).toBeVisible()
        await this.swalConfirmButton.click()
    }

    async delete() {
        await this.marcaCards.first().click()

        await this.deleteButton.click()

        await expect(this.swalMessage).toBeVisible()
        await expect(this.swalTitle).toHaveText("Excluir marca?")
        await this.swalConfirmButton.click()

        await expect(this.swalMessage).toBeVisible()
        await expect(this.swalTitle).toHaveText("Marca excluída com sucesso!")
        await this.swalConfirmButton.click()

        await this.page.waitForURL("/admin/marcas")
    }

    async cancelarExclusao() {
        await this.marcaCards.first().click()

        await this.deleteButton.click()

        await expect(this.swalMessage).toBeVisible()
        await expect(this.swalTitle).toHaveText("Excluir marca?")

        await this.swalCancelButton.click()

        await expect(this.swalMessage).not.toBeVisible()
        await expect(this.page.getByTestId('marca-detalhes')).toBeVisible()
    }

    async verifySuccessMessage() {
        await expect(this.swalMessage).toBeVisible();
        await expect(this.swalTitle).toHaveText("Marca cadastrada com sucesso!");
        await this.swalConfirmButton.click();
    }

    async verifyErrorMessage() {
        await expect(this.swalMessage).toBeVisible();
        await expect(this.swalTitle).toHaveText("Erro ao cadastrar marca");
        await this.swalConfirmButton.click();
    }

    async verifyEditSuccessMessage() {
        await expect(this.swalMessage).toBeVisible();
        await expect(this.swalTitle).toHaveText("Marca atualizada com sucesso!");
        await this.swalConfirmButton.click();
    }

    async verifyEditErrorMessage() {
        await expect(this.swalMessage).toBeVisible();
        await expect(this.swalTitle).toHaveText("Erro ao atualizar marca");
        await this.swalConfirmButton.click();
    }

    async verifyDeleteErrorMessage() {
        await expect(this.swalMessage).toBeVisible();
        await expect(this.swalTitle).toHaveText("Erro ao excluir marca");
        await this.swalConfirmButton.click();
    }
}