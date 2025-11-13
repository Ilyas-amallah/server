import { createOrder } from "../api";

export default function Cart({ cart, setCart }) {
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  const checkout = async () => {
    const order = {
      customer_name: "Guest",
      phone: "000000000",
      total_price: total,
      items: cart.map((i) => ({
        id: i.id,
        quantity: i.quantity,
        price: i.price,
      })),
    };
    await createOrder(order);
    alert("Order created!");
    setCart([]);
  };

  return (
    <div className="p-5 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      {cart.map((item) => (
        <div key={item.id} className="flex justify-between border-b py-2">
          <span>{item.name}</span>
          <span>{item.quantity} × {item.price} MAD</span>
        </div>
      ))}
      <div className="text-right font-bold mt-4">Total: {total} MAD</div>
      <button
        onClick={checkout}
        className="mt-3 bg-green-500 text-white px-4 py-2 rounded"
      >
        Checkout
      </button>
    </div>
  );
}
