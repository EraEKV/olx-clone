"use client"

import React, { useState } from 'react';
import axios from 'axios';
import CategorySelector from '../components/layout/CategorySelector';
import { useRouter } from 'next/navigation';
import { useCreatePost } from '../components/hooks/useCreatePost';
import ImageUpload from '../components/ImageUpload';
import TextInput from '../components/TextInput';
import NumberInput from '../components/NumberInput';
import SubmitButton from '../components/SubmitButton';

const categories = ['Electronics', 'Books', 'Clothing', 'Home', 'Sports'];

const Upload: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);
  const router = useRouter();
  const { mutate: createPost, isPending } = useCreatePost();

  const onSubmit = () => {
    if (title && price && category && files.length > 0) {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('price', price);
      formData.append('category', category);
      files.forEach((file, index) => {
        formData.append(`images[${index}]`, file);
      });

      axios.post('https://api.escuelajs.co/api/v1/files/upload', formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total ?? 1));
          setUploadProgress((prev) => [...prev, percentCompleted]);
        }
      })
      .then(response => {
        setImages((prev) => [...prev, response.data.location]);
        console.log("Upload successful!", response.data);
        router.push('/products');
      })
      .catch(error => {
        console.error("Upload failed!", error.response ? error.response.data : error.message);
      });
    } else {
      alert("All fields are required.");
    }
  };

  const handleCategorySelect = (category: string) => {
    setCategory(category);
  };

  const handleImageUpload = (files: File[]) => {
    setFiles((prev) => [...prev, ...files]);
    files.forEach((file) => {
      const formData = new FormData();
      formData.append("file", file);

      axios.post('https://api.escuelajs.co/api/v1/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total ?? 1));
          setUploadProgress((prev) => [...prev, percentCompleted]);
        }
      })
      .then(response => {
        setImages((prev) => [...prev, response.data.location]);
        console.log("Upload successful!", response.data);
      })
      .catch(error => {
        console.error("Upload failed!", error.response ? error.response.data : error.message);
      });
    });
  };

  return (
    <div className='min-h-screen my-16 mb-20'>
      <div className='shadow-lg max-w-[500px] mx-auto py-6 sm:py-8 lg:py-10 border-2 bg-gray-50 border-gray-100 rounded-xl'>
        <h1 className='text-center font-bold text-2xl sm:text-3xl mb-8'>Upload product</h1>
        <ImageUpload onUpload={handleImageUpload} uploadProgress={uploadProgress} imageUrls={images} />
        <TextInput label="Title" value={title} onChange={setTitle} />
        <NumberInput label="Price" value={price} onChange={setPrice} />
        <div className='items-center w-[90%] sm:w-[80%] mx-auto mt-4 sm:mt-8'>
          <h3 className='font-semibold text-base sm:text-lg mb-1'>Category</h3>
          <CategorySelector categories={categories} onSelect={handleCategorySelect} />
        </div>
        <div className='flex justify-center mt-6 sm:mt-8'>
          <SubmitButton onClick={onSubmit} isPending={isPending} />
        </div>
      </div>
    </div>
  );
}

export default Upload;
