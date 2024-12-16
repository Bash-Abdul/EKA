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
  const [topWearProducts, setTopWearProducts] = useState<Product[]>([]);
  const [bottomWearProducts, setBottomWearProducts] = useState<Product[]>([]);
  const [winterWearProducts, setWinterWearProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProductsByType = async () => {
      try {
        const productsCollection = collection(db, "products");

        const topWearQuery = query(productsCollection, where("productType", "==", "topwear"));
        const bottomWearQuery = query(productsCollection, where("productType", "==", "bottomwear"));
        const winterWearQuery = query(productsCollection, where("productType", "==", "winterwear"));

        const topWearSnapshot = await getDocs(topWearQuery);
        const bottomWearSnapshot = await getDocs(bottomWearQuery);
        const winterWearSnapshot = await getDocs(winterWearQuery);

        const topWearList = topWearSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];

        const bottomWearList = bottomWearSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];

        const winterWearList = winterWearSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];

        setTopWearProducts(topWearList);
        setBottomWearProducts(bottomWearList);
        setWinterWearProducts(winterWearList);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProductsByType();
  }, []);

  return (
    <div className="ml-4 bg-white text-black p-4 rounded">
      <h1>Top Wear Products</h1>
      <div className="grid grid-cols-3 gap-4">
        {topWearProducts.map((product) => (
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

      <h1>Bottom Wear Products</h1>
      <div className="grid grid-cols-3 gap-4">
        {bottomWearProducts.map((product) => (
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

      <h1>Winter Wear Products</h1>
      <div className="grid grid-cols-3 gap-4">
        {winterWearProducts.map((product) => (
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
