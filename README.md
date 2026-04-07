# Ecommerce API

A RESTful API for managing an e-commerce platform built with Node.js, Express, and MongoDB.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Server](#running-the-server)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Database Schema](#database-schema)
- [User Journey](#user-journey)

---

## ✨ Features

- **User Authentication** - Registration and login with JWT tokens
- **Password Hashing** - Secure password storage with bcrypt
- **Product Management** - CRUD operations for products
- **Shopping Cart** - Add, view, and clear cart items
- **Order Management** - Create and track orders
- **MongoDB Integration** - Cloud database with Atlas
- **Environment Configuration** - Secure environment variables

---

## 🛠 Tech Stack

- **Runtime:** Node.js (v22.19.0+)
- **Framework:** Express.js 5.2.1
- **Database:** MongoDB 7.1.1 with Mongoose 9.4.1
- **Authentication:** JWT (jsonwebtoken 9.0.3)
- **Security:** bcrypt 6.0.0
- **Environment:** dotenv 17.4.0

---

## 📦 Prerequisites

- Node.js v22.19.0 or higher
- npm or yarn
- MongoDB Atlas account (free tier available)
- API testing tool (Postman, Thunder Client, or cURL)

---

## 🚀 Installation

1. **Navigate to the project directory:**
```bash
cd c:\Users\Asus\OneDrive\Desktop\nodejs\Ecommerce-API
```

2. **Install dependencies:**
```bash
npm install
```

This will install all required packages:
- `bcrypt` - Password hashing
- `dotenv` - Environment variables
- `express` - Web framework
- `jsonwebtoken` - JWT authentication
- `mongodb` - Database driver
- `mongoose` - ODM for MongoDB

---

## 🔧 Configuration

The `.env` file contains all configuration variables:

```env
DB_URL=mongodb+srv://dumpmailtr_db_user:Tirthrana1712@ecommerce-api.xyipycq.mongodb.net/?appName=Ecommerce-API
PORT=9000
JWT_SECRET=Tirthrana1712
```

**Important:** Keep `.env` file secure and never commit it to version control.

---

## ▶️ Running the Server

Start the server with:

```bash
npm start
```

or

```bash
node app.js
```

**Expected Output:**
```
Connected to MongoDB
Server is running on port 9000
```

---

## 📁 Project Structure

```
Ecommerce-API/
├── app.js                     # Main application file
├── package.json               # Dependencies and scripts
├── .env                       # Environment variables
├── controllers/               # Business logic
│   ├── usercontroller.js      # User auth & profile
│   ├── productcontroller.js   # Product operations
│   ├── cartcontroller.js      # Cart management
│   └── ordercontroller.js     # Order processing
├── models/                    # Database schemas
│   ├── usermodel.js           # User schema
│   ├── productmodel.js        # Product schema
│   ├── cartmodel.js           # Cart schema
│   └── ordermodel.js          # Order schema
├── Routes/                    # API endpoints
│   ├── userRoute.js           # /users endpoints
│   ├── productRoute.js        # /products endpoints
│   ├── cartRoute.js           # /carts endpoints
│   └── orderRoute.js          # /orders endpoints
└── Middleware/                # Custom middleware
    └── auth.js                # Authentication middleware
```

---

## 🔌 API Endpoints

### **Users - Authentication & Profile**

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | `/users/register` | Register new user | `{ name, email, password }` |
| POST | `/users/login` | User login | `{ email, password }` |
| GET | `/users` | Get all users | - |
| GET | `/users/:id` | Get user by ID | - |

---

### **Products**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | Get all products |
| GET | `/products/:id` | Get product by ID |

---

### **Shopping Cart**

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | `/carts` | Create cart | `{ userId, product }` |
| GET | `/carts/:userId` | Get user's cart | - |
| DELETE | `/carts/clear/:id` | Clear cart | - |

---

### **Orders**

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | `/orders` | Create order | `{ userId, products, totalPrice, shippingAddress }` |
| GET | `/orders` | Get all orders | - |
| GET | `/orders/:id` | Get order by ID | - |

---

## 🔐 Authentication

### Registration Flow
```
1. User submits: { name, email, password }
2. Check if email already exists
3. Hash password with bcrypt (10 salt rounds)
4. Save user to database
5. Generate JWT token
6. Return token
```

### Login Flow
```
1. User submits: { email, password }
2. Find user by email
3. Compare submitted password with stored hash
4. If valid, generate JWT token
5. Return token in Authorization header
```

### JWT Token Structure
```
Header: Bearer <token>
Payload: { id: userId, email: userEmail }
Expiry: 1 hour
Secret: process.env.JWT_SECRET
```

---

## 💾 Database Schema

### **User**
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, 8-72 chars, with special chars),
  createdAt: Date,
  updatedAt: Date
}
```

### **Product**
```javascript
{
  name: String (required),
  price: Number (required),
  description: String (required),
  category: String (required),
  image: String (required),
  stock: Number (required),
  ratings: Number (default: 0)
}
```

### **Cart**
```javascript
{
  userId: ObjectId (ref: User),
  items: [{
    productId: ObjectId (ref: Product),
    quantity: Number (default: 1)
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### **Order**
```javascript
{
  userId: ObjectId (ref: User),
  items: [{
    productId: ObjectId (ref: Product),
    quantity: Number
  }],
  totalPrice: Number,
  shippingAddress: String,
  paymentStatus: String (default: "pending"),
  orderStatus: String (default: "placed"),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 👥 User Journey

### Complete E-commerce Flow

```
1. REGISTRATION
   ├─ POST /users/register
   ├─ Password hashed & stored
   └─ JWT token received

2. LOGIN
   ├─ POST /users/login
   ├─ Credentials verified
   └─ JWT token received

3. BROWSE PRODUCTS
   ├─ GET /products
   └─ View all available items

4. VIEW PRODUCT DETAILS
   ├─ GET /products/:id
   └─ See full product information

5. ADD TO CART
   ├─ POST /carts
   ├─ userId + product selected
   └─ Cart created/updated

6. VIEW CART
   ├─ GET /carts/:userId
   ├─ See all items in cart
   └─ Product details populated

7. PLACE ORDER
   ├─ POST /orders
   ├─ Cart items → Order
   ├─ Total calculated
   └─ Shipping address added

8. TRACK ORDER
   ├─ GET /orders/:id
   └─ View order status

9. CLEAR CART
   ├─ DELETE /carts/clear/:id
   └─ Cart emptied after order
```

---

## 📝 Example API Calls

### Register User
```bash
curl -X POST http://localhost:9000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
```

### Login User
```bash
curl -X POST http://localhost:9000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
```

### Get All Products
```bash
curl -X GET http://localhost:9000/products
```

### Create Order
```bash
curl -X POST http://localhost:9000/orders \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user_id_here",
    "items": [
      {"productId": "product_id", "quantity": 2}
    ],
    "totalPrice": 99.99,
    "shippingAddress": "123 Main St, City, Country"
  }'
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Cannot find module 'bcrypt' | Run `npm install bcrypt` |
| Cannot connect to MongoDB | Check `.env` DB_URL and internet connection |
| Port 9000 already in use | Change PORT in `.env` or kill process using the port |
| JWT token invalid | Ensure JWT_SECRET matches in `.env` |
| CORS errors | Add CORS middleware if accessing from frontend |

---

## 🔒 Security Notes

- ⚠️ Never commit `.env` file with sensitive data
- ⚠️ Keep JWT_SECRET complex and unique
- ⚠️ Use HTTPS in production
- ⚠️ Implement rate limiting for API endpoints
- ⚠️ Validate all user inputs on the server
- ⚠️ Use environment variables for sensitive data

---

## 📧 Contact & Support

For issues or questions, ensure:
1. MongoDB Atlas is accessible
2. All dependencies are installed (`npm install`)
3. `.env` file is properly configured
4. Node.js version is v22.19.0 or higher

---

## 📄 License

ISC License

---

**Happy Coding! 🚀**
