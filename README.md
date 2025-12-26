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
| **Catálogo de Produtos** | ✅ | Listagem de produtos por categorias |
| **Detalhes do Produto** | ✅ | Visualização completa do produto |
| **Autenticação** | ✅ | Login e cadastro de usuários |
| **Painel Admin** | ✅ | CRUD de produtos (role ADMIN) |
| **Carrinho de Compras** | ⚠️ | Em desenvolvimento |
| **Checkout** | ⚠️ | Em desenvolvimento |
| **Histórico de Pedidos** | ⚠️ | Planejado |

---

## 🔨 Funcionalidades Principais

### 👤 Para Usuários

* **Home Page**
  - Exibição dos últimos produtos cadastrados
  - Produtos em destaque
  - Sistema de busca integrado
  - Navegação por categorias
  - Links para login/cadastro

* **Autenticação**
  - Página de login para usuários cadastrados
  - Página de cadastro de novos usuários
  - Recuperação de senha
  - Validação de formulários

* **Catálogo**
  - Listagem de produtos com paginação
  - Filtros por categoria e preço
  - Visualização detalhada de produtos
  - Sistema de busca avançada

### 🔐 Para Administradores (Role: ADMIN)

* **Gerenciamento de Produtos**
  - Cadastro de novos produtos
  - Edição de produtos existentes
  - Upload de imagens
  - Definição de preço e estoque
  - Categorização de produtos
  - Exclusão de produtos

---

## 🚀 Como Rodar Localmente

### Pré-requisitos

- **Node.js** 18.x ou superior
- **npm** 9.x ou superior
- **Angular CLI** 19.x

```bash
npm install -g @angular/cli@19
```

### Instalação

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

ou simplesmente:

```bash
npm start
```

4. **Acesse no navegador**

```
http://localhost:4200
```

### Build para Produção

```bash
# Build otimizado
ng build --configuration production

# Arquivos gerados em dist/
```

---

## 📂 Estrutura do Projeto

```
loja-frontend/
├── .vscode/                    # Configurações do VS Code
├── src/
│   ├── app/                    # Aplicação Angular
│   │   ├── components/         # Componentes da aplicação
│   │   │   ├── home/           # Página inicial
│   │   │   ├── login/          # Página de login
│   │   │   ├── register/       # Cadastro de usuários
│   │   │   ├── products/       # Listagem de produtos
│   │   │   ├── product-detail/ # Detalhes do produto
│   │   │   └── admin/          # Painel administrativo
│   │   │
│   │   ├── services/           # Serviços e lógica de negócio
│   │   │   ├── auth.service.ts       # Autenticação
│   │   │   ├── product.service.ts    # Produtos
│   │   │   └── user.service.ts       # Usuários
│   │   │
│   │   ├── models/             # Interfaces e tipos TypeScript
│   │   │   ├── product.model.ts
│   │   │   ├── user.model.ts
│   │   │   └── category.model.ts
│   │   │
│   │   ├── guards/             # Guards de rota
│   │   │   ├── auth.guard.ts
│   │   │   └── admin.guard.ts
│   │   │
│   │   └── interceptors/       # HTTP interceptors
│   │       ├── auth.interceptor.ts
│   │       └── error.interceptor.ts
│   │
│   ├── assets/                 # Imagens, ícones, fontes
│   ├── styles/                 # Estilos globais CSS/SCSS
│   └── environments/           # Configurações por ambiente
│
├── .editorconfig               # Configuração do editor
├── .gitignore                  # Arquivos ignorados pelo Git
├── angular.json                # Configuração do Angular CLI
├── package.json                # Dependências do projeto
├── tsconfig.json               # Configuração TypeScript
└── README.md                   # Este arquivo
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

## 🌐 Integração com Backend

### Endpoints Consumidos

```typescript
// Autenticação
POST /api/auth/login
POST /api/auth/register

// Produtos (Público)
GET  /api/products
GET  /api/products/:id
GET  /api/products/search?q={query}
GET  /api/categories

// Produtos (Admin)
POST   /api/products         # Criar produto
PUT    /api/products/:id     # Atualizar produto
DELETE /api/products/:id     # Deletar produto

// Usuários
GET /api/users/profile
PUT /api/users/profile
```

### Configuração de Ambiente

**src/environments/environment.ts** (Desenvolvimento)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

**src/environments/environment.prod.ts** (Produção)
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.sualoja.com/api'
};
```

---

## 🎯 Padrões de Código

### Componentes

- Standalone Components (Angular 19+)
- OnPush change detection quando possível
- Smart/Dumb components pattern
- Unsubscribe de observables no ngOnDestroy

### Services

- Singleton services via `providedIn: 'root'`
- Métodos retornam Observables
- Tratamento de erros centralizado
- Cache de dados quando apropriado

### Nomenclatura

- Componentes: `product-list.component.ts`
- Services: `product.service.ts`
- Models: `product.model.ts`
- Guards: `auth.guard.ts`

---

## 🧪 Testes

```bash
# Testes unitários
ng test

# Testes com cobertura
ng test --code-coverage

# Testes E2E (se configurado)
ng e2e
```

---

## 🚀 Deploy

### Vercel / Netlify

```bash
# Build de produção
ng build --configuration production

# Deploy automático via Git
# Configure no painel do Vercel/Netlify
```

### Firebase Hosting

```bash
# Instale o Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Inicialize
firebase init

# Deploy
firebase deploy
```

---

## 📚 Próximas Funcionalidades

- [ ] Carrinho de compras completo
- [ ] Sistema de pagamento
- [ ] Histórico de pedidos
- [ ] Sistema de avaliações
- [ ] Lista de desejos
- [ ] Sistema de cupons de desconto
- [ ] Notificações em tempo real
- [ ] Chat de suporte
- [ ] Modo escuro (dark mode)
- [ ] PWA (Progressive Web App)

---

## 🐛 Issues Conhecidos

- [ ] Melhorar performance no carregamento de imagens
- [ ] Implementar lazy loading de imagens
- [ ] Adicionar skeleton loading
- [ ] Melhorar acessibilidade (ARIA labels)

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Add: nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto está sob a licença MIT.

---

### 👨‍💻 Autor

**Guilherme Oliveira**

- GitHub: [guilhermevcoskype](https://github.com/guilhermevcoskype)
- LinkedIn: [guilherme-vale-oliveira-dev](https://www.linkedin.com/in/guilherme-vale-oliveira-dev/)
- Email: [guilhermevcoskype@gmail.com](mailto:guilhermevcoskype@gmail.com)

---

<div align="center">

Desenvolvido com ❤️ usando Angular

⭐ Se você gostou deste projeto, considere dar uma estrela!

</div>
