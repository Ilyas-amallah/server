import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import ProductTable from "./components/ProductTable";
import OrderTable from "./components/OrderTable";
import UserTable from "./components/UserTable";
import "./admin.css";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("products");

  const renderContent = () => {
    switch (activeTab) {
      case "products": return <ProductTable />;
      case "orders": return <OrderTable />;
      case "users": return <UserTable />;
      default: return <ProductTable />;
    }
  };

  return (
    <div className="admin-dashboard">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="admin-content">{renderContent()}</div>
    </div>
  );
}
