import { Plus, Minus } from "lucide-react";
const Quantity = ({ quantity, setQuantity }) => {
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  return (
    <div className="border border-gray-300 inline-flex items-center justify-center rounded-md">
      <div className="flex items-center justify-center px-2 py-1 gap-4">
        <Minus
          size={18}
          onClick={decreaseQuantity}
          className="text-gray-600 text-lg hover:text-black cursor-pointer"
        />
        <span className="text-lg">{quantity}</span>
        <Plus
          size={18}
          onClick={increaseQuantity}
          className="text-gray-600 text-lg hover:text-black cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Quantity;
