# Grabbite Food Ordering App – Project Documentation

## Overview
GrabBite is a full‑stack food ordering application built using the MERN stack. This project includes complete user functionality, admin panel operations, restaurant dashboard, product management, order tracking, coupons, reviews, payments, and more.



## Key Features

### ✅ User Side
- User signup & sigin 
- Browse restaurants & food items
- Add to cart, update quantity, remove items
- Apply coupons during checkout
- stripe checkout integration
- Order tracking 
- Reviews & ratings
- Profile, address management, order history

### 🧑‍🍳 Restaurant/Admin Side
- Menu management
- Add/Edit/Delete items
- Categories & pricing management
- Orders dashboard
- Reviews moderation

### 🔑 Authentication
- JWT‑token based
- Middleware‑based route protection
- Admin + Restaurant + User roles

### 💳 Payment System
- stripe integration
- Payment verification

## Technology Stack

### Frontend
- React.js
- Redux Toolkit
- Axios
- React Router DOM
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer for image upload

### Other Services
- Cloudinary for images
- Render.com for front end and backend deploy

## Folder Structure

project-root/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── utils/
│   └── package.json
│
├── server/                 # Backend API
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
││  └── server.js
│
└── README.md

## Installation & Setup

### 1️⃣ Clone Repository

git clone <repo-url>
cd project


### 2️⃣ Install Frontend

cd client
npm install
npm run dev


### 3️⃣ Install Backend
```
cd server
npm install
npm start


### 4️⃣ Environment Variables (Backend)
Create the file:

`.env`
MONGO_URI=
SESSION_SECRET=
STRIPE_SECRET_KEY=
STRIPE_PUBLIC_KEY=
CLOUDINARY_KEY=
CLOUDINARY_SECRET=
CLOUDINARY_NAME=


## Deployment

### 🚀 Frontend (Render)
- Connect GitHub repo
- Select `client` folder
- Build command: `npm run build`
- Output: `dist/`

### 🚀 Backend (Render)
- Create Web Service
- Environment → Add `.env` values
- Start command: `node server.js`
- Add CORS domain: Frontend URL

## API Overview

### Auth APIs

POST /api/signup
POST /api/login
GET  /api/logout


### Product APIs

GET    /api/items
POST   /api/items/add
PUT    /api/items/edit/:id
DELETE /api/items/delete/:id

### Cart APIs

POST /api/cart/add
GET  /api/cart
PUT  /api/cart/update
DELETE /api/cart/remove/:itemId


### Order APIs

POST /api/order/create
POST /api/payment/verify-checkout-session
GET  /api/orders
GET  /api/orders/:id

## Author
Haima Santhosh C  
Grabbite – Food Ordering App  
2025

