import React, { useState } from 'react';
import { createRadisOrder, deleteCartFromRadis } from './actions';
import { createRazorpayOrder, loadRazorpayScript, varifyRazorpayPayment } from './razorpayUtils';

interface PaymentMethodProps {
  cardData: {
    cost: {
      totalAmount: {
        amount: number;
        currencyCode: string;
      };
    };
  };
  onSuccess: () => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ cardData, onSuccess }) => {
  const [selectedMethod, setSelectedMethod] = useState('payOnline');

  const handleMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMethod(event.target.value);
  };

  const handlePayment = async () => {
    try {
      if (selectedMethod === 'payOnline') {
        await loadRazorpayScript();
        const orderId = await createRazorpayOrder(cardData.cost.totalAmount.amount * 100);
        const razorpayid = await createRadisOrder(orderId);
        const options = {
          key: 'rzp_test_UKiCmTLO4wj1Gm',
          amount: cardData.cost.totalAmount.amount * 100,
          currency: cardData.cost.totalAmount.currencyCode,
          order_id: razorpayid,
          name: 'CW Suite India Pvt Ltd',
          description: 'Thankyou for your Payment',
          image: 'https://manuarora.in/logo.png',
          handler: function (response: any) {
            verifyPayment(
              response.razorpay_payment_id,
              response.razorpay_order_id,
              response.razorpay_signature
            );
            // deleteCartAndShowSuccess()
          },
          prefill: {
            name: 'CW Suite India Pvt Ltd',
            email: '',
            contact: ''
          }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } else {
        onSuccess();
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const verifyPayment = async (
    razorpay_payment_id: any,
    razorpay_order_id: any,
    razorpay_signature: any
  ) => {
    const response = await varifyRazorpayPayment(
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature
    );
    if (response.status === 200) {
      deleteCartAndShowSuccess();
    }
  };

  const deleteCartAndShowSuccess = async () => {
    const response = await deleteCartFromRadis();
    if (response === 'Deleted from kv') {
      onSuccess();
      document.cookie = 'cartId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
  };

  return (
    <div className="rounded-lg bg-white p-2 shadow-md">
      <h2 className="mb-4 text-xl font-semibold">Payment Method</h2>
      <div className="mb-4">
        <p className="mb-1 block text-sm">Select Payment Method:</p>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="payOnline"
              checked={selectedMethod === 'payOnline'}
              onChange={handleMethodChange}
              className="mr-2"
            />
            Pay Online
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="payOnDelivery"
              checked={selectedMethod === 'payOnDelivery'}
              onChange={handleMethodChange}
              className="mr-2"
            />
            Pay on Delivery
          </label>
        </div>
      </div>
      {selectedMethod && (
        <button onClick={handlePayment} className="rounded bg-blue-500 px-4 py-2 text-white">
          Place Order
        </button>
      )}
    </div>
  );
};

export default PaymentMethod;
