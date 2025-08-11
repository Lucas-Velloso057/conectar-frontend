<div align="center">
  <img src="./public/conecta_logo.png" alt="Conectar Logo" width="200"/>
  <h1>Conectar - Frontend</h1>
</div>

<p align="center">
  Interface de gerenciamento de clientes e usuários, desenvolvida como parte de um desafio técnico. O projeto foi construído com React, TypeScript e Vite, utilizando dados mockados para simular a interação com uma API.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite">
  <img src="https://img.shields.io/badge/CSS_Modules-000000?style=for-the-badge&logo=css-modules&logoColor=white" alt="CSS Modules">
</p>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [✨ Funcionalidades](#-funcionalidades)
- [🛠️ Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [🚀 Como Executar](#-como-executar)
- [📜 Scripts Disponíveis](#-scripts-disponíveis)

---

## 📖 Sobre o Projeto

O **Conectar Frontend** é uma aplicação web SPA (Single Page Application) que simula um painel administrativo para gerenciar clientes e usuários. O principal objetivo deste desafio foi demonstrar a habilidade de construir uma interface moderna, reativa e bem estruturada, seguindo as melhores práticas de desenvolvimento com React e TypeScript.

Para fins de avaliação e para garantir a autonomia do frontend, todos os dados são **mockados** e a comunicação com o backend é simulada, sem realizar chamadas HTTP reais.

---

## ✨ Funcionalidades

-   🔐 **Autenticação**: Sistema de Login com controle de acesso baseado em contexto (React Context API).
-   👤 **Gerenciamento de Usuários**: Visualização e criação de novos usuários.
-   👥 **Gerenciamento de Clientes**: CRUD completo (Criação, Leitura, Atualização e Deleção) de clientes.
-   **Rotas Protegidas**: Acesso a páginas específicas somente para usuários autenticados.
-   🎨 **Estilização Modular**: Uso de CSS Modules para garantir estilos escopados e evitar conflitos.
-   📱 **Design Responsivo (em desenvolvimento)**: A estrutura está preparada para adaptação a diferentes tamanhos de tela.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi desenvolvido com as seguintes tecnologias:

-   **[React](https://reactjs.org/)**: Biblioteca para construção de interfaces de usuário.
-   **[TypeScript](https://www.typescriptlang.org/)**: Superset do JavaScript que adiciona tipagem estática.
-   **[Vite](https://vitejs.dev/)**: Ferramenta de build moderna e ultrarrápida.
-   **[React Router Dom](https://reactrouter.com/)**: Para gerenciamento de rotas na aplicação.
-   **[CSS Modules](https://github.com/css-modules/css-modules)**: Para estilização local e modular.
-   **[ESLint](https://eslint.org/)**: Para linting e padronização de código.

---

## 🚀 Como Executar

Para executar o projeto localmente, siga os passos abaixo:

1.  **Clone o repositório**
    ```bash
    git clone <url-do-seu-repositorio>
    ```

2.  **Navegue até o diretório do projeto**
    ```bash
    cd conectar-frontend
    ```

3.  **Instale as dependências**
    ```bash
    npm install
    ```

4.  **Execute a aplicação em modo de desenvolvimento**
    ```bash
    npm run dev
    ```

5.  Abra seu navegador e acesse `http://localhost:5173` (ou a porta indicada no seu terminal).

---

## 📜 Scripts Disponíveis

No diretório do projeto, você pode executar:

-   `npm run dev`: Inicia o servidor de desenvolvimento.
-   `npm run build`: Compila o projeto para produção na pasta `dist`.
-   `npm run lint`: Executa o linter para verificar erros de padrão de código.
-   `npm run preview`: Inicia um servidor local para visualizar a build de