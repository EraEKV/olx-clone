import React from 'react';

interface NumberInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const NumberInput: React.FC<NumberInputProps> = ({ label, value, onChange }) => (
  <div className='items-center w-[90%] sm:w-[80%] mx-auto mt-4 sm:mt-8'>
    <h3 className='font-semibold text-base sm:text-lg mb-1'>{label}</h3>
    <input
      className='rounded-lg w-full px-3 py-2 border-2 border-gray-200 appearance-none'
      placeholder={`Enter ${label.toLowerCase()}`}
      type="number"
      style={{ '-moz-appearance': 'textfield', 'appearance': 'textfield' } as any}
      value={value}
      onChange={(e) => onChange(e.target.value)}
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
);

export default NumberInput;
