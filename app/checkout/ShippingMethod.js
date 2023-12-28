import { useState } from 'react';

const ShippingMethod = ({ onSubmit }) => {
  const [selectedMethod, setSelectedMethod] = useState('');

  const handleMethodChange = (event) => {
    setSelectedMethod(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(selectedMethod);
  };

  return (
    <div className="rounded-lg bg-white p-2 shadow-md">
      <h2 className="mb-4 text-xl font-semibold">Shipping Method</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="mb-1 block text-sm">Select Shipping Method:</label>
          <select
            value={selectedMethod}
            onChange={handleMethodChange}
            className="w-full rounded border p-2"
          >
            <option value="">Select...</option>
            <option value="standard">Standard Shipping</option>
            <option value="expedited">Expedited Shipping</option>
          </select>
        </div>
        <button type="submit" className="rounded bg-blue-500 px-4 py-2 text-white">
          Continue to Payment
        </button>
      </form>
    </div>
  );
};

export default ShippingMethod;
