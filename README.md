# 🛒 Loja Online - Frontend

Esta é a interface web de uma Loja Online genérica, uma plataforma completa de e-commerce com sistema de autenticação, catálogo de produtos e gerenciamento administrativo.

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-62.0%25-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![HTML](https://img.shields.io/badge/HTML-29.3%25-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-8.7%25-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-19-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)

![Status](https://img.shields.io/badge/STATUS-EM%20DESENVOLVIMENTO-green?style=for-the-badge)

</div>

---

## 🏗️ O Projeto

O frontend da Loja Online oferece uma experiência completa de e-commerce, permitindo que usuários naveguem por produtos, realizem cadastro e login, e que administradores gerenciem o catálogo de produtos. A aplicação consome uma API REST desenvolvida em Spring Boot para persistência de dados.

### 🎯 Objetivo

Demonstrar a criação de uma aplicação de e-commerce moderna utilizando Angular, com foco em:
- Autenticação e autorização baseada em roles
- Gerenciamento de produtos com CRUD completo
- Interface responsiva e intuitiva
- Integração com API REST
- Boas práticas de desenvolvimento frontend

### 🔗 Repositórios Relacionados

* 🔙 [Backend (Spring Boot)](https://github.com/guilhermevcoskype/loja-backend) _(em desenvolvimento)_
* 🏗️ [Infraestrutura (Docker)](https://github.com/guilhermevcoskype/loja-infra) _(em desenvolvimento)_

---

## 🛠️ Tecnologias e Decisões Técnicas

* **Angular 19**: Framework principal com Standalone Components
* **TypeScript**: Tipagem forte e moderna
* **Bootstrap 5**: Framework CSS para responsividade e componentes
* **RxJS**: Programação reativa para gerenciamento de estado
* **Angular Router**: Navegação SPA
* **HTTP Client**: Comunicação com API REST
* **JWT**: Autenticação baseada em tokens

---

## 🖼️ Preview da Aplicação

<div align="center">

<img width="1905" height="1197" alt="image" src="https://github.com/user-attachments/assets/a0df7b66-e907-4a0a-93de-3d3e54af31b8" />

<img width="1876" height="992" alt="image" src="https://github.com/user-attachments/assets/95142117-f14b-4219-83e8-57361857b843" />

<img width="1907" height="428" alt="image" src="https://github.com/user-attachments/assets/3439525c-a1ce-4d53-96b8-aa8eb9488160" />

<img width="1919" height="992" alt="image" src="https://github.com/user-attachments/assets/2c7a1bf2-a59e-4c5b-be25-a4035f38b8fb" />

<img width="1919" height="995" alt="image" src="https://github.com/user-attachments/assets/26b25bd0-8e5c-4ab6-af88-de51d7f05f2f" />



*Interface principal da loja com catálogo de produtos e navegação*

</div>

---

## 📊 Status das Funcionalidades

| Funcionalidade | Status | Descrição |
| :--- | :---: | :--- |
| **Home Page** | ✅ | Página inicial com produtos em destaque |
| **Busca de Produtos** | ✅ | Sistema de busca e filtros |
| **Catálogo de Produtos** | ✅ | Listagem de produtos por descrição |
| **Detalhes do Produto** | ⚠️ |  Em desenvolvimento |
| **Autenticação** | ✅ | Login e cadastro de usuários |
| **Painel Admin** | ⚠️ |  Apenas cadastramento de produtos feita|
| **Carrinho de Compras** | ✅ | Carrinho de compras com produtos, quantidades e valores|
| **Checkout** | ⚠️ | Em desenvolvimento |
| **Histórico de Pedidos** | ⚠️ | Planejado |

---

## 🚀 Como rodar localmente

### 1. Com Docker (Recomendado)
```bash
# Clone o repositório
git clone [https://github.com/guilhermevcoskype/loja-frontend.git](https://github.com/guilhermevcoskype/loja-frontend.git)

# Acesse a pasta
cd diario-online-frontend

# Build e execução via Docker
docker build -t loja-frontend .
docker run -p 80:80 loja-frontend
```

---

### 2. Sem Docker

- **Node.js** 18.x ou superior
- **npm** 9.x ou superior
- **Angular CLI** 19.x

1. **Clone o repositório**
```bash
git clone https://github.com/guilhermevcoskype/loja-frontend.git
cd loja-frontend
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute o projeto**
```bash
ng serve
```

A aplicação estará disponível em `http://localhost:4200`

---

## 📂 Estrutura do Projeto

```
loja-frontend/
├── .vscode/                          # Configurações do VS Code
├── src/
│   ├── app/
│   │   ├── cabecalho/                # Componente de cabeçalho
│   │   │   ├── cabecalho.component.css
│   │   │   ├── cabecalho.component.html
│   │   │   ├── cabecalho.component.spec.ts
│   │   │   └── cabecalho.component.ts
│   │   │
│   │   ├── conteudo/                 # Módulo principal de conteúdo
│   │   │   ├── busca-produto/        # Busca de produtos
│   │   │   │   ├── busca-produto.component.css
│   │   │   │   ├── busca-produto.component.html
│   │   │   │   ├── busca-produto.component.spec.ts
│   │   │   │   └── busca-produto.component.ts
│   │   │   │
│   │   │   ├── cadastro-produto/     # Cadastro de produtos (Admin)
│   │   │   ├── cadastro-usuario/     # Cadastro de usuários
│   │   │   ├── carrinho/             # Carrinho de compras
│   │   │   ├── login/                # Autenticação
│   │   │   ├── model/                # Modelos de dados
│   │   │   ├── produtos/             # Listagem de produtos
│   │   │   ├── service/              # Serviços
│   │   │   ├── u-lancamentos/        # Últimos lançamentos
│   │   │   ├── conteudo.module.ts
│   │   │   └── conteudo.routes.ts
│   │   │
│   │   ├── guards/                   # Guards de rota
│   │   ├── interceptors/             # HTTP interceptors
│   │   │
│   │   ├── rodape/                   # Componente de rodapé
│   │   │   ├── rodape.component.css
│   │   │   ├── rodape.component.html
│   │   │   ├── rodape.component.spec.ts
│   │   │   └── rodape.component.ts
│   │   │
│   │   ├── shared/                   # Componentes compartilhados
│   │   │
│   │   ├── app.component.css
│   │   ├── app.component.html
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   └── app.routes.ts
│   │
│   ├── assets/                       # Imagens, ícones, fontes
│   ├── styles/                       # Estilos globais
│   └── environments/                 # Configurações por ambiente
│
├── .editorconfig                     # Configuração do editor
├── .gitignore                        # Arquivos ignorados pelo Git
├── angular.json                      # Configuração do Angular CLI
├── package.json                      # Dependências do projeto
├── tsconfig.json                     # Configuração TypeScript
└── README.md                         # Este arquivo
```

---

## 🎨 Design e Estilização

### Bootstrap 5

A aplicação utiliza Bootstrap 5 para garantir:
- Responsividade em todos os dispositivos
- Componentes modernos e consistentes
- Grid system flexível
- Utilities classes para estilização rápida

### Componentes Principais

- **Navbar**: Navegação principal com busca integrada
- **Cards**: Exibição de produtos
- **Forms**: Formulários de login, cadastro e produtos
- **Modals**: Confirmações e alertas
- **Alerts**: Feedback de ações do usuário

---

## 🔒 Segurança

- ✅ Autenticação baseada em JWT
- ✅ Guards de rota para proteção de páginas
- ✅ Interceptor para adicionar token em requisições
- ✅ Autorização baseada em roles (USER, ADMIN)
- ✅ Validação de formulários
- ✅ Proteção contra XSS
- ✅ Sanitização de dados de entrada

---

## 🐳 Docker

### Dockerfile
O projeto inclui um Dockerfile multi-stage otimizado:
- Stage 1: Build da aplicação Angular
- Stage 2: Servir com Nginx

### nginx.conf
Configuração customizada do Nginx para:
- Servir arquivos estáticos
- Roteamento SPA (Single Page Application)

---

## 🎯 Padrões de Código

- **Componentes**: Estrutura modular e reutilizável
- **Services**: Injeção de dependências
- **Signals**: Acesso a dados de qualquer lugar do projeto
- **SCSS**: Metodologia BEM para nomenclatura de classes
- **TypeScript**: Tipagem forte e interfaces bem definidas

### Services

- Singleton services via `providedIn: 'root'`
- Métodos retornam Observables
- Cache de dados quando apropriado

---

### 👨‍💻 Autor

**Guilherme Oliveira**

- GitHub: [guilhermevcoskype](https://github.com/guilhermevcoskype)
- LinkedIn: [guilherme-vale-oliveira-dev](https://www.linkedin.com/in/guilherme-vale-oliveira-dev/)
- Email: [guilhermevcoskype@gmail](guilhermevcoskype@gmail.com)

---

<div align="center">

Desenvolvido com ❤️ usando Angular

</div>
