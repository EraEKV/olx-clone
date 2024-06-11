import Product from "@/app/types/ProductInterface";
import { useMutation, useQueryClient, MutationOptions } from "@tanstack/react-query";
import { axiosQueryProduct } from "../Service/ProductsService";

interface FormData {
  // title: string;
  // price: string;
  // category: string;
  images: string[];
}

const createBlog = async (formData: FormData): Promise<Product> => {
  const res = await axiosQueryProduct.post<Product>('/upload', formData);
  return res.data;
}

const useCreatePost = (options?: MutationOptions<Product, Error, FormData, unknown>) => {
  const queryClient = useQueryClient();

  return useMutation<Product, Error, FormData>({
    mutationFn: createBlog,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      if (options?.onSuccess) options.onSuccess(data, variables, context);
    },
    ...options,
  });
}

export { useCreatePost };
