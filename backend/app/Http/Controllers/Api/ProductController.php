<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Product::with(['category', 'images'])->where('is_active', true);

        // Filter by category
        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        // Filter by Santiniketan tag
        if ($request->has('is_santiniketan')) {
            $query->where('is_santiniketan', $request->is_santiniketan);
        }

        // Filter by featured
        if ($request->has('is_featured')) {
            $query->where('is_featured', $request->is_featured);
        }

        // Price range filter
        if ($request->has('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }
        if ($request->has('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        // Search
        if ($request->has('search')) {
            $query->where(function($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        // Check wishlist status if user is authenticated
        if ($request->user()) {
            $productIds = $request->user()->wishlists->pluck('product_id')->toArray();
            $products = $query->paginate(12);
            
            foreach ($products->items() as $product) {
                $product->in_wishlist = in_array($product->id, $productIds);
            }
        } else {
            $products = $query->paginate(12);
        }

        return ProductResource::collection($products);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id)
    {
        $product = Product::with(['category', 'images'])->where('is_active', true)->findOrFail($id);

        // Check wishlist status if user is authenticated
        if ($request->user()) {
            $product->in_wishlist = $request->user()->wishlists()->where('product_id', $product->id)->exists();
        }

        return new ProductResource($product);
    }

    /**
     * Get featured products
     */
    public function featured(Request $request)
    {
        $query = Product::with(['category', 'images'])
            ->where('is_active', true)
            ->where('is_featured', true)
            ->orderBy('created_at', 'desc')
            ->limit(8);

        if ($request->user()) {
            $productIds = $request->user()->wishlists->pluck('product_id')->toArray();
            $products = $query->get();
            
            foreach ($products as $product) {
                $product->in_wishlist = in_array($product->id, $productIds);
            }
        } else {
            $products = $query->get();
        }

        return ProductResource::collection($products);
    }

    /**
     * Get related products
     */
    public function related(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        
        $related = Product::with(['category', 'images'])
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->where('is_active', true)
            ->limit(4)
            ->get();

        return ProductResource::collection($related);
    }
}
