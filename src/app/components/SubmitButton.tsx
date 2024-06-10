import React from 'react';

interface SubmitButtonProps {
  onClick: () => void;
  isPending: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick, isPending }) => (
  <button
    className='bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600'
    onClick={onClick}
    disabled={isPending}
  >
    {isPending ? 'Submitting...' : 'Upload File'}
  </button>
);

export default SubmitButton;
