import Price from '../../components/price';
const Summary = ({ cardData, shippingAddress, shippingMethod, paymentMethod }) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold">Summary</h2>
      <table className="w-full">
        <tbody>
          <tr>
            <td className="pr-4">Shipping Address:</td>
            <td>{shippingAddress}</td>
          </tr>
          <tr>
            <td className="pr-4">Shipping Method:</td>
            <td>{shippingMethod}</td>
          </tr>
          <tr>
            <td className="pr-4">Payment Method:</td>
            <td>{paymentMethod}</td>
          </tr>
          <tr>
            <td className="pr-4">Order Total:</td>
            {/* <td>{cardData.cost.totalAmount.amount}</td> */}
            <td>
              <Price
                className="flex space-y-2 text-right text-sm"
                amount={cardData.cost.totalAmount.amount}
                currencyCode={cardData.cost.totalAmount.currencyCode}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Summary;
