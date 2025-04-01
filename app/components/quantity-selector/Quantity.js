import { Plus, Minus } from "lucide-react";
const Quantity = ({ decreaseQuantity, quantity, increaseQuantity }) => {
  return (
    <div className="border border-gray-300 inline-flex items-center justify-center py-0.5 rounded-md">
      <Minus
        size={40}
        onClick={decreaseQuantity}
        className="px-3 text-gray-600 text-lg hover:text-black cursor-pointer"
      />
      <span className="mx-4 text-lg">{quantity}</span>
      <Plus
        size={40}
        onClick={increaseQuantity}
        className="px-3 text-gray-600 text-lg hover:text-black cursor-pointer"
      />
    </div>
  );
};

export default Quantity;
