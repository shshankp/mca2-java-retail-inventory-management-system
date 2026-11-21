# RIMS – Retail Inventory Management System

A role-based retail inventory platform for product catalogue management, location-level stock operations, purchase and sales orders, supplier records, stock transfers, and operational analytics. The interface presents three RIMS roles: Admin, Store Manager, and Customer.

---

## 1. Tech Stack Overview

- **Backend:** Java 21, Spring Boot 3.2.x, Spring Security (JWT-based stateless auth), Spring Data JPA, Hibernate, MySQL, Redis (session and catalog caching), RabbitMQ (async threshold notifications).
- **Frontend:** React, Vite, Tailwind CSS, React Router, Chart.js (dashboard visualization), React Hook Form, Axios (with auth interceptors).
- **DevOps:** Docker, Docker Compose, GitHub Actions CI/CD, AWS EC2 / ECR.

---

## 2. Directory Structure

```
├── backend/
│   ├── src/main/java/com/iwms/             # Java source directory
│   │   ├── config/                         # Security, JWT, Redis, Web MVC Config
│   │   ├── controller/                     # REST Endpoints
│   │   ├── dto/                            # Data Transfer Objects (Requests & Responses)
│   │   ├── entity/                         # Hibernate Database Entities
│   │   ├── exception/                      # Global Exception Handlers
│   │   ├── repository/                     # Database Repositories (JPA)
│   │   └── service/                        # Business Logic Implementations
│   ├── pom.xml                             # Maven Dependencies Configuration
│   └── Dockerfile                          # Backend Containerization
│
├── frontend/
│   ├── src/                                # Frontend source code
│   │   ├── assets/                         # Application logos, graphics, global styles
│   │   ├── components/                     # Reusable UI Components (Sidebar, Charts, Table)
│   │   ├── context/                        # Global state managers (AuthContext)
│   │   ├── pages/                          # Role-based dashboards & data management forms
│   │   ├── App.jsx                         # React routing & page layouts
│   │   └── main.jsx                        # Entry point
│   ├── package.json                        # Node.js dependencies
│   ├── tailwind.config.js                  # Tailwind configuration
│   └── Dockerfile                          # Frontend Dev/Prod Containerization
│
├── docker-compose.yml                      # Local Orchestration (MySQL, Redis, RabbitMQ, Apps)
└── SDLC.md                                 # Software Development Life Cycle details
```

---

## 3. Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Java 21 JDK](https://adoptium.net/) (if running backend locally without Docker)
- [Node.js (v18+) & npm](https://nodejs.org/) (if running frontend locally without Docker)

### Option A: Running with Docker Compose (Recommended)
You can start the entire stack—including the MySQL database, Redis caching server, RabbitMQ broker, Spring Boot backend, and React frontend—with a single command:

```bash
docker-compose up --build
```
Once initialized, visit:
- **RIMS UI:** `http://localhost:5173`
- **Spring Boot API:** `http://localhost:8081` (host port; container port 8080)
- **RabbitMQ Dashboard:** `http://localhost:15672` (Username: `guest`, Password: `guest`)

### Option B: Local Development Setup

#### 1. Database & Services Setup
Ensure you have MySQL, Redis, and RabbitMQ running on their default ports. Create a MySQL schema named `iwms_db` (the internal schema name is retained).

#### 2. Backend Setup
1. Navigate to `/backend`
2. Update database credentials in `src/main/resources/application.properties`.
3. Package and run the project:
   ```bash
   ./mvnw spring-boot:run
   ```

#### 3. Frontend Setup
1. Navigate to `/frontend`
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Start the Vite server:
   ```bash
   npm run dev
   ```

---

## 4. User Roles & Demo Credentials

The RIMS interface exposes exactly three application roles:

| Username | Password | RIMS role | Main access |
| :--- | :--- | :--- | :--- |
| `admin` | `admin123` | **Admin** | User administration, master data, inventory, orders, suppliers, transfers, and reports |
| `manager` | `manager123` | **Store Manager** | Assigned-store operations, stock monitoring, purchase/sales order processing, transfers, and location-level reporting |
| `customer` | `customer123` | **Customer** | Browse the product catalogue, place sales orders, and view own order history/status |

These are development/demo credentials. Change them before any non-local deployment. Existing internal enum values and database identifiers are retained for compatibility; the UI labels `WAREHOUSE_MANAGER` as **Store Manager**. Legacy role enum values remain readable for existing database rows but cannot be assigned to new users through the RIMS user-registration screen.

## 5. REST API Documentation Summary

All endpoints (excluding `/api/auth/login`) require a Bearer JWT Token in the Authorization header: `Authorization: Bearer <JWT_TOKEN>`.

### Authentication
- `POST /api/auth/login` - Authenticate users and return JWT + Role details.

### User Management (Admin Only)
- `GET /api/users` - Fetch list of all system users.
- `POST /api/users` - Register a new user and assign a role.

### Inventory & Products
- `GET /api/products` - List all products in catalog.
- `POST /api/products` - Create new product SKU (Admin/Manager).
- `GET /api/inventory` - Get current stock levels across all warehouses.
- `PUT /api/inventory/adjust` - Adjust inventory stock levels (Manager/Staff).

### Purchase & Sales Orders
- `GET /api/orders/purchase` - Retrieve purchase orders.
- `POST /api/orders/purchase` - Create new purchase order.
- `PUT /api/orders/purchase/{id}/status` - Update PO status (e.g., Approve, Receive).
- `POST /api/orders/sales` - Create a sales order (Sales Team).

### Stock Transfers
- `GET /api/transfers` - View all inter-warehouse stock transfer requests.
- `POST /api/transfers` - Create a transfer request.
- `PUT /api/transfers/{id}/approve` - Approve transfer and execute stock movement (Manager).
