import { expect, Locator, Page } from "@playwright/test";

export default class ProdutoPage {
    private readonly page: Page;
    private readonly adminButton: Locator;
    private readonly produtoButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.adminButton = page.getByTestId('admin-button')
        this.produtoButton = page.getByTestId('produto-button')
    }

    async visit() {
        await this.adminButton.click();
        await expect(this.page).toHaveURL("/admin")
        await this.produtoButton.click();
        await expect(this.page).toHaveURL("/admin/produtos")
    }

    async list() {
        await expect(this.produtoCards.first()).toBeVisible()
        const quantidade = await this.produtoCards.count()
        expect(quantidade).toBeGreaterThan(0)
    }
}