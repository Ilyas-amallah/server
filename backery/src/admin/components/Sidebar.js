import React from "react";

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <div className="sidebar">
      <h2>Pâtisserie Boulangerie Mourad</h2>
      <ul>
        <li 
          className={activeTab === "products" ? "active" : ""} 
          onClick={() => setActiveTab("products")}
        >
          🧁 Produits
        </li>
        <li 
          className={activeTab === "orders" ? "active" : ""} 
          onClick={() => setActiveTab("orders")}
        >
          📦 Commandes
        </li>
        <li 
          className={activeTab === "users" ? "active" : ""} 
          onClick={() => setActiveTab("users")}
        >
          👥 Utilisateurs
        </li>
      </ul>
    </div>
  );
}
