import { useEffect, useState } from "react";
import { getProducts } from "../api";

export default function Products({ addToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div className="products-grid">
      {products.map((p) => (
        <div key={p.id} className="product-card">
          <img
            src={p.image || "https://via.placeholder.com/300x200"}
            alt={p.name}
          />
          <h3>{p.name}</h3>
          <p>{p.price_per_unit} MAD / {p.unit_type}</p>
          <button onClick={() => addToCart(p)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
