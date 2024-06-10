"use client"

import React, { useState, DragEvent, ChangeEvent } from 'react';
import CategorySelector from '../components/layout/CategorySelector';

const categories = ['Electronics', 'Books', 'Clothing', 'Home', 'Sports'];

const Upload = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleCategorySelect = (category: string) => {
    console.log('Selected category:', category);
  };

  return (
    <div className='min-h-screen my-16 mb-20 shadow-lg max-w-[400px] mx-auto py-6 sm:py-8 lg:py-10 border-2 bg-gray-50 border-gray-100 rounded-xl'>
        <h1 className='text-center font-bold text-3xl mb-8'>Upload product</h1>
        <div
            className="flex flex-col w-[80%] h-32 mx-auto items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            >
            {image ? (
                <img src={image} alt="Uploaded" className="w-full h-auto rounded-lg" />
            ) : (
                <div className="text-center">
                <p className="text-gray-500">Upload image or drop here</p>
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                    id="fileInput"
                />
                <label
                    htmlFor="fileInput"
                    className="inline-block mt-2 text-blue-500 cursor-pointer hover:underline"
                >
                    Choose a file
                </label>
                </div>
            )}
        </div>
        <div className='items-center w-[80%] mx-auto mt-8'>
            <h3 className='font-semibold text-lg mb-1'>Title</h3>
            <input className='rounded-lg w-full px-3 py-2 border-2 border-gray-200' placeholder='Enter title' type="text" />
        </div>
        <div className='items-center w-[80%] mx-auto mt-8'>
            <h3 className='font-semibold text-lg mb-1'>Price</h3>
            <input 
                className='rounded-lg w-full px-3 py-2 border-2 border-gray-200 appearance-none' 
                placeholder='Enter price' 
                type="number" 
                style={{ '-moz-appearance': 'textfield', 'appearance': 'textfield' }} 
                />
                <style jsx>{`
                input::-webkit-outer-spin-button,
                input::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }

                input[type="number"] {
                    -moz-appearance: textfield;
                }
                `}</style>
        </div>
        <div className='items-center w-[80%] mx-auto mt-8'>
            <h3 className='font-semibold text-lg mb-1'>Category</h3>
            <CategorySelector categories={categories} onSelect={handleCategorySelect} />
            {/* <div className="flex justify-center items-center">
            </div> */}
        </div>
    </div>
  )
}

export default Upload