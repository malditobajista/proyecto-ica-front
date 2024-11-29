import React from 'react';

interface FilterCleanerProps {
    onClearFilters: () => void;
}

const FilterCleaner: React.FC<FilterCleanerProps> = ({ onClearFilters }) => {
    return (
        <button
            onClick={onClearFilters}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
        >
            Limpiar Filtros
        </button>
    );
};

export default FilterCleaner;
