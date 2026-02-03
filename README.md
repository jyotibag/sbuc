# SBUC - Shibani Banerjee's Unique Collection

A complete production-ready online shopping website for Santiniketan handmade products.

## Tech Stack

- **Frontend**: React (Vite + React Router) + Tailwind CSS + Framer Motion
- **Backend**: Laravel 11 (REST API)
- **Auth**: Laravel Sanctum
- **Payment**: Razorpay (online) + Cash on Delivery
- **Database**: MySQL
- **Icons**: Lucide React
- **Image handling**: Cloudinary (config ready)

## Features

### Frontend
- ✅ Responsive design (mobile-first)
- ✅ Animated hero banner
- ✅ Product listing with filters and sorting
- ✅ Product details with image gallery
- ✅ Wishlist functionality
- ✅ Shopping cart
- ✅ Checkout with COD and online payment options
- ✅ User authentication (Login/Register)
- ✅ User profile management
- ✅ Order history
- ✅ Beautiful teal gradient theme
- ✅ Smooth animations with Framer Motion

### Backend
- ✅ RESTful API
- ✅ Laravel Sanctum authentication
- ✅ Product CRUD
- ✅ Category management
- ✅ Wishlist management
- ✅ Cart management
- ✅ Order management
- ✅ Payment integration ready
- ✅ Admin panel ready

## Installation

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
composer install
```

3. Copy environment file:
```bash
cp .env.example .env
```

4. Generate application key:
```bash
php artisan key:generate
```

5. Configure database in `.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=sbuc
DB_USERNAME=root
DB_PASSWORD=
```

6. Run migrations:
```bash
php artisan migrate
```

7. Seed database:
```bash
php artisan db:seed
```

8. Start Laravel development server:
```bash
php artisan serve
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment file:
```bash
cp .env.example .env
```

4. Configure API URL in `.env`:
```env
VITE_API_URL=http://localhost:8000/api/v1
```

5. Start development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Default Credentials

### Admin
- Email: `admin@sbuc.com`
- Password: `password`

### Test User
- Email: `test@example.com`
- Password: `password`

## API Endpoints

### Public Routes
- `GET /api/v1/products` - List products
- `GET /api/v1/products/{id}` - Get product details
- `GET /api/v1/products/featured` - Get featured products
- `GET /api/v1/categories` - List categories
- `GET /api/v1/banners` - List banners
- `POST /api/v1/register` - Register user
- `POST /api/v1/login` - Login user

### Protected Routes (Requires Authentication)
- `GET /api/v1/me` - Get current user
- `POST /api/v1/logout` - Logout
- `GET /api/v1/profile` - Get profile
- `PUT /api/v1/profile` - Update profile
- `GET /api/v1/wishlist` - Get wishlist
- `POST /api/v1/wishlist` - Add to wishlist
- `DELETE /api/v1/wishlist/{id}` - Remove from wishlist
- `GET /api/v1/cart` - Get cart
- `POST /api/v1/cart` - Add to cart
- `PUT /api/v1/cart/{id}` - Update cart item
- `DELETE /api/v1/cart/{id}` - Remove from cart
- `GET /api/v1/orders` - List orders
- `POST /api/v1/orders` - Create order
- `GET /api/v1/orders/{id}` - Get order details

## Project Structure

```
online-shop/
├── backend/                 # Laravel API
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   └── Api/     # API Controllers
│   │   │   └── Resources/  # API Resources
│   │   └── Models/         # Eloquent Models
│   ├── database/
│   │   ├── migrations/     # Database migrations
│   │   └── seeders/        # Database seeders
│   └── routes/
│       └── api.php         # API routes
│
└── frontend/                # React Frontend
    ├── src/
    │   ├── components/     # React components
    │   ├── contexts/        # React contexts
    │   ├── pages/          # Page components
    │   ├── services/       # API services
    │   └── App.tsx         # Main app component
    └── package.json
```

## Design Features

- **Color Theme**: Teal Blue, Teal Green, Teal Gradient
- **Animations**: Smooth transitions with Framer Motion
- **Responsive**: Mobile-first design
- **UI/UX**: Premium, elegant, feminine vibe
- **Logo**: Custom SVG logo with teal gradient

## Payment Integration

Razorpay integration is ready. Configure your Razorpay keys in the backend `.env`:

```env
RAZORPAY_KEY=your_key_here
RAZORPAY_SECRET=your_secret_here
```

## Cloudinary Configuration

Configure Cloudinary in backend `.env`:

```env
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
```

## Production Deployment

1. Build frontend:
```bash
cd frontend
npm run build
```

2. Configure production environment variables

3. Run migrations:
```bash
php artisan migrate --force
```

4. Optimize Laravel:
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## License

MIT License

## Support

For issues and questions, please contact the development team.
