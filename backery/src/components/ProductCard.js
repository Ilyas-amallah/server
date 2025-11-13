export default function ProductCard({ product, addToCart }) {
  return (
    <div className="border rounded-xl p-3 shadow text-center">
      <img src={product.image} alt={product.name} className="h-40 w-full object-cover rounded" />
      <h3 className="mt-2 font-bold">{product.name}</h3>
      <p>{product.price} MAD / {product.unit}</p>
      <button
        onClick={() => addToCart(product)}
        className="bg-yellow-500 text-white px-3 py-1 mt-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}
