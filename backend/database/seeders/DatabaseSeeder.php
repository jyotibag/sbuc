<?php

namespace Database\Seeders;

use App\Models\AdminUser;
use App\Models\Banner;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        AdminUser::create([
            'name' => 'Admin',
            'email' => 'admin@sbuc.com',
            'password' => Hash::make('password'),
            'is_active' => true,
        ]);

        // Create test user
        User::create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'mobile' => '9876543210',
            'password' => Hash::make('password'),
        ]);

        // Create categories
        $categories = [
            ['name' => 'Handmade Jewelry', 'slug' => 'handmade-jewelry', 'description' => 'Beautiful handcrafted jewelry pieces'],
            ['name' => 'Sarees', 'slug' => 'sarees', 'description' => 'Traditional and modern sarees'],
            ['name' => 'Dresses', 'slug' => 'dresses', 'description' => 'Elegant dresses for all occasions'],
            ['name' => 'Kurtis', 'slug' => 'kurtis', 'description' => 'Comfortable and stylish kurtis'],
            ['name' => 'Panjabi', 'slug' => 'panjabi', 'description' => 'Traditional panjabi wear'],
        ];

        foreach ($categories as $categoryData) {
            Category::create($categoryData);
        }

        // Create banners
        Banner::create([
            'title' => 'Welcome to SBUC',
            'description' => 'Discover Santiniketan\'s finest handmade collection',
            'image' => 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200',
            'link' => '/shop',
            'is_active' => true,
            'sort_order' => 1,
        ]);

        // Create sample products
        $categories = Category::all();
        $products = [
            [
                'name' => 'Handmade Silver Necklace',
                'slug' => 'handmade-silver-necklace',
                'description' => 'Beautiful handcrafted silver necklace with traditional design',
                'handmade_description' => 'Crafted by skilled artisans in Santiniketan using traditional techniques',
                'price' => 2500,
                'discount_price' => 2000,
                'stock' => 10,
                'is_santiniketan' => true,
                'is_featured' => true,
            ],
            [
                'name' => 'Cotton Saree',
                'slug' => 'cotton-saree',
                'description' => 'Comfortable cotton saree perfect for daily wear',
                'handmade_description' => 'Handwoven with love by local weavers',
                'price' => 3500,
                'discount_price' => 2800,
                'stock' => 15,
                'is_santiniketan' => true,
                'is_featured' => true,
            ],
            [
                'name' => 'Embroidered Kurti',
                'slug' => 'embroidered-kurti',
                'description' => 'Elegant kurti with beautiful embroidery work',
                'handmade_description' => 'Hand-embroidered with traditional motifs',
                'price' => 1800,
                'discount_price' => 1500,
                'stock' => 20,
                'is_santiniketan' => true,
                'is_featured' => false,
            ],
        ];

        foreach ($products as $index => $productData) {
            $product = Product::create([
                ...$productData,
                'category_id' => $categories[$index % $categories->count()]->id,
            ]);

            // Add product images
            ProductImage::create([
                'product_id' => $product->id,
                'image_url' => 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
                'is_primary' => true,
                'sort_order' => 1,
            ]);
        }
    }
}
