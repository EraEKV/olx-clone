import React, { ChangeEvent, DragEvent } from 'react';
import Image from 'next/image';

interface ImageUploadProps {
  onUpload: (files: File[]) => void;
  uploadProgress: number[];
  imageUrls: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload, uploadProgress, imageUrls }) => {
  const handleFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    onUpload(files);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    onUpload(files);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className="flex flex-col w-[90%] sm:w-[80%] max-h-32 mx-auto items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {imageUrls.length > 0 ? (
        <div className="grid grid-cols-2 gap-2">
          {imageUrls.map((image, index) => (
            <div key={index} className="relative">
              <Image src={image} alt="Uploaded" className="w-full h-auto rounded-lg" ></Image>
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
  );
};

export default ImageUpload;
