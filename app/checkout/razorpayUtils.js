export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = resolve;
    document.body.appendChild(script);
  });
};

export const createRazorpayOrder = async (orderTotal) => {
  const response = await fetch('/api/createOrder', {
    method: 'POST',
    body: JSON.stringify({ amount: orderTotal }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  return data.orderId;
};

export const varifyRazorpayPayment = async (
  razorpay_payment_id,
  razorpay_order_id,
  razorpay_signature
) => {
  const response = await fetch('/api/verifyPayment', {
    method: 'POST',
    body: JSON.stringify({
      razorpay_payment_id: razorpay_payment_id,
      razorpay_order_id: razorpay_order_id,
      razorpay_signature: razorpay_signature
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response;
};
