<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Wishlist;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $wishlists = Wishlist::with(['product.category', 'product.images'])
            ->where('user_id', $request->user()->id)
            ->get();

        $products = $wishlists->map(function ($wishlist) {
            $product = $wishlist->product;
            $product->in_wishlist = true;
            return $product;
        });

        return ProductResource::collection($products);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $wishlist = Wishlist::firstOrCreate([
            'user_id' => $request->user()->id,
            'product_id' => $request->product_id,
        ]);

        return response()->json([
            'message' => 'Product added to wishlist',
            'wishlist' => $wishlist,
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $id)
    {
        $wishlist = Wishlist::where('user_id', $request->user()->id)
            ->where('product_id', $id)
            ->firstOrFail();

        $wishlist->delete();

        return response()->json([
            'message' => 'Product removed from wishlist',
        ]);
    }

    /**
     * Toggle wishlist status
     */
    public function toggle(Request $request, $productId)
    {
        $wishlist = Wishlist::where('user_id', $request->user()->id)
            ->where('product_id', $productId)
            ->first();

        if ($wishlist) {
            $wishlist->delete();
            return response()->json([
                'message' => 'Product removed from wishlist',
                'in_wishlist' => false,
            ]);
        } else {
            Wishlist::create([
                'user_id' => $request->user()->id,
                'product_id' => $productId,
            ]);
            return response()->json([
                'message' => 'Product added to wishlist',
                'in_wishlist' => true,
            ], 201);
        }
    }
}
