import { createRadisOrder } from './actions';
import { createRazorpayOrder, loadRazorpayScript } from './razorpayUtils';

const PaymentMethod = ({ orderTotal, onSuccess, selectedMethod, setSelectedMethod, cardData }) => {
  const handleMethodChange = (event) => {
    setSelectedMethod(event.target.value);
  };

  const handlePayment = async () => {
    try {
      if (selectedMethod === 'payOnline') {
        await loadRazorpayScript();
        const orderId = await createRazorpayOrder(cardData.cost.totalAmount.amount * 100);
        const razorpayid = await createRadisOrder(orderId);
        const razorpay = new window.Razorpay({
          key: 'rzp_test_UKiCmTLO4wj1Gm',
          order_id: razorpayid,
          amount: cardData.cost.totalAmount.amount * 100,
          currency: cardData.cost.totalAmount.currencyCode
        });

        razorpay.open();
        razorpay.on('payment.success', (event) => {
          // onSuccess();
        });
        onSuccess();
        razorpay.on('payment.error', (error) => {
          console.log('Payment error:', error);
        });
      } else {
        onSuccess();
      }
    } catch (error) {
      console.log('Error:', error);
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
