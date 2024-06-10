import { axiosProducts } from "../Service/ProductsService";
import { useQuery, useQueries } from "@tanstack/react-query";
import Product from "@/app/types/productInterface";

// Function to fetch a single product by ID
const fetchProductById = async (id: string | string[]): Promise<Product> => {
  const { data } = await axiosProducts.get<Product>(`/products/${id}`);
  return data;
};

// Custom hook to fetch a single product by ID
const useProductById = (id: string | string[]) => {
  return useQuery<Product, Error>({
    queryFn: () => fetchProductById(id),
    queryKey: ['product', id],
    refetchOnWindowFocus: false,
    retry: 2,
    staleTime: 5000,
  });
};

export default useProductById;
