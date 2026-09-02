Contextualização do Problema e Evolução do Produto
O projeto consiste no desenvolvimento de uma plataforma de comércio eletrônico para uma loja localizada no município de Corbélia, no Paraná, especializada na venda de celulares, dispositivos eletrônicos, acessórios e jogos.

A necessidade do projeto surgiu a partir de uma dificuldade enfrentada pela loja em seu atendimento. Por estar localizada em Corbélia, a empresa recebia uma quantidade significativa de solicitações de clientes de cidades próximas, principalmente Cascavel. Esses clientes frequentemente entravam em contato por meio do celular para consultar quais produtos estavam disponíveis, seus respectivos preços e informações relacionadas à possibilidade de retirada ou entrega.

Esse modelo de atendimento fazia com que informações que poderiam ser consultadas diretamente pelos clientes precisassem ser fornecidas manualmente pelos responsáveis pela loja. Além de consumir tempo no atendimento, essa situação dificultava a divulgação dos produtos e tornava o processo de compra menos prático para os clientes.

Diante desse problema, o produto passou por diferentes versões ao longo de seu desenvolvimento, buscando solucionar gradualmente as necessidades identificadas.

Primeira versão — Catálogo online

A primeira versão do produto teve como principal objetivo disponibilizar as informações da loja na internet e reduzir a necessidade de contato direto para consultas básicas.
Foi desenvolvido um site que apresentava informações sobre a localização da loja, os produtos disponíveis e seus respectivos preços. Dessa forma, o cliente poderia consultar previamente o catálogo e verificar se havia interesse em algum produto.

Entretanto, nessa primeira versão ainda não existia um processo de compra integrado à plataforma. Caso o cliente tivesse interesse em adquirir um produto, o site o direcionava para o WhatsApp da loja, onde a negociação e a conclusão da compra continuavam sendo realizadas manualmente.

Essa primeira versão solucionou parcialmente o problema inicial, principalmente ao facilitar a consulta de produtos e preços, mas ainda dependia do atendimento manual para efetivar as vendas.
Segunda versão — Implementação do e-commerce

A segunda versão surgiu com o objetivo de transformar o catálogo em uma plataforma de comércio eletrônico propriamente dita, permitindo que o cliente realizasse uma parte maior do processo de compra diretamente pelo sistema.

Nessa etapa, foi desenvolvida uma área administrativa, permitindo que o proprietário da loja pudesse cadastrar e gerenciar os produtos disponíveis sem depender diretamente do desenvolvedor para realizar essas 
alterações.

Também foram implementadas funcionalidades voltadas aos clientes, incluindo:
•	Cadastro de usuários;
•	Login e autenticação;
•	Gerenciamento da conta do usuário;
•	Cadastro de endereço;
•	Carrinho de compras;
•	Seleção dos produtos para compra;
•	Processo de finalização do pedido.

Com essas funcionalidades, o cliente passou a conseguir realizar praticamente todo o processo de compra pela plataforma, desde a escolha dos produtos até o envio do pedido.

Apesar da evolução, ainda existia uma limitação importante: o sistema não possuía uma solução de pagamento adequada e integrada ao processo de compra. Dessa forma, embora o e-commerce já permitisse realizar pedidos, a etapa de pagamento ainda não apresentava uma experiência satisfatória e precisava ser aprimorada.

Terceira versão — Pagamento online e expansão para dispositivos móveis
Na terceira versão, o objetivo foi solucionar as limitações relacionadas ao pagamento e melhorar a experiência de acesso à plataforma.

Para isso, foi realizada a integração com o Mercado Pago, permitindo que o processo de pagamento fosse realizado de maneira integrada ao e-commerce. Essa mudança tornou o processo de compra mais completo, reduzindo a necessidade de intervenção manual da loja para finalizar uma venda.

