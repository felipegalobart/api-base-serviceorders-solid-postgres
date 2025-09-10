# 🚀 Service Orders API

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Fastify](https://img.shields.io/badge/Fastify-202020?style=for-the-badge&logo=fastify&logoColor=white)](https://www.fastify.io/)

A **Service Orders Management API** built with **Node.js**, **TypeScript**, **Fastify**, and **PostgreSQL**. This project follows **SOLID principles**, uses **TypeORM** for data access, implements **JWT-based authentication**, and features **role-based authorization**.

---

## 📋 Table of Contents

- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)  
- [Running the Application](#-running-the-application)
- [Project Structure](#-project-structure)
- [SOLID Architecture](#-solid-architecture)
- [API Routes](#-api-routes)
- [Usage Examples](#-usage-examples)
- [Development](#-development)
- [Roadmap](#-roadmap)

---

## 🔧 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v18 or higher)
- **PostgreSQL** (v12 or higher)
- **npm** or **yarn**

---

## 📦 Installation

1. **Clone the repository:**

```bash
git clone https://github.com/felipegalobart/api-base-serviceorders-solid-postgres.git
cd api-base-serviceorders-solid-postgres/service-orders
```

2. **Install dependencies:**

```bash
npm install
```

---

## ⚙️ Configuration

1. **Create environment file:**

```bash
cp .env.example .env
```

2. **Configure your environment variables:**

```env
NODE_ENV=development
PORT=3000
DATABASE_USER=your_db_user
DATABASE_HOST=localhost
DATABASE_NAME=service_orders_db
DATABASE_PASSWORD=your_db_password
DATABASE_PORT=5432
JWT_SECRET=your_jwt_secret_key
```

3. **Set up PostgreSQL database:**

```sql
CREATE DATABASE service_orders_db;
```

---

## 🚀 Running the Application

### Development Mode

```bash
# Start development server with hot reload
npm run start:dev
```

### Production Mode

```bash
# Build the application
npm run build

# Run database migrations
npx typeorm migration:run -d ./build/lib/typeorm/typeorm.js

# Start production server
npm start
```

The API will be available at `http://localhost:3000`

---

## 📁 Project Structure

```
src/
├── entities/                    # Domain entities and interfaces
│   ├── models/                 # Interface definitions
│   │   ├── user.interface.ts
│   │   ├── user-role.enum.ts
│   │   ├── authorization.interface.ts
│   │   ├── product.interface.ts
│   │   ├── category.interface.ts
│   │   ├── person.interface.ts
│   │   └── address.interface.ts
│   ├── user.entity.ts          # TypeORM entities
│   ├── product.entity.ts
│   ├── category.entity.ts
│   ├── person.entity.ts
│   └── address.entity.ts
├── http/                        # HTTP layer
│   ├── controllers/             # Request handlers organized by entity
│   │   ├── user/
│   │   ├── product/
│   │   ├── category/
│   │   ├── person/
│   │   └── address/
│   ├── middlewares/             # Authentication and authorization middleware
│   │   ├── jwt-validate.ts
│   │   └── authorize.ts
│   └── routes/                  # Route definitions
├── lib/                         # External library configurations
│   ├── typeorm/                 # TypeORM configuration and migrations
│   └── pg/                      # Raw PostgreSQL connection
├── repositories/                 # Data access layer
│   ├── interfaces/               # Repository contracts
│   ├── typeorm/                 # TypeORM implementations
│   └── pg/                      # Raw SQL implementations
├── use-cases/                    # Business logic organized by entity
│   ├── user/                    # User-related use cases
│   │   ├── create-user.ts
│   │   ├── update-user.ts
│   │   ├── signin.ts
│   │   ├── find-with-person.ts
│   │   └── factory/
│   ├── person/                  # Person-related use cases
│   │   ├── find-user-by-id.ts
│   │   └── factory/
│   ├── product/                 # Product-related use cases
│   │   ├── create-product.ts
│   │   ├── find-product.ts
│   │   ├── find-all-products.ts
│   │   ├── update-product.ts
│   │   ├── delete-product.ts
│   │   └── factory/
│   ├── address/                 # Address-related use cases
│   ├── category/                # Category-related use cases
│   └── errors/                  # Custom error classes
├── utils/                       # Shared utilities
│   └── global-error-handler.ts
├── env/                         # Environment validation
│   └── index.ts
├── app.ts                       # Application configuration
└── server.ts                    # Server entry point
```

---

## 🔐 Authorization System

This API implements a **role-based authorization system** with the following features:

### 👥 User Roles

- **`admin`**: Full access to all operations, including user management
- **`user`**: Standard user with limited permissions
- **`manager`**: Intermediate level with specific permissions
- **`viewer`**: Read-only access

### 🛡️ Authorization Middleware

The `authorize` middleware provides flexible role-based access control:

```typescript
// Example: Admin-only route
app.put('/user/:id', { 
  preHandler: authorize({ requiredRoles: [UserRole.ADMIN] }) 
}, update)

// Example: Multiple roles allowed
app.get('/reports', { 
  preHandler: authorize({ requiredRoles: [UserRole.ADMIN, UserRole.MANAGER] }) 
}, getReports)
```

### 🔒 Protected Endpoints

- **User Update**: Only admins can modify user data
- **Future endpoints**: Can be easily protected by adding the middleware

### 🚨 Error Responses

- **401 Unauthorized**: Invalid or missing JWT token
- **403 Forbidden**: Valid token but insufficient permissions
- **500 Internal Server Error**: Server-side errors

---

## 🏗️ SOLID Architecture

This project implements **SOLID principles** throughout its architecture:

### 🔹 Single Responsibility Principle (SRP)

- **Controllers**: Handle HTTP requests only
- **Use Cases**: Contain business logic only
- **Repositories**: Handle data access only
- **Entities**: Represent domain models only

### 🔹 Open/Closed Principle (OCP)

- **Repository interfaces** allow extension without modification
- **Error handlers** can be extended for new error types
- **Middleware** can be added without changing existing code

### 🔹 Liskov Substitution Principle (LSP)

- **Repository implementations** are interchangeable
- **TypeORM** and **raw SQL** repositories can be swapped seamlessly

### 🔹 Interface Segregation Principle (ISP)

- **Small, focused interfaces** for each entity
- **No forced dependencies** on unused methods

### 🔹 Dependency Inversion Principle (DIP)

- **Use cases depend on abstractions** (interfaces)
- **Factory pattern** for dependency injection
- **No direct dependencies** on concrete implementations

---

## 🔐 API Routes

### Public Routes

| Method | Endpoint       | Description                             |
| ------ | -------------- | --------------------------------------- |
| POST   | `/user`        | Create a new user                       |
| POST   | `/user/signin` | Authenticate user and receive JWT token |

### Protected Routes (Require JWT)

| Method | Endpoint                    | Description                  | Authorization |
| ------ | --------------------------- | ---------------------------- | ------------- |
| GET    | `/user/:id`                 | Get user by ID               | Any user      |
| PUT    | `/user/:id`                 | Update user                  | Admin only    |
| POST   | `/person`                   | Create a new person          | Any user      |
| POST   | `/address`                  | Create a new address         | Any user      |
| GET    | `/address/person/:personId` | Get addresses by person      | Any user      |
| POST   | `/category`                 | Create a new category        | Any user      |
| POST   | `/product`                  | Create a new product         | Any user      |
| GET    | `/product/:id`              | Get product by ID            | Any user      |
| GET    | `/product`                  | Get all products (paginated) | Any user      |
| PUT    | `/product/:id`              | Update product               | Any user      |
| DELETE | `/product/:id`              | Delete product               | Any user      |

---

## 💡 Usage Examples

### 1. Create a User

```bash
curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "password": "securepassword123",
    "role": "admin"
  }'
```

### 2. Sign In

```bash
curl -X POST http://localhost:3000/user/signin \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "password": "securepassword123"
  }'
```

### 3. Create a Product (Protected Route)

```bash
curl -X POST http://localhost:3000/product \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Laptop Dell XPS 13",
    "description": "High-performance laptop for developers",
    "image_url": "https://example.com/laptop.jpg",
    "price": 1299.99,
    "categories": [
      {"name": "Electronics"},
      {"name": "Computers"}
    ]
  }'
```

### 4. Update User (Admin Only)

```bash
curl -X PUT http://localhost:3000/user/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "username": "updated_username",
    "role": "manager"
  }'
```

### 5. Get All Products

```bash
curl -X GET "http://localhost:3000/product?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run start:dev          # Start with hot reload
npm run dev               # Alternative dev command

# Building
npm run build             # Build for production

# Code Quality
npm run lint              # Run ESLint
npm run lint:fix          # Fix ESLint issues
npm run format            # Format code with Prettier

# Database
npm run typeorm:migrate   # Run migrations
```

### Adding New Features

1. **Create Entity Interface** in `src/entities/models/`
2. **Create TypeORM Entity** in `src/entities/`
3. **Create Repository Interface** in `src/repositories/`
4. **Implement Repository** in `src/repositories/typeorm/`
5. **Create Use Cases** in `src/use-cases/[entity]/`
6. **Create Factory** in `src/use-cases/[entity]/factory/`
7. **Create Controller** in `src/http/controllers/[entity]/`
8. **Add Routes** in `src/http/controllers/[entity]/routes.ts`

### Database Migrations

```bash
# Generate new migration
npx typeorm migration:generate -d ./build/lib/typeorm/typeorm.js src/migrations/YourMigrationName

# Run migrations
npx typeorm migration:run -d ./build/lib/typeorm/typeorm.js

# Revert last migration
npx typeorm migration:revert -d ./build/lib/typeorm/typeorm.js
```

---

## 🗺️ Roadmap

### ✅ Completed

- [x] Core architecture with SOLID principles
- [x] JWT authentication system
- [x] Role-based authorization system (admin, user, manager, viewer)
- [x] User, Product, Category, Person, Address entities
- [x] TypeORM integration with migrations
- [x] Repository pattern implementation
- [x] Use cases organization by entity
- [x] Error handling system
- [x] Generic authorization middleware
- [x] User update functionality with validation

### 🔄 In Progress

- [ ] Automated testing with Jest
- [ ] API documentation with Swagger/OpenAPI

### 📋 Planned

- [ ] Advanced pagination and filtering
- [ ] Email notification system
- [ ] Docker containerization
- [ ] CI/CD pipeline
- [ ] Performance monitoring
- [ ] Rate limiting
- [ ] Caching layer (Redis)
- [ ] Audit logging system
- [ ] Multi-tenant support

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Felipe Galobart**

- GitHub: [@felipegalobart](https://github.com/felipegalobart)

---

> 🧠 **Project Context**: Built during mentor-led sessions, focusing on real-world architecture and gradual implementation of best practices. This project serves as a solid foundation for scalable service order management systems.

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ and SOLID principles

</div>
