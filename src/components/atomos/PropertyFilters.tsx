// PropertyFilters.tsx
import React from 'react';
import FilterButtons from './FilterButtons';
import SortByPriceButtons from './SortByPriceButtons';

interface PropertyFiltersProps {
    filterTypes: string[];
    sortOrder: 'asc' | 'desc' | null;
    onFilterChange: (type: string) => void;
    onSortChange: (order: 'asc' | 'desc') => void;
}

const PropertyFilters: React.FC<PropertyFiltersProps> = ({
    filterTypes,
    sortOrder,
    onFilterChange,
    onSortChange
}) => {
    return (
        <aside className="hidden mt-4 md:block md:w-1/4 w-full bg-white p-4 min-h-full rounded-lg">
            <div className="text-center">
                <h2 className="text-lg font-bold">Filtros de ordenamiento</h2>
                <hr className="my-2" />
                <SortByPriceButtons onSortChange={onSortChange} currentOrder={sortOrder} />
                <hr className="my-2" />
                <FilterButtons onFilterChange={onFilterChange} currentFilters={filterTypes} />
            </div>
        </aside>
    );
};

export default PropertyFilters;
