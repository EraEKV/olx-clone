import React, { useState } from 'react';

interface CategorySelectorProps {
  categories: string[];
  onSelect: (category: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ categories, onSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleSelect = (category: string) => {
    setSelectedCategory(category);
    onSelect(category);
  };

  return (
    <div className="flex flex-col items-center">
      <select
        value={selectedCategory}
        onChange={(e) => handleSelect(e.target.value)}
        className="bg-white border border-gray-300 rounded-lg p-2 w-full cursor-pointer"
      >
        <option value="" disabled>Select a category</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelector;
