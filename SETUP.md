# SBUC Setup Guide

## Quick Start

### Prerequisites
- PHP 8.2+
- Composer
- Node.js 18+
- MySQL 8.0+
- npm or yarn

### Step-by-Step Setup

#### 1. Backend Setup

```bash
# Navigate to backend
cd backend

# Install PHP dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Edit .env file and configure database:
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=sbuc
# DB_USERNAME=root
# DB_PASSWORD=your_password

# Run migrations
php artisan migrate

# Seed database with sample data
php artisan db:seed

# Start Laravel server
php artisan serve
```

Backend will run on `http://localhost:8000`

#### 2. Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:8000/api/v1" > .env

# Start development server
npm run dev
```

Frontend will run on `http://localhost:5173`

### 3. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000/api/v1

### 4. Test Credentials

**Admin:**
- Email: admin@sbuc.com
- Password: password

**Test User:**
- Email: test@example.com
- Password: password

## Configuration

### CORS Configuration

Laravel 11 handles CORS automatically. Make sure your frontend URL is allowed in `config/sanctum.php`:

```php
'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', sprintf(
    '%s%s',
    'localhost,localhost:3000,127.0.0.1,127.0.0.1:8000,::1',
    env('APP_URL') ? ','.parse_url(env('APP_URL'), PHP_URL_HOST) : ''
))),
```

### Razorpay Setup

1. Get your Razorpay keys from https://razorpay.com
2. Add to backend `.env`:
```env
RAZORPAY_KEY=your_key_id
RAZORPAY_SECRET=your_secret_key
```

3. Install Razorpay SDK (if not already installed):
```bash
cd backend
composer require razorpay/razorpay
```

### Cloudinary Setup

1. Sign up at https://cloudinary.com
2. Add to backend `.env`:
```env
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
```

## Troubleshooting

### CORS Issues
- Make sure frontend URL is in `SANCTUM_STATEFUL_DOMAINS`
- Clear Laravel cache: `php artisan config:clear`

### Database Connection Issues
- Check MySQL is running
- Verify credentials in `.env`
- Test connection: `php artisan tinker` then `DB::connection()->getPdo();`

### Frontend Build Issues
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`

## Production Deployment

### Backend
1. Set `APP_ENV=production` in `.env`
2. Run `php artisan config:cache`
3. Run `php artisan route:cache`
4. Set up proper web server (Nginx/Apache)

### Frontend
1. Build: `npm run build`
2. Serve `dist` folder with web server
3. Configure API URL for production

## Features Implemented

✅ User Authentication (Email/Mobile/Password)
✅ Product Listing with Filters
✅ Product Details
✅ Wishlist
✅ Shopping Cart
✅ Checkout (COD + Online Payment Ready)
✅ Order Management
✅ User Profile
✅ Order History
✅ Responsive Design
✅ Animations
✅ Teal Theme
✅ Custom Logo

## Next Steps

- [ ] Complete Razorpay payment integration
- [ ] Add Google OAuth login
- [ ] Implement admin panel frontend
- [ ] Add product image upload
- [ ] Add email notifications
- [ ] Add invoice generation
- [ ] Add product reviews
- [ ] Add search functionality
- [ ] Add newsletter subscription
