import { useState } from 'react';
import './CategorySelector.css';

interface CategorySelectorProps {
  title: string;
  number: number;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export default function CategorySelector({
  title,
  number,
  checked,
  onChange,
}: CategorySelectorProps) {
  const [internalSelected, setInternalSelected] = useState(false);

  const isControlled = checked !== undefined;
  const isSelected = isControlled ? checked : internalSelected;

  const handleToggle = () => {
    const nextVal = !isSelected;
    if (!isControlled) {
      setInternalSelected(nextVal);
    }
    onChange?.(nextVal);
  };

  return (
    <div
      className='category-selector-input-container'
      onClick={handleToggle}
      role='checkbox'
      aria-checked={isSelected}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          handleToggle();
        }
      }}>
      <input
        type='checkbox'
        checked={isSelected}
        onChange={() => {}} // handled by container click
        aria-label={`${title} (${number})`}
        tabIndex={-1}
      />
      <label className='selector-label'>{title}</label>
      <span>({number})</span>
    </div>
  );
}
