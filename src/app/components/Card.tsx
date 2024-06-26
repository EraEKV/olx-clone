"use client"

import Image from "next/image";
import Link from "next/link";
import Product from "../types/ProductInterface";



interface CardProps {
  product: Product;
}

const Card: React.FC<CardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-sm border border-gray-200 hover:scale-105 transition duration-300 ease-in-out">
      <Link href={`/products/${product.id}`} className="hover:scale-105 transition duration-300 ease-in-out">
        <div className="flex flex-col justify-between h-full border rounded-lg overflow-hidden">
          <Image 
            src={product.image} 
            width={400} 
            height={400} 
            alt="Product Image" 
            className="max-h-[200px] w-auto mx-auto pt-10 px-10" 
          ></Image>
          {/* <Image
            src={product.image} 
            alt="Product Image"
            width={500}
            height={400}
            className="w-full h-56 object-cover"
          ></Image> */}
          <div className="p-4 flex flex-col mt-auto">
            <span className="text-gray-500 text-sm uppercase">{product.category}</span>
            <h3 className="text-gray-900 font-bold text-lg mt-2">{product.title}</h3>
            <div className="flex items-center justify-between mt-4">
              <span className="font-bold text-xl text-emerald-500">${product.price}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;