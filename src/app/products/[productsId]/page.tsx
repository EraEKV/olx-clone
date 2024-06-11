"use client"

import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import useProductById from '@/app/components/hooks/useProductById';
import { Loading } from '@/app/components/layout/Loading';
import Image from 'next/image';


const Product = () => {
  const { productsId } = useParams();  

  const getRandomId = () => {
    return (Math.floor(Math.random() * 10) + 1).toString();
  };

  const { data: product, isSuccess, isLoading } = useProductById(productsId ?? getRandomId());

  if (isLoading) {
    return <Loading />
  }

  return (isSuccess && 
    <div className='min-h-screen max-w-[90%] sm:max-w-[500px] md:max-w-[1200px] mx-auto'>
      <div className="grid md:grid-cols-2 gap-8 items-start max-w-4xl mx-auto py-12 px-4 my-8 md:my-16">
        <Image
          src={product.image}
          alt="Product Image"
          className="max-h-[400px] mx-auto my-auto"
        ></Image>
        <div className="grid gap-4">
          <div>
            <span className="inline-block bg-gray-100 px-3 py-2 text-sm font-medium rounded-lg">
              {product.category}
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold"> {product.title} </h1>
          <p className="text-gray-500">
            {product.description}
          </p>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-2xl md:text-3xl lg:text-4xl font-bold">$ {product.price} </span>
            <button className='bg-black px-4 py-2 text-white rounded-lg border-2 border-black hover:bg-white hover:text-black transition duration-300 ease-in-out font-semibold'>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product