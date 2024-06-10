"use client";

import React from 'react';
import Card from '../components/Card';
import useProducts from '../components/hooks/useProducts';
import { Loading } from '../components/layout/Loading';


const Products: React.FC = () => {
  const { data: products, isSuccess, isLoading } = useProducts(); 
  
  if (isLoading) {
    <Loading />
  }

  // if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className='my-16 w-[90%] max-w-[1200px] mx-auto min-h-screen'>
      <h1 className='text-center font-bold text-3xl mb-10'>Explore our products</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 xl:gap-10 '>
        {isSuccess &&
          products?.map(product => (
            <Card key={product.id} product={product} />
          ))
        }
      </div>
    </div>
  );
};

export default Products;