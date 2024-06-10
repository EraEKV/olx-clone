'use client';

import React, { useState, DragEvent, ChangeEvent } from 'react';
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
    if (title && price && category && images.length > 0) {
      createPost({ title, price, category, images });
      router.push('/products');
    } else {
      alert("All fields are required.");
    }
  };

  const handleCategorySelect = (category: string) => {
    setCategory(category);
  };

  const handleImageUpload = (file: File) => {
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
      console.error("Upload failed!", error);
    });
  };

  const handleFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    setFiles((prev) => [...prev, ...newFiles]);
    newFiles.forEach(file => handleImageUpload(file));
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const newFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...newFiles]);
    newFiles.forEach(file => handleImageUpload(file));
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className='min-h-screen my-16 mb-20'>
      <div className='shadow-lg max-w-[500px] mx-auto py-6 sm:py-8 lg:py-10 border-2 bg-gray-50 border-gray-100 rounded-xl'>
        <h1 className='text-center font-bold text-2xl sm:text-3xl mb-8'>Upload product</h1>
        <div
          className="flex flex-col w-[90%] sm:w-[80%] max-h-32 mx-auto items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {files.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img src={image} alt="Uploaded" className="w-full h-auto rounded-lg" />
                  {uploadProgress[index] < 100 && (
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 rounded-lg">
                      <div className="bg-blue-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: `${uploadProgress[index]}%` }}>
                        {uploadProgress[index]}%
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-500">Upload images or drop here</p>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFilesChange}
                multiple
                id="fileInput"
              />
              <label
                htmlFor="fileInput"
                className="inline-block mt-2 text-blue-500 cursor-pointer hover:underline"
              >
                Choose files
              </label>
            </div>
          )}
        </div>
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
