// import axiosProducts from "../Service/ProductsService";
// import { useQuery } from "@tanstack/react-query";
// import Product from "@/app/types/ProductInterface";

//   const fetchData = async (): Promise<Product[]> => {
//     const { data } = await axiosProducts.get<Product[]>('https://fakestoreapi.com/products');
//     return data;
//   };


// const useProducts = () => {
//   const { data: products, error, isLoading } = useQuery<Product[], Error>({
//     queryFn: fetchData,
//     queryKey: ['products'],
//     refetchOnWindowFocus: false,
//     retry: 2,
//     staleTime: 5000,
//   });
// }


// export { useProducts }