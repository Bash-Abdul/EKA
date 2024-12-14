import React, { useContext } from "react";
import { ShopContext } from "../context/shopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);
  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      <div className="overflow-hidden">
        <img
          className="hover:scale-110 transition ease-in-out"
          src={image[0]}
          alt=""
        />
      </div>
      <p className="pt-3 pb-2 text-sm">{name}</p>

      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">
          {currency}
          {price}
        </p>

        <div className="flex gap-4">
          <div className="bg-orange-500 w-[1rem] h-[1rem]"></div>
          <div className="bg-blue-500 w-[1rem] h-[1rem]"></div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
