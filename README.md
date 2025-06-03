# 🛒 Shoppy Globe - Backend

Welcome to the backend of **Shoppy Globe**, an e-commerce platform that powers user registration, product management, and cart operations. This API is built with **Node.js**, **Express**, and **MongoDB**, and provides a robust foundation for your frontend shopping experience.

---

## 🔗 Repository Link

[GitHub Repo](https://github.com/Varsha-Boddapati-24/shoppyGlobe-backend.git)

---

## ✨ Features

- ✅ **User Authentication**  
  Secure registration and login using **JWT** and password hashing with **bcrypt**.

- 🛍️ **Product Management**  
  Full **CRUD** support for managing product listings.

- 🛒 **Cart Functionality**  
  Add, update, remove, and clear items from a user’s cart.

- 🛡️ **Middleware**  
  Centralized JWT authentication, and dynamic request body validation.

- 🗃️ **Database**  
  Uses **MongoDB** with **Mongoose** ODM for schema-based data modeling.

---

## ⚙️ Getting Started

### 🔧 Prerequisites

Ensure the following are installed on your machine:

- **Node.js** (v14 or later)
- **MongoDB** (local or hosted, e.g., MongoDB Atlas)

---

### 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Varsha-Boddapati-24/shoppyGlobe-backend.git
2. **Navigate to the project directory**
     ```bash
       cd shoppyGlobe-backend
3. **Install dependencies**
      ```bash
      npm i
4. **Create a .env file in the root and ad d**
    ```bash
      PORT=5000
      JWT_SECRET_KEY=your_jwt_secret
5. **Run the following command**
      ```bash
     npm run dev
## 📮 API Endpoints

### 👤 Users
- **POST** `/user/register` – Register a new user  
- **POST** `/user/login` – Log in a user  

---

### 📦 Products
- **GET** `/products` – Retrieve all products  
- **GET** `/products/:id` – Get product by ID  
- **POST** `/products` – Add a new product  
- **PUT** `/products/:id` – Update an existing product  
- **DELETE** `/products/:id` – Delete a product  

---

### 🛒 Cart
- **GET** `/cart/me` – Get the current user's cart  
- **GET** `/cart` – (Admin) View all carts  
- **POST** `/cart` – Add an item to the cart  
- **PUT** `/cart/:id` – Update quantity of a cart item  
- **DELETE** `/cart/:id` – Delete a specific item from the cart  
- **DELETE** `/cart` – Clear the entire cart for the logged-in user  


##  Contact Me
 **Email:** varshaboddapati24@gmail.com     
 **LinkedIn:** https://www.linkedin.com/in/varsha-boddapati-9a9124211/

---

**Feel free to fork, use, or modify this project! 😊**

