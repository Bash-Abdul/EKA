'use client';
import React, { useState, useEffect } from "react";
import { db } from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

type Product = {
  id: string;
  productName: string;
  productDescription: string;
  productType: string;
  productPrice: number;
  productImg: string;
  numberAvailable: number;
};

const ProductCategories: React.FC = () => {
  const [mobileProducts, setMobileProducts] = useState<Product[]>([]);
  const [pcProducts, setPcProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProductsByType = async () => {
      try {
        const productsCollection = collection(db, "products");

        const mobileQuery = query(productsCollection, where("productType", "==", "mobile"));
        const pcQuery = query(productsCollection, where("productType", "==", "PC"));

        const mobileSnapshot = await getDocs(mobileQuery);
        const pcSnapshot = await getDocs(pcQuery);

        const mobileList = mobileSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];

        const pcList = pcSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];

        setMobileProducts(mobileList);
        setPcProducts(pcList);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProductsByType();
  }, []);

  return (
    <div className="ml-4 bg-white text-black p-4 rounded">
      <h1>Mobile Products</h1>
      <div className="grid grid-cols-3 gap-4">
        {mobileProducts.map((product) => (
          <div className="border-2 p-2 rounded w-fit" key={product.id}>
            <img
              src={product.productImg}
              alt={product.productName}
              className="w-32 h-32 object-cover"
            />
            {product.productName}
          </div>
        ))}
      </div>

      <h1>PC Products</h1>
      <div className="grid grid-cols-3 gap-4">
        {pcProducts.map((product) => (
          <div className="border-2 p-2 rounded w-fit" key={product.id}>
            <img
              src={product.productImg}
              alt={product.productName}
              className="w-32 h-32 object-cover"
            />
            {product.productName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategories;
