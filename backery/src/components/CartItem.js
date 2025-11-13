export default function CartItem({ item, removeFromCart }) {
  return (
    <div className="flex justify-between items-center border-b py-2">
      <div>
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-sm text-gray-500">
          {item.quantity} × {item.price} MAD
        </p>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-semibold">{item.price * item.quantity} MAD</span>
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-red-500 hover:underline"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
