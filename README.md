# Spotify Labs API

Bem-vindo ao repositório da **Spotify Labs API**, um projeto Vue.js que explora a [API do Spotify for Developers](https://developer.spotify.com/documentation/web-api/). Desenvolvido para aprimorar e testar habilidades de front-end, este projeto não só aborda a integração com a API do Spotify e autenticação, mas também utiliza o método de Autenticação "Authorization Code with PKCE Flow", garantindo uma segurança reforçada. Além disso, demonstra práticas avançadas e atuais de desenvolvimento como listagem dinâmica de conteúdo.

## Configuração das Variáveis de Ambiente

Para que funcione corretamente, é necessário configurar algumas variáveis de ambiente essenciais para a autenticação com a API do Spotify. Você precisará criar um arquivo `.env` na raiz do projeto com as seguintes variáveis:

`VUE_APP_CLIENT_ID=seu_client_id_aqui
VUE_APP_REDIRECT_URI=sua_uri_de_redirecionamento_aqui`

-   `VUE_APP_CLIENT_ID` é o ID do Cliente fornecido pelo Spotify quando você registra a sua aplicação.
-   `VUE_APP_REDIRECT_URI` é a URI de redirecionamento que você definiu nas configurações da sua aplicação no dashboard do Spotify. Essa URI é utilizada como parte do fluxo de autenticação.

### Criando uma Conta na API for Developers do Spotify

Para obter o `VUE_APP_CLIENT_ID` e configurar o `VUE_APP_REDIRECT_URI`, você precisará de uma conta na [API for Developers do Spotify](https://developer.spotify.com/documentation/web-api/). Se você ainda não tem uma conta, siga estes passos:

1. Acesse [https://developer.spotify.com/dashboard/](https://developer.spotify.com/dashboard/) e faça login com sua conta Spotify ou crie uma nova conta.

2. Uma vez logado, crie uma nova aplicação no Dashboard para obter o seu Client ID.

3. Na configuração da sua aplicação, adicione a URI de redirecionamento no campo "Redirect URIs". Essa URI deve ser a mesma que você colocará na variável `VUE_APP_REDIRECT_URI` do seu arquivo `.env`.

Essas configurações são essenciais para integrar sua aplicação com a API do Spotify e utilizar recursos como autenticação e acesso aos dados forn

## Objetivo

-   Listar os artistas que mais ouvimos;
-   Listar os álbuns desses artistas;
-   Listar as playlists do usuário;
-   Criar uma nova playlist;
-   Exibir os dados do usuário.

## Metas e Objetivos

-   [+] Seguimentação de commits
-   [+] Lint
-   [+] Autenticação via Spotify
-   [+] Listar artistas
-   [+] Listar álbuns de um artista
-   [+] Utilizar paginação (scroll infinito ou não)
-   [-] Funcionamento offline
-   [+] Testes unitários
-   [+] Deploy da aplicação

## Bônus

-   [-] Testes E2E
-   [-] Integração com Sentry
-   [-] CI/CD
-   [+] Responsividade (celular e tablet)
-   [-] Qualidade de código (Sonarqube)
-   [+] PWA

## Conquistas do Projeto

-   **Seguimentação de commits**: Adotei uma estratégia clara de commits, facilitando a manutenção.

-   **ESLint**: Usei ESLint para assegurar a consistência e qualidade do código.

-   **Autenticação Spotify**: Autenticação via OAuth do Spotify com Authorization Code with PKCE Flow.

-   **Exploração de Artistas e Álbuns**: Criei uma navegação intuitiva para usuários explorarem artistas e álbuns no Spotify.

-   **Paginação Eficiente**: Apliquei paginação, com suporte a scroll infinito, para suavizar a navegação.

-   **Testes Unitários**: Conduzi testes unitários em alguns componentes para garantir a estabilidade do código.

**Deploy Contínuo**: Configurei o projeto para permitir atualizações rápidas com deploy contínuo na [Vercel](https://vercel.com). A aplicação pode ser acessada através deste [link](https://spotify-api-murex-eight.vercel.app/).

-   **Responsividade**: Garanti que a aplicação funcionasse bem em celulares e tablets.
-   **PWA**: Transformei a aplicação em um PWA, possibilitando uso do projeto como um aplicativo mobile.

## Tecnologias Utilizadas

Esta aplicação foi desenvolvida utilizando Vue.js 3, aproveitando ao máximo os recursos modernos do framework, como Composition API, Vue Router para roteamento e Vuex para gerenciamento de estado. Além disso, utilizamos uma série de outras tecnologias e ferramentas importantes:

-   **Axios** para requisições HTTP
-   **Dotenv** para gerenciamento de variáveis de ambiente
-   **Express** para servir a aplicação em ambiente de produção
-   **Moment** e **Moment Duration Format** para manipulação de datas
-   **Vue Infinite Scroll** para implementação do scroll infinito
-   **Jest** para testes unitários
-   **ESLint**, **TypeScript**, **Sass** entre outras ferramentas para garantir a qualidade e a manutenibilidade do código.

## Scripts Disponíveis

No diretório do projeto, você pode rodar:

```
pnpm install
```

Para instalar a aplicação do projeto

```
npm run serve
```

Executa a aplicação em modo de desenvolvimento.
Abra http://localhost:8080 para visualizá-la no navegador.

```
npm run build
```

Constrói a aplicação para produção na pasta dist.
Ele agrupa o Vue em modo de produção e otimiza a construção para o melhor desempenho.

```
npm run lint
```

Executa o linter em todo o código do projeto, garantindo a aderência às melhores práticas e padrões de codificação.

```
npm run test:unit
```

Executa os testes unitários definidos no projeto, utilizando Jest como framework de testes.

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
