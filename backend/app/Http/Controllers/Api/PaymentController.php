<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    /**
     * Create Razorpay order
     */
    public function createOrder(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:1',
        ]);

        // For now, return mock data
        // In production, integrate with Razorpay SDK
        $razorpayOrderId = 'order_' . uniqid();

        return response()->json([
            'order_id' => $razorpayOrderId,
            'amount' => $request->amount * 100, // Convert to paise
            'currency' => 'INR',
        ]);
    }

    /**
     * Verify Razorpay payment
     */
    public function verifyPayment(Request $request)
    {
        $request->validate([
            'order_id' => 'required|exists:orders,id',
            'razorpay_order_id' => 'required|string',
            'razorpay_payment_id' => 'required|string',
            'razorpay_signature' => 'required|string',
        ]);

        $order = Order::findOrFail($request->order_id);

        // Verify payment signature with Razorpay
        // For now, mark as paid
        $order->update([
            'razorpay_order_id' => $request->razorpay_order_id,
            'razorpay_payment_id' => $request->razorpay_payment_id,
            'razorpay_signature' => $request->razorpay_signature,
            'payment_status' => 'paid',
            'status' => 'confirmed',
        ]);

        return response()->json([
            'message' => 'Payment verified successfully',
            'order' => $order,
        ]);
    }
}
