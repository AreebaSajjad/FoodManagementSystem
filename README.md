# 🍕 FOODIE-PRO - Food Management System

**Web Development Project**

A full-stack web application for managing restaurant menu, orders, and inventory with Customer, Restaurant, and Admin modules.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js (Vite) |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| Styling | Custom CSS |
| Deployment | Vercel |

---

## 📁 Project Structure

```
FoodManagementSystem/
├── backend/
│   ├── models/
│   │   └── Food.js           # Food schema
│   ├── routes/
│   │   └── foodRoutes.js     # CRUD API routes
│   ├── seed.js               # Demo data seeder
│   ├── index.js              # Main Express server
│   └── .env                  # Environment variables
└── frontend/
    └── src/
        └── App.jsx           # Main React app
```

---

## 🗄️ MongoDB Schema

### Food Collection:
```json
{
  "name": "String (required)",
  "price": "Number (required)",
  "category": "String (required)",
  "description": "String"
}
```

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB Atlas account

### Step 1: Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```
MONGODB_URI=your_mongodb_atlas_connection_string
PORT=5000
```

### Step 2: Seed Demo Data

```bash
node seed.js
```

### Step 3: Start Backend

```bash
node index.js
```

Backend runs on: `http://localhost:5000`

### Step 4: Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/foods/all | Get all food items |
| POST | /api/foods/add | Add new food item |
| PUT | /api/foods/update/:id | Update food item |
| DELETE | /api/foods/delete/:id | Delete food item |

---

## 👥 Modules & Features

### 🧑‍💼 Customer Module
- Browse full restaurant menu with images
- View item name, description, and price
- Place orders with one click

### 👨‍🍳 Restaurant Module
- Add new dishes to the menu
- View full inventory table
- Edit or delete existing items

### 🛡️ Admin Module
- View total menu items count
- Track total orders placed
- Monitor live revenue in real time

### 📦 Order Module
- View all placed orders
- Track order status (Preparing)
- See order time and unique order ID
