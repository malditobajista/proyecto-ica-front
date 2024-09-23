import { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard';
import { PropertyCardProps } from '../utils/types';

interface CarouselProps {
    properties: PropertyCardProps[];
}

const Carousel: React.FC<CarouselProps> = ({ properties }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 3;
    const pageCount = Math.ceil(properties.length / pageSize);

    useEffect(() => {
        const id = setTimeout(() => {
            const nextPage = (currentPage + 1) % pageCount;
            setCurrentPage(nextPage);
        }, 20000);
        return () => clearTimeout(id);
    }, [currentPage, pageCount]);

    const goToPreviousPage = () => {
        const previousPage = (currentPage - 1 + pageCount) % pageCount;
        setCurrentPage(previousPage);
    };

    const goToNextPage = () => {
        const nextPage = (currentPage + 1) % pageCount;
        setCurrentPage(nextPage);
    };

    // const getPageProperties = () => {
    //     const startIndex = currentPage * pageSize;
    //     const endIndex = startIndex + pageSize;
    //     return properties.slice(startIndex, endIndex);
    // };
    const getPageProperties = () => {
        const startIndex = currentPage * pageSize;
        let endIndex = startIndex + pageSize;

        if (window.innerWidth < 768) {
            endIndex = startIndex + 1;
        }

        return properties.slice(startIndex, endIndex);
    };
    return (
        <section className="overflow-hidden relative w-full pb-3">
            <div className="transition-transform duration-300 ease-in-out flex justify-around">
                {getPageProperties().map((property, index) => (
                    <div key={index} className="">
                        <PropertyCard {...property} />
                    </div>
                ))}
            </div>

            <button onClick={goToPreviousPage} className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-4 focus:outline-none">
                &#10094;
            </button>
            <button onClick={goToNextPage} className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-4 focus:outline-none">
                &#10095;
            </button>
        </section>
    );
};

export default Carousel;