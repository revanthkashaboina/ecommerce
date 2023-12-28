import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  const body = await req.json();
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = body;
  try {
    const razorpaySecretKey = 'aYiPiuu9hs5XDH6E47QGrT2C';
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const buffer = Buffer.from(text, 'utf8');
    const hmac = crypto.createHmac('sha256', razorpaySecretKey);
    const signature = hmac.update(buffer).digest('hex');
    if (signature === razorpay_signature) {
      return NextResponse.json({ message: 'Payment successful' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Invalid payment' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
