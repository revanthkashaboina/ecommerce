// 'use client'
// // import { getCart } from 'lib/shopify';
// // import { getCart } from 'lib/backendUtils';
// import { getCart } from 'lib/cwcommerce';

// import { cookies } from 'next/headers';
// import CartModal from './modal';

// export default async function Cart() {
//   // const cartId =""
//   const cartId = cookies().get('cartId')?.value;
//   let cart:any;
//   if (cartId) {
//     cart = await getCart(cartId);
//   }

//   return <CartModal cart={cart} />;
// }

import { getCart } from 'lib/cwcommerce';

import cookies from 'js-cookie';
import CartModal from './modal';

export default async function Cart() {
  // const cartId =""
  const cartId = cookies.get('cartId');
  let cart: any;

  // if (cartId) {
  //   cart = await getCart(cartId);
  // }

  return <CartModal cart={cart} />;
}
