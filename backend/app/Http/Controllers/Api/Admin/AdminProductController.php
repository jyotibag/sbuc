<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AdminProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with(['category', 'images'])
            ->orderBy('created_at', 'desc')
            ->paginate(50);

        return ProductResource::collection($products);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255',
            'description' => 'required|string',
            'handmade_description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'discount_price' => 'nullable|numeric|min:0',
            'stock' => 'nullable|integer|min:0',
            'sku' => 'nullable|string|max:100',
            'is_santiniketan' => 'boolean',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'image_urls' => 'nullable|array',
            'image_urls.*' => 'string',
        ]);

        $data['slug'] = $data['slug'] ?: Str::slug($data['name']);

        DB::beginTransaction();
        try {
            $product = Product::create($data);

            if (!empty($data['image_urls'])) {
                foreach ($data['image_urls'] as $index => $url) {
                    ProductImage::create([
                        'product_id' => $product->id,
                        'image_url' => $url,
                        'is_primary' => $index === 0,
                        'sort_order' => $index + 1,
                    ]);
                }
            }

            DB::commit();
            return new ProductResource($product->load(['category', 'images']));
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Failed to create product',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $product = Product::with(['category', 'images'])->findOrFail($id);

        return new ProductResource($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $product = Product::findOrFail($id);

        $data = $request->validate([
            'category_id' => 'sometimes|exists:categories,id',
            'name' => 'sometimes|string|max:255',
            'slug' => 'nullable|string|max:255',
            'description' => 'sometimes|string',
            'handmade_description' => 'nullable|string',
            'price' => 'sometimes|numeric|min:0',
            'discount_price' => 'nullable|numeric|min:0',
            'stock' => 'nullable|integer|min:0',
            'sku' => 'nullable|string|max:100',
            'is_santiniketan' => 'boolean',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'image_urls' => 'nullable|array',
            'image_urls.*' => 'string',
        ]);

        if (isset($data['name']) && empty($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        }

        DB::beginTransaction();
        try {
            $product->update($data);

            if (array_key_exists('image_urls', $data)) {
                ProductImage::where('product_id', $product->id)->delete();
                foreach (($data['image_urls'] ?? []) as $index => $url) {
                    ProductImage::create([
                        'product_id' => $product->id,
                        'image_url' => $url,
                        'is_primary' => $index === 0,
                        'sort_order' => $index + 1,
                    ]);
                }
            }

            DB::commit();
            return new ProductResource($product->load(['category', 'images']));
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Failed to update product',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::findOrFail($id);
        ProductImage::where('product_id', $product->id)->delete();
        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }
}
