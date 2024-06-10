import React from 'react';

interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ label, value, onChange }) => (
  <div className='items-center w-[90%] sm:w-[80%] mx-auto mt-4 sm:mt-8'>
    <h3 className='font-semibold text-base sm:text-lg mb-1'>{label}</h3>
    <input
      className='rounded-lg w-full px-3 py-2 border-2 border-gray-200'
      placeholder={`Enter ${label.toLowerCase()}`}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default TextInput;
