<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $orders = Order::with('items')
            ->where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return OrderResource::collection($orders);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'payment_method' => 'required|in:razorpay,cod',
            'shipping_name' => 'required|string|max:255',
            'shipping_email' => 'required|email',
            'shipping_mobile' => 'required|string|max:15',
            'shipping_address' => 'required|string',
            'shipping_city' => 'required|string|max:255',
            'shipping_state' => 'required|string|max:255',
            'shipping_pincode' => 'required|string|max:10',
            'shipping_country' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
        ]);

        $carts = Cart::with('product')->where('user_id', $request->user()->id)->get();

        if ($carts->isEmpty()) {
            return response()->json([
                'message' => 'Cart is empty',
            ], 400);
        }

        DB::beginTransaction();
        try {
            $subtotal = $carts->sum(function ($cart) {
                return $cart->quantity * ($cart->product->discount_price ?? $cart->product->price);
            });

            $discount = 0; // Can be calculated from coupons
            $shipping = 0; // Can be calculated based on location
            $total = $subtotal - $discount + $shipping;

            $order = Order::create([
                'user_id' => $request->user()->id,
                'subtotal' => $subtotal,
                'discount' => $discount,
                'shipping' => $shipping,
                'total' => $total,
                'payment_method' => $request->payment_method,
                'payment_status' => $request->payment_method === 'cod' ? 'pending' : 'pending',
                'status' => 'pending',
                'shipping_name' => $request->shipping_name,
                'shipping_email' => $request->shipping_email,
                'shipping_mobile' => $request->shipping_mobile,
                'shipping_address' => $request->shipping_address,
                'shipping_city' => $request->shipping_city,
                'shipping_state' => $request->shipping_state,
                'shipping_pincode' => $request->shipping_pincode,
                'shipping_country' => $request->shipping_country ?? 'India',
                'notes' => $request->notes,
            ]);

            foreach ($carts as $cart) {
                $product = $cart->product;
                $price = $product->discount_price ?? $product->price;
                
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'product_name' => $product->name,
                    'product_image' => $product->images->first()?->image_url,
                    'price' => $price,
                    'quantity' => $cart->quantity,
                    'total' => $price * $cart->quantity,
                ]);

                // Update product stock
                $product->decrement('stock', $cart->quantity);
            }

            // Clear cart
            Cart::where('user_id', $request->user()->id)->delete();

            DB::commit();

            return new OrderResource($order->load('items'));
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Order creation failed',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id)
    {
        $order = Order::with('items')
            ->where('user_id', $request->user()->id)
            ->findOrFail($id);

        return new OrderResource($order);
    }
}
