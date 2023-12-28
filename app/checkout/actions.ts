// 'use server';
import { kv } from '@vercel/kv';
import { cookies } from 'next/headers';

const cookies1 = cookies();

export const createRadisOrder = async (razorpayid: any) => {
  const cartId: any = cookies().get('cartId')?.value;
  const cardData: any = await kv.get(`cart:${cartId}`);
  const uniqueId = Math.random().toString(36).substring(7).toUpperCase();
  cardData.orderId = uniqueId;
  cardData.razorpayid = razorpayid;
  await kv.set(`orderId:${uniqueId}`, cardData);
  const orderData: any = await kv.get(`orderId:${uniqueId}`);
  return orderData?.razorpayid;
};

export const deleteCartFromRadis = async () => {
  const cartId: any = cookies().get('cartId')?.value;
  const response = await kv.del(`cart:${cartId}`);
  if (response === 1) {
    return 'Deleted from kv';
  }
};

export const deleteCartIdFromLocal = async () => {
  cookies1.set('cartId', '', {
    maxAge: -1
  });
  return 'deleted cartId';
};
