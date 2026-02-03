<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'handmade_description' => $this->handmade_description,
            'price' => (float) $this->price,
            'discount_price' => $this->discount_price ? (float) $this->discount_price : null,
            'final_price' => (float) $this->final_price,
            'discount_percentage' => $this->discount_percentage,
            'stock' => $this->stock,
            'sku' => $this->sku,
            'is_santiniketan' => $this->is_santiniketan,
            'is_featured' => $this->is_featured,
            'is_active' => $this->is_active,
            'category' => new CategoryResource($this->whenLoaded('category')),
            'images' => ProductImageResource::collection($this->whenLoaded('images')),
            'primary_image' => $this->images->where('is_primary', true)->first()?->image_url ?? $this->images->first()?->image_url,
            'in_wishlist' => $this->when(isset($this->in_wishlist), $this->in_wishlist),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
