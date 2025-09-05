# Service Orders API (SOLID + PostgreSQL + TypeORM)

This is a **Service Orders Management API** built with **Node.js**, **TypeScript**, **Fastify**, and **PostgreSQL**. The project follows the **SOLID principles**, uses **TypeORM** for data access, and implements **JWT-based authentication**.

## ✅ Features Implemented

### ✅ Core Architecture

- TypeScript + Fastify base setup
- ESLint + Prettier + TSConfig configured
- SOLID principles applied across use-cases and repositories
- Environment validation with Zod

### ✅ Domain Models

- `User`: Registration, login, and JWT auth
- `Person`: Clients/suppliers management
- `Address`: Linked to `Person`
- `Category` and `Product`: With many-to-many relations

### ✅ Auth & Security

- JWT authentication with route protection middleware
- Public/private route distinction
- Secure error handling and message responses

### ✅ Database

- PostgreSQL with TypeORM
- Entities: `User`, `Person`, `Address`, `Category`, `Product`
- Migrations for schema versioning
- UUID and timestamp handling
- `reflect-metadata` enabled

### ✅ Controllers, Use Cases, and Factories

- Clean structure for each domain (Create, FindById, FindAll)
- Factory pattern used to inject dependencies
- Repositories decoupled for future ORM flexibility

### ✅ Middleware

- JWT validator middleware for route access control

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run in development
npm run start:dev

# Build and run migrations
npm run build
npx typeorm migration:run -d ./build/lib/typeorm/typeorm.js
```

## 🔐 Example JWT-Protected Routes

- POST `/user` – Create user
- POST `/user/signin` – Authenticate user and return token
- POST `/product` – Create product (requires JWT)

## 📁 Project Structure

```
src/
├── entities/
│   └── models/           # Interfaces for domain models
├── http/
│   ├── controllers/      # Request handlers
│   ├── middlewares/      # JWT and error handlers
│   ├── routes/           # Fastify route registrations
├── lib/
│   └── typeorm/          # TypeORM config
├── repositories/
│   ├── interfaces/       # Contract definitions
│   └── pg/               # PostgreSQL implementations
├── use-cases/
│   └── ...               # Business logic (create, find, etc.)
└── utils/                # Shared helpers (e.g., error formatter)
```

## 📦 Future Improvements

- Automated tests (Jest)
- Swagger/OpenAPI documentation
- Role-based access control
- Pagination and filtering
- Email notifications

---

> Project created during guided lessons with professor. Architecture and decisions designed for scalability, maintainability, and future ORM flexibility.
