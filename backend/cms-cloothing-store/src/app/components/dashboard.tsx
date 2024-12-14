"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { db } from "@/firebase";
import { getDocs, collection, addDoc } from "firebase/firestore";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEdgeStore } from "@/lib/edgestore";

export interface Product {
  id: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  productImg: string;
  numberAvailable: number;
}

const Dashboard: React.FC = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { edgestore } = useEdgeStore();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [productName, setProductName] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [ productType, setProductType ] = useState<string>("");
  const [productPrice, setProductPrice] = useState<string>("");
  const [productImg, setProductImg] = useState<File | null>(null);
  const [numberAvailable, setNumberAvailable] = useState<string>("");
  const [ loadingProucts, setLoadingProducts ] = useState<boolean>(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const fetchProducts = async () => {
    try {
      const productsCollection = collection(db, "products");
      setLoadingProducts(true);
      if(loadingProucts){
        return(
          <>
          <h3>laoding products...</h3>
          </>
        )
      }
      const productsSnapshot = await getDocs(productsCollection);
      setLoadingProducts(false);
      const productList = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      setProducts(productList);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!productName || !productImg || !numberAvailable) {
      alert("Please fill in all fields");
      return;
    }

    try {      
      if(productImg){
        const res = await edgestore.myPublicImages.upload({file: productImg});
        const fileUrl = res.url;

      const productsCollection = collection(db, "products");
      await addDoc(productsCollection, {
        productName,
        productDescription,
        productType,
        productPrice: parseFloat(productPrice),
        productImg: fileUrl,
        numberAvailable: parseInt(numberAvailable, 10),
      });
    

      alert("Product added successfully");
      fetchProducts();
      toggleModal();
      setProductName("");
      setProductDescription("");
      setProductType("");
      setProductPrice("");
      setProductImg(null);
      setNumberAvailable("");
    }
   } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProductImg(e.target.files[0]);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container h-fit max-h-screen mb-10 mx-auto p-4 relative">
      <h1 className="text-2xl font-bold mb-4">Product Management Dashboard</h1>
      <div className="h-full bg-white text-gray-800 shadow-md rounded p-6">
        <h2 className="text-xl font-semibold mb-2">Product List</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr className="border-b-8 border-t-2 border-l-2">
              <th className="py-2 border-r-2 text-center">Image</th>
              <th className="py-2 border-r-2 text-center">Name</th>
              <th className="py-2 border-r-2 text-center">Description</th>
              <th className="py-2 border-r-2 text-center">Price</th>
              <th className="py-2 border-r-2 text-center">Available</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id} className="border-b">
                  <td className="py-2">
                    <img
                      src={product.productImg}
                      alt={product.productName}
                      className="w-10 h-10 rounded"
                    />
                  </td>
                  <td className="py-2 font-bold">{product.productName}</td>
                  <td className="py-2">{product.productDescription}</td>
                  <td className="py-2">{product.productPrice.toFixed(2)}</td>
                  <td className="py-2">{product.numberAvailable}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-2">
                  No products available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <button
        onClick={toggleModal}
        className="fixed bottom-4 right-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
      >
        <PlusCircleIcon className="h-6 w-6" />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white shadow-md rounded p-6 w-1/3">
            <h2 className="text-xl text-gray-950 font-semibold mb-2">
              Add Product
            </h2>
            <form onSubmit={handleAddProduct}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productName">
                  Product Name
                </label>
                <input
                  type="text"
                  id="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter product name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productDescription">
                  Product Description
                </label>
                <textarea
                  id="productDescription"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter product description"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productType">
                  Product Type
                </label>
                <input
                  type="text"
                  id="productType"
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter product type"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productPrice">
                  Product Price
                </label>
                <input
                  type="number"
                  id="productPrice"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter product price"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productImg">
                  Product Image
                </label>
                <input
                  type="file"
                  id="productImg"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numberAvailable">
                  Number Available
                </label>
                <input
                  type="number"
                  id="numberAvailable"
                  value={numberAvailable}
                  onChange={(e) => setNumberAvailable(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter quantity available"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save Product
              </button>
              <button
                type="button"
                onClick={toggleModal}
                className="ml-2 bg-red-500 hover:bg-red-700 text-white float-end font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default Dashboard;
