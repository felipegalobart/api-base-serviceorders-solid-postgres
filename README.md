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

# 📦 Service Orders API

A complete API for managing service orders, built using **Node.js**, **TypeScript**, **Fastify**, and **PostgreSQL**, following **SOLID principles**, using **TypeORM** as ORM, and implementing **JWT** for authentication.

---

## ✅ Features

### 🧱 Core Architecture

- TypeScript project with Fastify HTTP server
- Follows SOLID principles (separated controllers, use-cases, repositories)
- Factory pattern for dependency injection
- Environment variable validation with Zod
- Clean architecture for scalability and testability

### 🧑‍💻 Domain Models

- **User**: registration and login with hashed passwords
- **Person**: clients/suppliers (with address)
- **Address**: belongs to a person
- **Category**: used to classify products
- **Product**: supports multiple categories (many-to-many)

### 🛡️ Security & Auth

- JWT-based authentication
- Route protection middleware
- Centralized error handling (custom exceptions, utils)

### 🗄️ Database Layer

- PostgreSQL using TypeORM
- Custom repositories implementing interface contracts
- Migrations with UUIDs and timestamps
- Reflect-metadata + centralized config

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run start:dev

# Build and run database migrations
npm run build
npx typeorm migration:run -d ./build/lib/typeorm/typeorm.js
```

---

## 🔐 Example Routes (JWT-Protected)

| Method | Endpoint       | Description             |
| ------ | -------------- | ----------------------- |
| POST   | `/user`        | Create a new user       |
| POST   | `/user/signin` | Login and receive token |
| POST   | `/product`     | Create a product        |

---

## 📁 Project Structure

```
src/
├── entities/              # Data models/interfaces
│   └── models/
├── http/
│   ├── controllers/       # Request/response logic
│   ├── middlewares/       # Auth and error middleware
│   ├── routes/            # Route definitions
├── lib/
│   └── typeorm/           # DB config
├── repositories/
│   ├── interfaces/        # Repository contracts
│   └── pg/                # PostgreSQL implementations
├── use-cases/             # Business logic (CRUD)
│   └── errors/            # Custom errors
└── utils/                 # Shared utilities
```

---

## 🌱 Future Improvements

- ✅ Authentication (done)
- 🔜 Swagger/OpenAPI docs
- 🔜 Role-based access control (admin, user)
- 🔜 Tests (Jest)
- 🔜 Pagination and filtering
- 🔜 Email notification integration

---

> 🧠 Project built during mentor-led sessions, aiming at real-world architecture and gradual implementation of best practices.
