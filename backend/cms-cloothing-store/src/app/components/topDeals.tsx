'use client';
import React, { useState, useEffect } from "react";
import { db } from "@/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { Product } from "./dashboard";

const TopDeals: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [topDeals, setTopDeals] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, "products");
        const productsSnapshot = await getDocs(productsCollection);
        const productList = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
        setAllProducts(productList);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    const fetchTopDeals = async () => {
    try {
      const topDealsCollection = collection(db, "topDeals");
      const topDealsSnapshot = await getDocs(topDealsCollection);
      const topDealsList = topDealsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      setTopDeals(topDealsList);
    } catch (err) {
      console.error("Error fetching top deals:", err);
    }
  };

    fetchProducts();
    fetchTopDeals();
  }, []);

  const addToTopDeals = async (product: Product) => {
    try {
      const topDealsCollection = collection(db, "topDeals");
      await addDoc(topDealsCollection, product);
      setTopDeals((prev) => [...prev, product]);
    } catch (err) {
      console.error("Error adding to top deals:", err);
    }
  };

  

  return (
    <div className="p-4 text-gray-800">
      <div>
        <h2 className="text-2xl text-gray-300 font-bold mb-4">All Products</h2>
        <div className="flex flex-wrap">
          {allProducts.map((product) => (
            <div key={product.id} className="bg-gray-200 border rounded p-2 m-2">
              <img
                src={product.productImg}
                alt={product.productName}
                className="w-16 h-16 object-cover mix-blend-color-burn"
              />
              <p>{product.productName}</p>
              <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded" onClick={() => addToTopDeals(product)}>Add to Top Deals</button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-300 mb-4">Top Deals</h2>
        <div className="flex flex-wrap">
          {topDeals.map((deal) => (
            <div key={deal.id} className="bg-gray-200 border rounded p-2 m-2">
              <img
                src={deal.productImg}
                alt={deal.productName}
                className="w-16 h-16 object-cover mix-blend-color-burn"
              />
              <h3>{deal.productName}</h3>
              <p>{deal.productDescription}</p>
              <p>${deal.productPrice}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopDeals;
