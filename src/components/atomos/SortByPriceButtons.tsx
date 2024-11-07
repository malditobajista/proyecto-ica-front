import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

interface SortByPriceButtonsProps {
    onSortChange: (order: 'asc' | 'desc') => void;
    currentOrder: 'asc' | 'desc' | null;
}

const SortByPriceButtons: React.FC<SortByPriceButtonsProps> = ({ onSortChange, currentOrder }) => {
    const isActive = (order: 'asc' | 'desc') => currentOrder === order;

    return (
        <div className='text-center'>
            <p>Ordenar por precio</p>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-2 mb-4">
                <button
                    onClick={() => onSortChange('asc')}
                    className={`flex items-center justify-center gap-2 p-2 rounded-md 
                ${isActive('asc') ? 'bg-green-700' : 'bg-gray-400'} 
                text-white hover:bg-green-500 focus:outline-none`}
                >
                    <FaArrowUp />
                    <span>Ascendente</span>
                </button>
                <button
                    onClick={() => onSortChange('desc')}
                    className={`flex items-center justify-center gap-2 p-2 rounded-md 
                ${isActive('desc') ? 'bg-green-700' : 'bg-gray-400'} 
                text-white hover:bg-green-500 focus:outline-none`}
                >
                    <FaArrowDown />
                    <span>Descendente</span>
                </button>
            </div>
        </div>
    );
};

export default SortByPriceButtons;
