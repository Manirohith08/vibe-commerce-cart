text
# Vibe Commerce - Shopping Cart Application

Full-stack e-commerce shopping cart built with React, Node.js, Express, and MongoDB.

## Features

- Product catalog with Fake Store API integration
- Add/remove items from cart
- Update item quantities
- Real-time cart count badge
- Checkout with customer information
- Order receipt display
- MongoDB persistence
- Responsive design

## Tech Stack

**Backend:** Node.js, Express, MongoDB, Mongoose, Axios  
**Frontend:** React 18, React Router, Axios, CSS3  
**Database:** MongoDB (local or Atlas)

## Installation

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm

### Backend Setup

cd backend
npm install

text

Create `backend/.env`:
MONGODB_URI=mongodb://localhost:27017/vibecommerce
PORT=5000

text

Start backend:
npm start

text

### Frontend Setup

cd frontend
npm install
npm start

text

Backend runs on `http://localhost:5000`  
Frontend runs on `http://localhost:3000`

## MongoDB Setup

**Option 1: Local**
mongod

text

**Option 2: Atlas (Recommended)**
1. Create account at mongodb.com/cloud/atlas
2. Create free M0 cluster
3. Get connection string
4. Update MONGODB_URI in backend/.env

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Cart
- `GET /api/cart` - Get cart
- `POST /api/cart` - Add item (body: {productId, quantity})
- `PUT /api/cart/:id` - Update quantity (body: {quantity})
- `DELETE /api/cart/:id` - Remove item
- `DELETE /api/cart` - Clear cart

### Checkout
- `POST /api/checkout` - Process order (body: {customerName, customerEmail})

## Project Structure

vibe-commerce/
├── backend/
│ ├── models/
│ │ ├── Product.js
│ │ ├── Cart.js
│ │ └── Order.js
│ ├── routes/
│ │ ├── products.js
│ │ ├── cart.js
│ │ └── checkout.js
│ ├── .env
│ ├── server.js
│ └── package.json
├── frontend/
│ ├── public/
│ │ └── index.html
│ ├── src/
│ │ ├── components/
│ │ │ ├── ProductList.js
│ │ │ ├── Cart.js
│ │ │ └── CheckoutModal.js
│ │ ├── App.js
│ │ └── index.js
│ └── package.json
└── README.md

text

## Screenshots

Add screenshots here after running the application.

## Environment Variables

Backend `.env`:
MONGODB_URI=mongodb://localhost:27017/vibecommerce
PORT=5000

text

## Testing

1. Start MongoDB and backend server
2. Start frontend
3. Navigate to http://localhost:3000
4. Browse products and add to cart
5. Go to cart, update quantities
6. Proceed to checkout
7. Submit order and view receipt

## Future Enhancements

- User authentication
- Payment integration
- Product search/filter
- Order history
- Product reviews
- Admin dashboard

## Author

Built for Vibe Commerce Internship Assignment

## License

MIT
