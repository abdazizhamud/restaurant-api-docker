# Restaurant API

A RESTful API for managing restaurant menus and user authentication, built with Express.js, PostgreSQL, and Prisma ORM. This project is fully containerized with Docker for easy deployment and scalability.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)

---

## 🎯 Project Overview

The Restaurant API is a backend service designed to manage restaurant operations. It provides:

- **Menu Management**: Create, read, update, and delete restaurant menu items with details like name, description, price, and category
- **User Authentication**: Secure user sign-in with JWT token generation and bcrypt password hashing
- **Database Management**: PostgreSQL database with Prisma ORM for reliable data persistence
- **Docker Support**: Containerized application for consistent development and production environments

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | 20-alpine | JavaScript runtime |
| **Express.js** | ^5.2.1 | Web framework |
| **PostgreSQL** | 15-alpine | Database |
| **Prisma** | ^7.5.0 | ORM and database toolkit |
| **Docker** | Latest | Containerization |
---

## 📁 Folder Structure

```
restaurant-api-docker/
├── src/
│   ├── config/
│   │   └── db.js                 # Database connection configuration
│   ├── controllers/
│   │   ├── auth.controller.js    # Authentication logic (sign-in, JWT)
│   │   └── menu.controller.js    # Menu CRUD operations
│   ├── routes/
│   │   └── menu.routes.js        # Menu endpoints routes
│   └── generated/
│       └── prisma/               # Auto-generated Prisma client
├── prisma/
│   ├── schema.prisma             # Database schema definition
│   ├── seed.js                   # Database seeding script
│   └── migrations/               # Database migration history
├── tests/                        # Test files directory
├── index.js                      # Application entry point
├── package.json                  # Dependencies and scripts
├── Dockerfile                    # Docker image configuration
├── docker-compose.yml            # Docker services orchestration
├── prisma.config.ts              # Prisma configuration
└── README.md                     # This file
```

---

## 🚀 Getting Started

### Prerequisites

- Docker and Docker Compose installed, OR
- Node.js 20+ and PostgreSQL 15+ installed locally

### Option 1: Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd restaurant-api-docker
   ```

2. **Start the application**
   ```bash
   docker-compose up --build
   ```

3. **Access the API**
   - Base URL: `http://localhost:5000`
   - API endpoints: `http://localhost:5000/api/v1/menu`

4. **Stop the application**
   ```bash
   docker-compose down
   ```

### Option 2: Local Development Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/restaurant"
   JWT_SECRET="your-secret-key-here"
   JWT_EXPIRES_IN="7d"
   ```

3. **Set up the database**
   ```bash
   npx prisma migrate deploy
   npx prisma db seed
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Access the API**
   - Base URL: `http://localhost:5000`

### Available Scripts

```bash
npm run dev    # Start development server with auto-reload
npm run seed   # Seed the database with initial data
```

---

## 📡 API Endpoints

### Base URL
```
http://localhost:5000/api/v1
```

### Health Check

**GET** `/`
- Returns a simple health check response
- **Response:** `Hello World!`

---

### Menu Endpoints

#### 1. Get All Menus

**GET** `/menu`

Retrieve all restaurant menu items.

**Request:**
```bash
curl http://localhost:5000/api/v1/menu
```

**Response (200 OK):**
```json
{
  "took": 45,
  "status": "OK",
  "data": {
    "menus": [
      {
        "id": 1,
        "name": "Margherita Pizza",
        "description": "Classic pizza with tomato, mozzarella, and basil",
        "price": 12.99,
        "category": "Main Course"
      },
      {
        "id": 2,
        "name": "Caesar Salad",
        "description": "Fresh romaine lettuce with parmesan and croutons",
        "price": 8.99,
        "category": "Salad"
      }
    ]
  },
  "message": "Menus fetched successfully",
  "errors": null
}
```

**Response (404 Not Found):**
```json
{
  "took": 10,
  "status": "Not Found",
  "data": null,
  "message": "No menus found",
  "errors": null
}
```

---

#### 2. Get Menu by ID

**GET** `/menu/:id`

Retrieve a specific menu item by its ID.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| id | integer | Menu item ID |

**Request:**
```bash
curl http://localhost:5000/api/v1/menu/1
```

**Response (200 OK):**
```json
{
  "message": "Menu fetched successfully",
  "menu": {
    "id": 1,
    "name": "Margherita Pizza",
    "description": "Classic pizza with tomato, mozzarella, and basil",
    "price": 12.99,
    "category": "Main Course"
  }
}
```

**Response (404 Not Found):**
```json
{
  "message": "Menu not found"
}
```

