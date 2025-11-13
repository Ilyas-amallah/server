import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ProductTable() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    category_id: 1,
    unit_type: "piece",
    price_per_unit: "",
    stock: "",
    image: "",
    is_customizable: 0,
  });
  const [editingId, setEditingId] = useState(null);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        price_per_unit: parseFloat(form.price_per_unit),
        stock: parseFloat(form.stock),
      };

      if (editingId) {
        await axios.put(`http://localhost:5000/api/products/${editingId}`, payload);
        setEditingId(null);
      } else {
        await axios.post("http://localhost:5000/api/products", payload);
      }

      setForm({
        name: "",
        description: "",
        category_id: 1,
        unit_type: "piece",
        price_per_unit: "",
        stock: "",
        image: "",
        is_customizable: 0,
      });
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Erreur: " + (err.response?.data?.message || err.message));
    }
  };

  const handleEdit = (p) => {
    setForm({
      name: p.name,
      description: p.description,
      category_id: p.category_id,
      unit_type: p.unit_type,
      price_per_unit: p.price_per_unit,
      stock: p.stock,
      image: p.image || "",
      is_customizable: p.is_customizable,
    });
    setEditingId(p.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce produit ?")) return;
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="container mt-6">
      <h1>Admin Dashboard - Produits</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Nom du produit"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="number"
          step="0.01"
          placeholder="Prix par unité"
          value={form.price_per_unit}
          onChange={(e) => setForm({ ...form, price_per_unit: e.target.value })}
          required
        />
        <input
          type="number"
          step="1"
          placeholder="Stock"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Type d'unité (piece/kg)"
          value={form.unit_type}
          onChange={(e) => setForm({ ...form, unit_type: e.target.value })}
        />
        <input
          type="text"
          placeholder="URL image"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
        <select
          value={form.is_customizable}
          onChange={(e) => setForm({ ...form, is_customizable: Number(e.target.value) })}
        >
          <option value={0}>Non personnalisable</option>
          <option value={1}>Personnalisable</option>
        </select>
        <button type="submit">{editingId ? "Modifier" : "Ajouter"} produit</button>
      </form>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>Nom</th>
            <th style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>Prix</th>
            <th style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>Stock</th>
            <th style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>{p.name}</td>
              <td style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>{p.price_per_unit} €</td>
              <td style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>{p.stock}</td>
              <td style={{ borderBottom: "1px solid #ddd", padding: "0.5rem" }}>
                <button onClick={() => handleEdit(p)}>Modifier</button>
                <button
                  onClick={() => handleDelete(p.id)}
                  style={{ marginLeft: "0.5rem", backgroundColor: "#FF6B6B" }}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
