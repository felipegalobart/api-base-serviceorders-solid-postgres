# 📘 Service Orders – Passo a Passo para Criar Funcionalidades

## 🧱 Estrutura Base do Projeto

1. **Criação do Projeto**

   - `npm init -y`
   - Estrutura base criada com pastas:
     - `src/`
     - `src/http/`
     - `src/http/controllers/`
     - `src/http/routes/`
     - `src/use-cases/`
     - `src/entities/`
     - `src/repositories/`

2. **Instalações**

   - Fastify, TypeScript, tsx, tsup, dotenv, etc.
   - ESLint + Prettier com integração e configuração
   - PostgreSQL + `pg` + `@types/pg`
   - TypeORM + `reflect-metadata`
   - JWT (`fastify-jwt`) para autenticação

3. **Configuração do ambiente**

   - `.env` com variáveis de conexão e segurança
   - `tsconfig.json` com `moduleResolution`, `paths`, `verbatimModuleSyntax`
   - `package.json` com scripts:
     - `start:dev`, `build`, `typeorm:migrate`

4. **ORM Config**
   - `lib/typeorm/typeorm.ts` para conexão com banco de dados usando `AppDataSource`

---

## ⚙️ Criando uma Nova Funcionalidade

### 1. ✏️ Criar Entidade

- Ex: `src/entities/models/product.ts` e `product.interface.ts`
- Decorar com `@Entity`, `@Column`, `@PrimaryGeneratedColumn` (caso esteja com TypeORM)

### 2. 📁 Criar Migration

```bash
npm run build && npx typeorm migration:generate -d ./build/lib/typeorm/typeorm.js src/migrations/CreateProduct
npx typeorm migration:run -d ./build/lib/typeorm/typeorm.js
```

### 3. 🧠 Criar Use Case

- Local: `src/use-cases/`
- Ex: `create.ts`, `find-all.ts`, `find-by-id.ts`, etc.
- Lógica da aplicação isolada com repositórios

### 4. 🏭 Criar Factory

- Local: `src/use-cases/factories/`
- Ex: `make-create-product.ts`
- Cria instância de use case com injeção de dependências

### 5. 🌐 Criar Controller

- Local: `src/http/controllers/product/`
- Função que recebe `request`, valida e chama use case

### 6. 🧩 Criar Rota

- Local: `src/http/routes/product.ts`
- Exemplo:

```ts
app.post("/product", create);
app.get("/product", findAll);
```

### 7. 🔐 Middleware (se necessário)

- JWT: `src/http/middlewares/jwt-validate.ts`
- Usado via `.addHook('onRequest', jwtValidate)` no `app.ts`

### 8. ✅ Testar com JSON

- Exemplo de body:

```json
{
  "name": "Produto X",
  "price": 99.99,
  "categories": [{ "id": "1", "name": "Eletrônicos" }]
}
```

---

## 💡 Boas Práticas

- Use interfaces para repositórios para facilitar troca de implementação.
- Organize as pastas de forma consistente (ex: `/pg/` para repositórios com TypeORM).
- Coloque `build/` e `node_modules/` no `.gitignore`.
- Use commit com padrão: `git add . && git commit -m "feat: create product use case" && git push`

---

## 🛠️ Scripts Úteis

```bash
npm run build
npm run start:dev
npm run typeorm:migrate
```

---

## 🔒 Autenticação

- JWT gerado no login (`/user/signin`)
- Middleware valida todas as rotas exceto públicas

---

## 📁 Estrutura Recomendada

```
src/
├── entities/
├── http/
│   ├── controllers/
│   ├── middlewares/
│   └── routes/
├── repositories/
│   └── pg/
├── use-cases/
│   ├── errors/
│   └── factories/
├── lib/
│   └── typeorm/
└── utils/
```
