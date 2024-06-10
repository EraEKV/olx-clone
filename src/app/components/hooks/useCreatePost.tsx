import Product from "@/app/types/productInterface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosQueryProduct } from "../Service/ProductsService";

interface BlogData {
  title: string;
  price: string;
  category: string;
  images: string[];
}

const createBlog = async (blogData: BlogData): Promise<Product> => {
    const res = await axiosQueryProduct.post<Product>('/upload', blogData);
    return res.data;
}

const useCreatePost = () => {
    const queryClient = useQueryClient();

    return useMutation<Product, Error, BlogData>({
      mutationFn: createBlog,
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['blogs'] });
      },
    });
}

export { useCreatePost };
