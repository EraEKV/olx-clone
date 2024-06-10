import { axiosProducts } from "../Service/ProductsService";
import { useQuery } from "@tanstack/react-query";
import Product from "@/app/types/productInterface";

const fetchData = async (): Promise<Product[]> => {
const { data } = await axiosProducts.get<Product[]>('/products');
return data;
};


const useProducts = () => {
  return useQuery<Product[], Error>({
    queryFn: fetchData,
    queryKey: ['products'],
    refetchOnWindowFocus: false,
    retry: 2,
    staleTime: 5000,
  });
}


export default useProducts 