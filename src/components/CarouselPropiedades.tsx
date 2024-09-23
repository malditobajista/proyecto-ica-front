// import { useState, useEffect } from 'react';
// import PropertyCard, { PropertyCardProps } from './PropertyCard';

// interface CarouselProps {
//     properties: PropertyCardProps[];
// }
// const Carousel: React.FC<CarouselProps> = ({ properties }) => {
//     const [currentIndex, setCurrentIndex] = useState(0);

//     useEffect(() => {
//         const next = (currentIndex + 1) % properties.length;
//         const id = setTimeout(() => setCurrentIndex(next), 200000);
//         return () => clearTimeout(id);
//     }, [currentIndex, properties.length]);

//     const goToPrevious = () => {
//         const previousIndex = currentIndex === 0 ? properties.length - 1 : currentIndex - 1;
//         setCurrentIndex(previousIndex);
//     };

//     const goToNext = () => {
//         const nextIndex = (currentIndex + 1) % properties.length;
//         setCurrentIndex(nextIndex);
//     };

//     return (
//         <section className=" overflow-hidden relative w-full pb-3">
//             <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)`, width: `${properties.length * 100}%` }}>
//                 {properties.map((property, index) => (
//                     <div key={index} className="flex-shrink-0">
//                         <PropertyCard {...property} />
//                     </div>
//                 ))}
//             </div>

//             <button onClick={goToPrevious} className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-4 focus:outline-none">
//                 &#10094;
//             </button>
//             <button onClick={goToNext} className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-4 focus:outline-none">
//                 &#10095;
//             </button>
//         </section>
//     );
// };

// export default Carousel;


// import { useState, useEffect } from 'react';
// import PropertyCard from './PropertyCard';
// import { PropertyCardProps } from '../utils/types';

// interface CarouselProps {
//     properties: PropertyCardProps[];
// }
// const Carousel: React.FC<CarouselProps> = ({ properties }) => {
//     const [currentIndex, setCurrentIndex] = useState(0);

//     useEffect(() => {
//         const next = (currentIndex + 1) % properties.length;
//         const id = setTimeout(() => setCurrentIndex(next), 20000);
//         return () => clearTimeout(id);
//     }, [currentIndex, properties.length]);

//     const goToPrevious = () => {
//         const previousIndex = currentIndex === 0 ? properties.length - 1 : currentIndex - 1;
//         setCurrentIndex(previousIndex);
//     };

//     const goToNext = () => {
//         const nextIndex = (currentIndex + 1) % properties.length;
//         setCurrentIndex(nextIndex);
//     };

//     return (
//         <section className="overflow-hidden relative w-full pb-3">
//             <div className="transition-transform duration-300 ease-in-out" >

//                 {properties.map((property, index) => (
//                     index % 3 === 0 && (
//                         <div key={index} className="flex-shrink-0">
//                             <PropertyCard {...property} />
//                         </div>
//                     )
//                 ))}
//             </div>

//             <button onClick={goToPrevious} className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-4 focus:outline-none">
//                 &#10094;
//             </button>
//             <button onClick={goToNext} className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-4 focus:outline-none">
//                 &#10095;
//             </button>
//         </section>
//     );
// };

// export default Carousel;

import { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard';
import { PropertyCardProps } from '../utils/types';

interface CarouselProps {
    properties: PropertyCardProps[];
}

const Carousel: React.FC<CarouselProps> = ({ properties }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 3; // Número de tarjetas por página
    const pageCount = Math.ceil(properties.length / pageSize); // Número total de páginas

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
            endIndex = startIndex + 1; // Muestra solo una propiedad en dispositivos móviles
        }

        return properties.slice(startIndex, endIndex);
    };
    return (
        <section className="overflow-hidden relative w-full pb-3">
            <div className="transition-transform duration-300 ease-in-out flex justify-around">
                {getPageProperties().map((property, index) => (
                    // <div key={index} className="flex-shrink-0">
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