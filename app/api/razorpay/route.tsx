import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Razorpay from "razorpay";
import connectdb from "@/db/connectdb";
import Payment from "@/models/Payment";

export const POST = async (req) => {
  try {
    await connectdb();

    // Parse form data
    let body = await req.formData();
    body = Object.fromEntries(body);  // Just modify the existing 'body'

    // Check if Razorpay order ID is present in the database
    const payment = await Payment.findOne({ oid: body.razorpay_order_id });
    if (!payment) {
      return NextResponse.json(
        { error: "Payment not found" },
        { status: 404 }
      );
    }

    // Verify the payment
    let isValid = validatePaymentVerification(
      {
        order_id: body.razorpay_order_id,
        payment_id: body.razorpay_payment_id
      },
      body.razorpay_signature,
      process.env.key_secret
    );

    if (isValid) {
      const updatedPayment = await Payment.findOneAndUpdate(
        { oid: body.razorpay_order_id },
        { done: "true" },
        { new: true }
      );

      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`
      );
    } else {
      return NextResponse.json(
        { error: "Payment verification failed" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
};
