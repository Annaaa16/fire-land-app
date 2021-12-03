import { useState, useRef } from 'react';

// clsx
import clsx from 'clsx';

// material ui icons
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import useClickOutside from '@/hooks/useClickOutside';

// overlayscrollbars
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

import { productCategories } from '@/redux/slices/productsSlice';

interface FormCategoryProps {
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
}

function FormCategory({
  selectedCategory,
  onSelectCategory,
}: FormCategoryProps) {
  const [isOpenCategory, setIsOpenCategory] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, () => setIsOpenCategory(false));

  const handleSelectCategory = (category: string) => {
    onSelectCategory(category);
    setIsOpenCategory(false);
  };

  return (
    <div
      ref={containerRef!}
      className={clsx('relative', 'flex items-center mb-4', 'cursor-pointer')}>
      <input
        onClick={() => setIsOpenCategory(!isOpenCategory)}
        value={selectedCategory}
        autoComplete='off'
        readOnly
        placeholder='Select category'
        className={clsx(
          'w-full border  rounded-lg px-3 py-3 capitalize',
          isOpenCategory
            ? 'border-primary-v1 dark:border-primary-v3'
            : 'border-lt-line dark:border-dk-line',
          'transition-all',
          'bg-transparent dark:text-white',
          'cursor-pointer select-none'
        )}
      />
      <div
        className={clsx(
          'absolute right-px top-1/2',
          '-translate-y-1/2 px-2 border-l',
          isOpenCategory
            ? 'border-primary-v1 dark:border-primary-v3'
            : 'border-lt-line dark:border-dk-line',
          'bg-white dark:bg-dk-cpn'
        )}>
        <KeyboardArrowDownIcon
          className={clsx(
            '!text-2xl',
            isOpenCategory
              ? 'text-primary-v1 dark:text-primary-v3'
              : 'text-gray-400'
          )}
        />
      </div>

      {isOpenCategory && (
        <OverlayScrollbarsComponent
          className={clsx(
            '!absolute top-[calc(100%+10px)] left-0 right-0 z-10',
            'shadow-lg rounded-lg border h-60 w-full',
            isOpenCategory
              ? 'border-primary-v1 dark:border-primary-v3'
              : 'border-lt-line dark:border-dk-line',
            'bg-white dark:bg-dk-cpn dark:text-white'
          )}
          options={{
            scrollbars: { clickScrolling: true },
          }}>
          <ul className='py-2'>
            {Object.values(productCategories).map((category) => (
              <li
                onClick={() => handleSelectCategory(category)}
                key={category}
                className={clsx(
                  'pl-3 py-2 capitalize',
                  'hover:bg-primary-v1 dark:hover:bg-primary-v3 hover:text-white'
                )}>
                {category}
              </li>
            ))}
          </ul>
        </OverlayScrollbarsComponent>
      )}
    </div>
  );
}

export default FormCategory;
