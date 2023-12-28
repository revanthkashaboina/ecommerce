import { kv } from '@vercel/kv';
import { cookies } from 'next/headers';
import CheckoutPage from './page1';

const Checkout = async () => {
  const cartId: any = cookies().get('cartId')?.value;
  const cardData: any = await kv.get(`cart:${cartId}`);
  return (
    <>
      {cardData?.lines?.length > 0 ? <CheckoutPage cardData={cardData} /> : 'Add Products To cart'}
    </>
  );
};

export default Checkout;
