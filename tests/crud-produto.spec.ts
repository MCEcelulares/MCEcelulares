import { test } from "@playwright/test";
import LoginPage from "./page-objects/LoginPage";
import ProdutoPage from "./page-objects/ProdutoPage";

test.describe("Página de Produtos (Admin)", () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.visit();
        await loginPage.login("rafaelfrossard@gmail.com", "@Rafael1");
        await loginPage.loginSuccess();
    });

    test("Deve listar produtos", async ({ page }) => {
        const produtoPage = new ProdutoPage(page);

        await produtoPage.visit();
        await produtoPage.list();
    });

    test("Deve cadastrar um produto", async ({ page }) => {
        const produtoPage = new ProdutoPage(page);

        await produtoPage.visit();

        await produtoPage.create({
            nome: "Produto Teste",
            descricao: "Descrição do produto de teste criado pelo Playwright",
            preco: "1999.99",
            estoque: "10",
            destaque: "1",
            ativo: "1",
            idCategoria: "1",
            idMarca: "1"
        });
    });

    test("Não deve cadastrar produto com preço zero ou negativo", async ({ page }) => {
        const produtoPage = new ProdutoPage(page);

        await produtoPage.visit();

        await produtoPage.createComPrecoInvalido({
            nome: "Produto Preço Inválido",
            descricao: "Tentativa de cadastro com preço zero",
            preco: "0",          
            estoque: "5",
            destaque: "0",
            ativo: "1",
            idCategoria: "1",
            idMarca: "1"
        });

        await produtoPage.verifyErrorMessage();
    });

    test("Deve editar um produto", async ({ page }) => {
        const produtoPage = new ProdutoPage(page);

        await produtoPage.visit();

        await produtoPage.edit({
            nome: "Produto Editado",
            descricao: "Descrição editada pelo Playwright",
            preco: "2999.99",
            estoque: "20",
            destaque: "0",
            ativo: "1",
            idCategoria: "1",
            idMarca: "1"
        });
    });

    test("Deve excluir um produto", async ({ page }) => {
        const produtoPage = new ProdutoPage(page);

        await produtoPage.visit();

        await produtoPage.delete();
    });

    test("Não deve excluir produto ao cancelar a confirmação", async ({ page }) => {
        const produtoPage = new ProdutoPage(page);

        await produtoPage.visit();

        await produtoPage.cancelarExclusao();
    });
});