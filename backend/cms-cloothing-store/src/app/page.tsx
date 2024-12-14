'use client';
import React, { useState } from "react";
import Sidebar from "../app/components/sidebar";
import Dashboard from "./components/dashboard";
import ProductCategories from "./components/productCategrie";
import TopDeals from "./components/topDeals";

const DashboardPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "categories":
        return <ProductCategories />;
      case "topdeals":
        return <TopDeals />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex">
      <Sidebar onSelect={setActiveSection} />
      <div className="ml-64 p-4 w-full">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        {renderContent()}
      </div>
    </div>
  );
};

export default DashboardPage;