Além da integração com o sistema de pagamentos, nessa etapa também foi desenvolvido um aplicativo para dispositivos móveis. A criação do aplicativo possibilitou que os clientes tivessem uma alternativa ao acesso pelo navegador, podendo utilizar a plataforma diretamente pelo celular.

Também foram realizados aprimoramentos na versão web por meio da implementação de responsividade. Dessa forma, o site passou a se adaptar a diferentes tamanhos de tela, proporcionando uma experiência mais adequada tanto em computadores quanto em dispositivos móveis.

Evolução do produto

A evolução do produto ocorreu de forma incremental, acompanhando os problemas identificados em cada etapa do desenvolvimento.

Inicialmente, o sistema funcionava apenas como um catálogo online, solucionando a necessidade de disponibilizar informações sobre os produtos. Posteriormente, evoluiu para um e-commerce completo, permitindo que os próprios clientes realizassem seus pedidos e que o proprietário administrasse os produtos por meio de uma área administrativa.

Por fim, a terceira versão adicionou um meio de pagamento integrado, aplicativo para dispositivos móveis e melhorias de responsividade, tornando o produto mais completo e acessível.

Essa evolução demonstra que o produto não foi desenvolvido apenas com o objetivo de criar uma loja virtual, mas como uma solução progressiva para reduzir a dependência do atendimento manual, facilitar o acesso às informações dos produtos e tornar o processo de compra mais simples para os clientes.

Diagrama Entidade Relacionamento:
 

Requisitos funcionais:


 1)	Autenticação e Usuários

RF 1.	O sistema deve permitir o cadastro de novos usuários (nome, e-mail, CPF, telefone e senha), garantindo que o e-mail seja único

RF 2.	O sistema deve permitir login com e-mail e senha, e permanecer logado quando retornar ao site

RF 3.	O sistema deve permitir logout do usuário

RF 4.	O sistema deve permitir a visualização e edição dos dados da própria conta

RF 5.	O sistema deve suportar diferentes cargos de usuário (ex.: cliente, vendas, atendimento, auditor, administrador,)

RF 6.	O sistema deve associar permissões a cargos (RBAC — Role-Based Access Control)

RF 7.	O sistema deve restringir o acesso a rotas administrativas com base nas permissões do usuário logado

RF 8.	O sistema deve listar clientes cadastrados (para usuários com permissão)

RF 9.	O sistema deve exibir detalhes de um usuário específico (painel admin)

 3)	Produtos

RF 10.	O sistema deve permitir o cadastro de produtos com nome, descrição, preço, estoque, imagem, marca, categoria, ativo e destaque

RF 11.	O sistema deve permitir a edição de produtos existentes

RF 12.	O sistema deve permitir a exclusão (ou inativação) de produtos

RF 13.	O sistema deve permitir a listagem paginada de produtos

RF 14.	O sistema deve exibir detalhes de um produto específico


RF 15.	O sistema deve permitir anexo de arquivos de imagem no cadastro/edição de produtos para sua exibição

RF 16.	O sistema deve controlar o estoque dos produtos, decrementando-o após a finalização de um pedido

RF 17.	O sistema deve exibir produtos em destaque/novidades na página inicial

RF 18.	O sistema deve exibir os produtos mais vendidos no painel administrativo

 4)	Categorias e Marcas

RF 19.	O sistema deve permitir CRUD (criar, listar, editar, excluir) de categorias e marcas de produtos

RF 20.	O sistema deve exibir categorias na página inicial para navegação do usuário

RF 21.	O sistema deve permitir a busca/filtro de produtos por categoria e marca

 5)	Carrinho de Compras

RF 22.	O sistema deve permitir adicionar produtos ao carrinho

RF 23.	O sistema deve permitir alterar a quantidade de itens no carrinho

RF 24.	O sistema deve permitir remover itens do carrinho

RF 25.	O sistema deve calcular o valor total do carrinho automaticamente

RF 26.	O sistema deve validar a disponibilidade dos produtos e a quantidade em estoque antes de confirmar itens do carrinho

