// import { test } from "@playwright/test";
// import SignupPage from "./page-objects/SignupPage";

// test.describe("Página de Cadastro", () => {

//     test("Deve realizar o cadastro com sucesso", async ({ page }) => {
//         const signupPage = new SignupPage(page);
//         const uniqueEmail = `rafael+${Date.now()}@gmail.com`;

//         await signupPage.visit();

//         await signupPage.signup(
//             "Rafael",
//             uniqueEmail,
//             "123.123.123-12",
//             "(12) 12345-1234",
//             "@Rafael1",
//             "@Rafael1"
//         );
//     });

//     test("Deve exibir erro ao tentar cadastrar e-mail já existente", async ({ page }) => {
//         const signupPage = new SignupPage(page);

//         await signupPage.visit();

//         await signupPage.signupComErro(
//             "Rafael",
//             "rafaelfrossard@gmail.com",
//             "123.123.123-12",
//             "(12) 12345-1234",
//             "@Rafael1",
//             "@Rafael1",
//             "Erro ao cadastrar"
//         );
//     });

//     test("Deve exibir erro quando as senhas não coincidem", async ({ page }) => {
//         const signupPage = new SignupPage(page);

//         await signupPage.visit();

//         await signupPage.signupComErro(
//             "Rafael",
//             "rafaelfrossard@gmail.com",
//             "123.123.123-12",
//             "(12) 12345-1234",
//             "@Rafael1",
//             "SenhaDiferente123",
//             "Erro ao cadastrar"
//         );
//     });
// });