import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req: NextRequest, res: NextResponse) {
  const razorpay = new Razorpay({
    key_id: 'rzp_test_UKiCmTLO4wj1Gm',
    key_secret: 'aYiPiuu9hs5XDH6E47QGrT2C'
  });
  const body = await req.json();
  const orderAmount = body.amount;
  try {
    const order = await razorpay.orders.create({
      amount: orderAmount,
      currency: 'INR'
    });
    return NextResponse.json({ orderId: order.id, message: 'Order created successfully' });
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}
