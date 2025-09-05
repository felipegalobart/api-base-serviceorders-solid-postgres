# 📘 Documentação Técnica — Service Orders API

## ✅ Visão Geral do Projeto

Este projeto é uma API RESTful desenvolvida com **Node.js**, **TypeScript**, **Fastify** e **PostgreSQL**. Ele tem como objetivo o gerenciamento de ordens de serviço, com funcionalidades como cadastro de usuários, pessoas, produtos, categorias e autenticação via JWT.

---

## 🧱 Estrutura de Pastas

A seguir, explicamos brevemente a função de cada pasta do projeto:

```
src/
├── http/                # Camada de comunicação HTTP
│   ├── controllers/     # Controladores que lidam com as requisições
│   ├── middlewares/     # Middlewares como autenticação JWT
│   ├── routes/          # Rotas organizadas por recurso
├── use-cases/           # Casos de uso (lógica de negócio)
├── repositories/        # Interfaces e implementações de repositórios
│   └── pg/              # Implementações específicas para PostgreSQL
├── entities/            # Interfaces que representam as entidades
├── utils/               # Funções utilitárias (ex: tratamento de erros)
├── lib/
│   └── typeorm/         # Configuração e inicialização do TypeORM
```

---

## 🚀 Etapas da Implementação

### 1. Inicialização do Projeto

- `npm init` para criar o `package.json`
- Instalação de TypeScript, tsx, eslint, prettier e configurações de ambiente
- Criação do `tsconfig.json`
- Uso do `reflect-metadata` para suporte ao TypeORM

---

### 2. Entidades e Interfaces

Foram criadas interfaces como:

- `IUser`
- `IPerson`
- `IProduct`
- `ICategory`

Isso permitiu iniciar o projeto com SQL puro, mantendo o código preparado para adoção futura de um ORM como o **TypeORM**.

---

### 3. Repositórios Desacoplados

Foi seguido o padrão:

- **Interface**: define os métodos esperados
- **Implementação**: como aqueles métodos interagem com o banco de dados

Exemplo:
```ts
export interface IUserRepository {
  findByUsername(username: string): Promise<User | null>
}
```

---

### 4. Casos de Uso (Use Cases)

A lógica de negócio foi isolada em arquivos como:

- `CreateUserUseCase`
- `FindPersonByIdUseCase`
- `FindAllProductsUseCase`

Cada um deles recebe o repositório necessário via **injeção de dependência**.

---

### 5. Factories

Factories foram criadas para montar instâncias completas com seus repositórios e casos de uso:

```ts
export function makeCreateUserUseCase() {
  const repository = new PgUserRepository()
  return new CreateUserUseCase(repository)
}
```

---

### 6. Controllers e Rotas

- Os controllers chamam os casos de uso.
- As rotas utilizam os controllers e são registradas no `app.ts`.

Rotas públicas e privadas foram separadas para aplicar autenticação JWT.

---

### 7. Autenticação JWT

- Rota `/user/signin` gera o token.
- Middleware `jwt-validate.ts` protege as rotas privadas.
- As rotas públicas são definidas explicitamente.

---

### 8. Integração com TypeORM

- Criação do arquivo `typeorm.ts` com a configuração de `AppDataSource`
- Migração criada via CLI:
```bash
npx typeorm migration:create src/database/migrations/CreateCategory
```
- Rodando a migração:
```bash
npm run build && npx typeorm migration:run -d ./build/lib/typeorm/typeorm.js
```

---

## 🧪 Próximos Passos

- Implementar testes com Jest (a partir da aula 20)
- Aplicar validações com Zod
- Melhorar tratamento de erros com classes customizadas
- Automatizar build e deploy

---

## 📝 Conclusão

Esse projeto foi construído com foco em **separação de responsabilidades**, **escalabilidade futura** e **código limpo**. A estrutura foi pensada para facilitar o aprendizado, com uma transição suave entre SQL manual e uso de ORM (TypeORM), práticas modernas de autenticação, modularização e boas práticas com padrões como Repository e Factory.

