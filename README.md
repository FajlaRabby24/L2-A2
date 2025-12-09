## Backend API Development

Live URL: [https://l2-a2-rust.vercel.app](https://l2-a2-rust.vercel.app)

---

## 🚀 Project Overview

**Backend API Development** is a RESTful API built with Node.js, Express, TypeScript, and PostgreSQL. It includes user authentication, secure password hashing, environment variable configuration, and database integration using PostgreSQL.


---

## ✨ Features

- **User Authentication** using JWT
- **Password Hashing** with bcrypt
- **PostgreSQL Integration** using pg
- **Environment Variable Support** via dotenv
- **Modular Project Structure** with TypeScript
- **Production Ready Deployment** on Vercel
- **Secure API Endpoints** with middleware

---

## 🛠️ Technology Stack

### **Backend Framework**

- Node.js
- Express.js

### **Programming Language**

- TypeScript (via tsx runtime)

### **Database**

- PostgreSQL
- pg (PostgreSQL client)

### **Authentication & Security**

- JSON Web Token (jsonwebtoken)
- bcrypt for password hashing

### **Environment Configuration**

- dotenv

### **Dev Tools**

- tsx
- TypeScript

---

## ⚙️ Setup Instructions

### **1. Clone the repository**

```bash
git clone https://github.com/FajlaRabby24/L2-A2
cd L2-A2
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Create a `.env` file in the project root**

```env
JWT_SECRET="*****"
CONNECTION_STR="postgres string"
```

### **4. Start Development Server**

```bash
npm run dev
```

This uses:

```
"dev": "tsx watch ./src/server.ts"
```

### **5. Build the Project (Optional)**

```bash
npm run build
```

---

## ▶️ Usage Instructions

### **Start API**

```bash
npm run dev
```

The server will start using tsx and watch mode for hot reload.

### **Test Endpoints**

Use **Postman**, **Insomnia**, or any REST client:

- Register User
- Login User
- Authenticate routes using Bearer Token
- CRUD operations depending on your API structure

---

## 📦 package.json (Reference)

Your project uses the following key dependencies:

- express
- pg
- jsonwebtoken
- bcrypt
- dotenv
- tsx
- typescript

Built for modern backend workflow with strong type‑safety and efficient runtime.

---
