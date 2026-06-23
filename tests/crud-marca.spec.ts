import { test } from "@playwright/test";
import LoginPage from "./page-objects/LoginPage";
import MarcaPage from "./page-objects/MarcaPage";

test.describe("Página de Marcas (Admin)", () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.visit();
        await loginPage.login("rafaelfrossard@gmail.com", "@Rafael1");
    });

    test("Deve listar marcas", async ({ page }) => {
        const marcaPage = new MarcaPage(page);

        await marcaPage.visit();
        await marcaPage.list();
    });

    test("Deve cadastrar uma marca", async ({ page }) => {
        const marcaPage = new MarcaPage(page);

        await marcaPage.visit();

        await marcaPage.create({
            nome: "Marca Teste",
            ativo: "1"
        });
    });

    test("Não deve cadastrar marca com nome vazio", async ({ page }) => {
        const marcaPage = new MarcaPage(page);

        await marcaPage.visit();

        await marcaPage.createComNomeVazio({
            ativo: "1"
        });
    });

    test("Deve editar uma marca", async ({ page }) => {
        const marcaPage = new MarcaPage(page);

        await marcaPage.visit();

        await marcaPage.edit({
            nome: "Marca Editada",
            ativo: "1"
        });
    });

    test("Deve excluir uma marca", async ({ page }) => {
        const marcaPage = new MarcaPage(page);

        await marcaPage.visit();

        await marcaPage.delete();
    });

    test("Não deve excluir marca ao cancelar a confirmação", async ({ page }) => {
        const marcaPage = new MarcaPage(page);

        await marcaPage.visit();

        await marcaPage.cancelarExclusao();
    });
});