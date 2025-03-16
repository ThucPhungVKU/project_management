# E-commerce Website Project

A full-stack e-commerce website built with React (Frontend) and Django (Backend) for selling electronic products like phones, iPads, and laptops.

## Features

### User Features
- Browse product catalog
- Search and filter products
- View product details
- Shopping cart management
- Checkout process
- Order history
- User authentication
- Profile management

### Admin Features
- Product management (CRUD operations)
- Order management
- User management
- Sales statistics
- Inventory tracking

## Technology Stack

### Frontend
- React 18
- Redux Toolkit (State Management)
- React Router (Navigation)
- Tailwind CSS (Styling)
- Axios (API Requests)
- Vite (Build Tool)

### Backend
- Django 5.0
- Django REST Framework
- PostgreSQL Database
- JWT Authentication
- CORS Headers

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or later)
- Python (v3.8 or later)
- PostgreSQL (v12 or later)
- Git

## Project Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ecommerce_project
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
touch .env
```

Add the following to your `.env` file:
```env
DEBUG=True
SECRET_KEY=your-secret-key-here
DB_NAME=ecommerce_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
```

#### Database Setup
```bash
# Create database
# Using psql:
psql -U postgres
CREATE DATABASE ecommerce_db;
\q

# Apply migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Populate database with sample data
python manage.py populate_db

# Run the development server
python manage.py runserver
```

The `populate_db` command will create:
- Sample product categories (Phones, Laptops, Tablets, Accessories)
- Sample products with images
- Default admin user (if not exists)

Sample Products:
- iPhone 13 Pro (Phones category)
- iPhone 14 Pro Max (Phones category)
- MacBook Pro 14" (Laptops category)
- iPad Pro 12.9" (Tablets category)
- AirPods Pro (Accessories category)

Note: Make sure your media directory exists and has proper permissions before running populate_db.

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file
touch .env
```

Add the following to your `.env` file:
```env
VITE_API_URL=http://localhost:8000/api
```

```bash
# Start the development server
npm run dev
```

## Deployment

### Frontend Deployment (Firebase)

1. Install Firebase CLI:
```