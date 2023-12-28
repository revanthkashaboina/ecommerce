import { useState } from 'react';

const AddressForm = ({ onSubmit }) => {
  const [address, setAddress] = useState('');

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(address);
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <label>
    //     Shipping Address:
    //     <input type="text" value={address} onChange={handleAddressChange} />
    //   </label>
    //   <button type="submit">Continue to Shipping</button>
    // </form>
    <div className="rounded-lg bg-white p-2 shadow-md">
      <h2 className="mb-4 text-xl font-semibold">Shipping Address</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="mb-1 block text-sm">Address:</label>
          <input
            type="text"
            value={address}
            onChange={handleAddressChange}
            className="w-full rounded border p-2"
            placeholder="Enter your address"
          />
        </div>
        <button type="submit" className="rounded bg-blue-500 px-4 py-2 text-white">
          Continue to Shipping
        </button>
      </form>
    </div>
  );
};

export default AddressForm;