RF 27.	O sistema deve impedir a criação de pedidos caso o carrinho não possua itens ou não foi encontrado

 6)	Pedidos

RF 28.	O sistema deve permitir a criação de um pedido a partir dos itens do carrinho

RF 29.	O sistema deve vincular endereço de entrega ao pedido

RF 30.	O sistema deve vincular o usuário responsável ao pedido

RF 31.	O sistema deve permitir consulta do histórico de pedidos do usuário

RF 32.	O sistema deve permitir que usuários com permissão visualizem todos os pedidos

RF 33.	O sistema deve permitir a atualização do status de um pedido ('AGUARDANDO PAGAMENTO', 'PAGO', 'ENVIADO', 'ENTREGUE', 'CANCELADO')

RF 34.	O sistema deve restringir a visualização de um pedido apenas ao dono ou a usuários autorizados

RF 35.	O sistema deve permitir a exclusão/cancelamento de pedidos (mediante permissão)

RF 36.	O sistema deve exibir contagem de novos pedidos e quantidade total no painel admin

RF 37.	O sistema deve permitir paginação e filtro de pedidos por status

 7)	Endereços

RF 38.	O sistema deve permitir o cadastro de múltiplos endereços por usuário

RF 39.	O sistema deve permitir a edição e exclusão de endereços

RF 40.	O sistema deve obrigar a seleção de um endereço no momento da finalização da compra

 8)	Pagamentos

RF 41.	O sistema deve integrar com o Mercado Pago para processar pagamentos

RF 42.	O sistema deve gerar uma preferência de pagamento com os itens do pedido

RF 43.	O sistema deve limpar os itens do carrinho do usuário, após fechamento do pedido

 9)	Contato

RF 44.	O sistema deve disponibilizar um formulário de contato para os usuários

RF 45.	O sistema deve enviar um e-mail automático a partir dos dados preenchidos no formulário de contato

 10)	Painel Administrativo

RF 46.	O sistema deve exibir um dashboard com métricas (receita, contagem de produtos, usuários, pedidos)

RF 47.	O sistema deve exibir gráfico/indicador de receita

RF 48.	O sistema deve oferecer atalhos de ações rápidas no painel

RF 49.	O sistema deve redirecionar o usuário autenticado para a rota do painel para a qual ele tem permissão

11)	Aplicativo Móvel

RF 50.	O aplicativo móvel deve possuir um menu vertical retrátil (Drawer) para navegação.

RF 51.	O aplicativo móvel deve abrir os links de contato nos apps nativos correspondentes (WhatsApp e Instagram).

Requisitos não funcionais:


 1)	 Segurança

RNF 1.	O sistema deve armazenar senhas de forma criptografada (hash)

RNF 2.	O sistema deve utilizar autenticação baseada em token JWT

RNF 3.	O sistema deve validar e autorizar todas as rotas sensíveis via middleware de autenticação e permissão

RNF 4.	O sistema deve validar todos os dados de entrada antes de processá-los

RNF 5.	O sistema deve tratar e padronizar erros HTTP de forma centralizada

RNF 6.	As comunicações externas (nginx) devem suportar HTTPS/SSL

RNF 7.	O sistema deve limitar o tamanho e tipo de arquivos enviados no upload de imagens

 2)	 Desempenho e Escalabilidade

RNF 8.	O sistema deve implementar paginação em listagens para evitar sobrecarga de dados

RNF 9.	O sistema deve ser containerizado para facilitar escalabilidade e deploy

RNF 10.	O banco de dados deve possuir verificação de saúde (healthcheck) antes de disponibilizar o backend

 3)	 Confiabilidade e Disponibilidade

RNF 11.	 O backend deve expor um endpoint de healthcheck para monitoramento

RNF 12.	 O sistema deve reiniciar automaticamente serviços críticos em caso de falha (restart policy no MySQL)

 4)	 Manutenibilidade

