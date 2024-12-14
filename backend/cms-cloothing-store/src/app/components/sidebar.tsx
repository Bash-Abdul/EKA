'use client';
import React, { useState } from "react";

interface SidebarProps {
    onSelect: (section: string) => void;
  }

  const Sidebar: React.FC<SidebarProps> = ({ onSelect }) => {
    return (
        <div className="w-64 bg-gray-800 text-white h-full fixed top-0 left-0 p-4">
          <ul>
            <li
              onClick={() => onSelect("dashboard")}
              className="cursor-pointer p-2 hover:bg-gray-600 rounded"
            >
              Dashboard
            </li>
            <li
              onClick={() => onSelect("categories")}
              className="cursor-pointer p-2 hover:bg-gray-600 rounded"
            >
              Product Categories
            </li>
            <li
              onClick={() => onSelect("topdeals")}
              className="cursor-pointer p-2 hover:bg-gray-600 rounded"
            >
              Top Deals
            </li>
          </ul>
        </div>
      );
}

export default Sidebar