---

#### 3. Create Menu

**POST** `/menu`

Create a new menu item.

**Request Body:**
```json
{
  "name": "Spaghetti Carbonara",
  "description": "Traditional Italian pasta with eggs, cheese, and pancetta",
  "price": 14.99,
  "category": "Main Course"
}
```

**Request:**
```bash
curl -X POST http://localhost:5000/api/v1/menu \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Spaghetti Carbonara",
    "description": "Traditional Italian pasta with eggs, cheese, and pancetta",
    "price": 14.99,
    "category": "Main Course"
  }'
```

**Response (201 Created):**
```json
{
  "took": 35,
  "status": "OK",
  "data": {
    "menu": {
      "id": 3,
      "name": "Spaghetti Carbonara",
      "description": "Traditional Italian pasta with eggs, cheese, and pancetta",
      "price": 14.99,
      "category": "Main Course"
    }
  },
  "message": "Menu created successfully",
  "errors": null
}
```

**Response (400 Bad Request - Missing Fields):**
```json
{
  "took": 5,
  "status": "Bad Request",
  "data": null,
  "message": "Validation failed",
  "errors": "name, description, price, and category are required"
}
```

**Response (400 Bad Request - Invalid Price):**
```json
{
  "took": 5,
  "status": "Bad Request",
  "data": null,
  "message": "Validation failed",
  "errors": "price must be a valid positive number"
}
```

**Required Fields:**
| Field | Type | Validation |
|-------|------|-----------|
| name | string | Required |
| description | string | Required |
| price | number | Required, must be positive |
| category | string | Required |

---

#### 4. Update Menu

**PUT** `/menu/:id`

Update an existing menu item.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| id | integer | Menu item ID |

**Request Body:**
```json
{
  "name": "Updated Menu Name",
  "description": "Updated description",
  "price": 15.99,
  "category": "Updated Category"
}
```

**Request:**
```bash
curl -X PUT http://localhost:5000/api/v1/menu/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Pizza",
    "description": "Premium pizza with fresh ingredients",
    "price": 15.99,
    "category": "Main Course"
  }'
```

**Response (200 OK):**
```json
{
  "took": 40,
  "status": "OK",
  "data": {
    "menu": {
      "id": 1,
      "name": "Updated Pizza",
      "description": "Premium pizza with fresh ingredients",
      "price": 15.99,
      "category": "Main Course"
    }
  },
  "message": "Menu updated successfully",
  "errors": null
}
```

---

#### 5. Delete Menu

**DELETE** `/menu/:id`

Delete a menu item.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| id | integer | Menu item ID |

**Request:**
```bash
curl -X DELETE http://localhost:5000/api/v1/menu/1
```

**Response (200 OK):**
```json
{
  "took": 25,
  "status": "OK",
  "data": null,
  "message": "Menu deleted successfully",
  "errors": null
}
```

**Response (404 Not Found):**
```json
{
  "message": "Menu not found"
}
```

---

### Authentication Endpoints (Planned)

The authentication controller is implemented but not yet integrated into the routing. The following endpoint structure is prepared for future use:

#### Sign In

**POST** `/auth/signin`

Authenticate a user and receive a JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Expected Response (200 OK):**
```json
{
  "took": 50,
  "message": "login successful",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  },
  "status": "yeyy",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "errors": null
}
```

---

## 🗄️ Database Models

### User Model

```prisma
model User {
  id       Int     @id @default(autoincrement())
  name     String
  email    String  @unique
  password String
  isAdmin  Boolean
}
```

**Fields:**
| Field | Type | Description |
|-------|------|-------------|
| id | Int | Primary key, auto-incremented |
| name | String | User's full name |
| email | String | Unique email address |
| password | String | Hashed password (bcryptjs) |
| isAdmin | Boolean | Admin privilege flag |

### Menu Model

```prisma
model Menu {
  id          Int     @id @default(autoincrement())
  name        String
  description String
  price       Float
  category    String
}
```

**Fields:**
| Field | Type | Description |
|-------|------|-------------|
| id | Int | Primary key, auto-incremented |
| name | String | Menu item name |
| description | String | Detailed description |
| price | Float | Item price |
| category | String | Menu category (e.g., Main Course, Salad) |

---

## 🔒 Response Format

All API responses follow a consistent format:

```json
{
  "took": 45,
  "status": "OK",
  "data": {
    "menus": []
  },
  "message": "Descriptive message",
  "errors": null
}
```

**Common Status Codes:**
- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `400 Bad Request` - Validation error
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---