RNF 13.	O código deve ser escrito em TypeScript, com tipagem estática em backend e frontend

RNF 14.	O sistema deve seguir uma arquitetura em camadas (controllers, services, models, routes, validators, middlewares)

RNF 15.	O sistema deve utilizar ORM para abstração e padronização do acesso ao banco de dados

RNF 16.	O sistema deve seguir padrões de commit para histórico de versionamento consistente

RNF 17.	O sistema deve possuir testes automatizados

 5)	 Usabilidade

RNF 18.	O sistema deve fornecer feedback visual claro sobre erros de validação

RNF 19.	A navegação do painel administrativo deve considerar as permissões do usuário, exibindo apenas o que ele pode acessar

 6)	 Portabilidade e Infraestrutura

RNF 20.	O sistema deve rodar em containers Docker isolados (frontend, backend, banco de dados, proxy)

RNF 21.	O sistema deve utilizar Nginx como proxy reverso entre frontend e backend

RNF 22.	O sistema deve utilizar variáveis de ambiente para configuração sensível (chaves, credenciais, URLs)

 7)	 Compatibilidade

RNF 23.	O frontend deve ser construído com Next.js e React, compatível com navegadores modernos

RNF 24.	O backend deve utilizar Node.js/Express e ser compatível com banco de dados MySQL

RNF 25.	O sistema deve possuir uma interface móvel construída com React Native e Expo, garantindo compatibilidade com os sistemas operacionais Android e iOS.

RNF 26.	O backend deve atuar como uma API RESTful, sendo capaz de atender simultaneamente e de forma independente as requisições do frontend Web (Next.js) e do aplicativo Mobile (React Native).

RNF 27.	O aplicativo móvel deve apresentar um design responsivo e adaptado para telas de smartphones, garantindo uma navegação fluida baseada em toques e gestos.



Diagramas de casos de uso:

1. Diagrama de Casos de Uso: Processo de Compra pelo Cliente
Este diagrama descreve as interações de um Cliente com o sistema de e-commerce.

<img width="921" height="861" alt="image" src="https://github.com/user-attachments/assets/381c5db5-f795-4f75-9eb3-d5f681ab2e5b" />

 

2. Diagrama de Casos de Uso: Gestão de Produtos
Este diagrama descreve como o Administrador gerencia os produtos e o estoque.

 <img width="921" height="558" alt="image" src="https://github.com/user-attachments/assets/eedf729c-347a-4c6c-8b93-4f5ef6cccf32" />


Diagramas de atividades:

1. Diagrama de Atividades: Processamento de Compra (Checkout)
Este fluxograma representa as regras de negócio durante o processo de compra do cliente, sem cálculo de frete.

 
<img width="488" height="935" alt="image" src="https://github.com/user-attachments/assets/74645113-8151-4278-9a4e-d0ba43156504" />



2. Diagrama de Atividades: Fluxo de Cadastro de Celular pelo Admin
Este fluxograma mostra as etapas e verificações para cadastrar um novo produto.

 <img width="483" height="903" alt="image" src="https://github.com/user-attachments/assets/7c0b5e1c-4ff1-4234-a6dc-79cd08be6891" />


Diagramas de sequência:

1. Diagrama de Sequência: Autenticação de Usuário (Login)
Este diagrama representa o fluxo de mensagens e ações durante o login de um cliente no sistema.

 <img width="921" height="676" alt="image" src="https://github.com/user-attachments/assets/b6235605-a0aa-4076-a9d2-cad78d31c9d2" />


2. Diagrama de Sequência: Adição ao Carrinho e Busca de Produtos
Este diagrama ilustra o fluxo de visualização do catálogo e adição de um celular ao carrinho.

 <img width="921" height="588" alt="image" src="https://github.com/user-attachments/assets/4a46c697-f4b5-4b02-92e0-cd7ab8910390" />

 
