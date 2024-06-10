"use client";

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { axiosProducts } from '../components/Service/ProductsService';
import Card from '../components/Card';
import Product from '../types/ProductInterface';
import Skeleton from '../components/Skeleton';
// import useProducts from '../components/hooks/useProducts';



const fetchData = async (): Promise<Product[]> => {
  const { data } = await axiosProducts.get<Product[]>('/products');
  return data;
};


const Products: React.FC = () => {

    const { data: products, error, isLoading } = useQuery<Product[], Error>({
      queryFn: fetchData,
      queryKey: ['products'],
      refetchOnWindowFocus: false,
      retry: 2,
      staleTime: 5000,
    });
  
    if (isLoading) return (
        <div className='grid grid-cols-3 gap-10'>
          <Skeleton/>
          <Skeleton/>
          <Skeleton/>
          <Skeleton/>
        </div>
      );
    if (error) return <div>An error occurred: {error.message}</div>;
  
    return (
      <div className='my-16 w-[70%] max-w-[1200px] mx-auto'>
        <h1 className='text-center font-bold text-3xl mb-10'>Explore our products</h1>
        <div className='grid grid-cols-3 gap-10'>
          {!isLoading &&
            products?.map(product => (
              <Card key={product.id} product={product} />
            ))
          }
        </div>
      </div>
    );
  };
  
  export default Products;
  