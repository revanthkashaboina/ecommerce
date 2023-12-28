'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AddressForm from './AddressForm';
// import PaymentMethod from './PaymentMethod';
import ShippingMethod from './ShippingMethod';
import Summary from './Summary';
import PaymentMethod from './payMethod';

const CheckoutPage: React.FC<{ cardData: any }> = async ({ cardData }) => {
  const router = useRouter();
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingMethod, setShippingMethod] = useState('');
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('');

  const handleAddressSubmit = (address: any) => {
    setShippingAddress(address);
  };

  const handleShippingMethodSubmit = (method: any) => {
    setShippingMethod(method);
  };

  const handlePaymentSuccess = async () => {
    router.push('/thankyou');
    setPaymentComplete(true);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-1">
        <div className="rounded-lg bg-white p-6 shadow-md">
          <AddressForm onSubmit={handleAddressSubmit} />
        </div>
        {shippingAddress && (
          <div className="mt-4 rounded-lg bg-white p-6 shadow-md">
            <ShippingMethod onSubmit={handleShippingMethodSubmit} />
          </div>
        )}
        {shippingMethod && (
          <div className="mt-4 rounded-lg bg-white p-6 shadow-md">
            {/* <PaymentMethod
              orderTotal={1000} // Replace with actual order total
              onSuccess={handlePaymentSuccess}
              selectedMethod={selectedMethod}
              setSelectedMethod={setSelectedMethod}
              cardData={cardData}
            /> */}
            <PaymentMethod
              // orderTotal={1000} // Replace with actual order total
              onSuccess={handlePaymentSuccess}
              // selectedMethod={selectedMethod}
              // setSelectedMethod={setSelectedMethod}
              cardData={cardData}
            />
          </div>
        )}
      </div>
      <div className="flex-1 md:ml-8">
        <Summary
          shippingAddress={shippingAddress}
          shippingMethod={shippingMethod}
          paymentMethod={selectedMethod}
          cardData={cardData}
        />
      </div>
    </div>
  );
};

export default CheckoutPage;
