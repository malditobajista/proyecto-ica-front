// import React, { useState } from 'react';
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// interface ImageSliderProps {
//     images: string[];
// }

// const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [selectedImage, setSelectedImage] = useState<string | null>(null);
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [startIndex, setStartIndex] = useState(0);
//     const maxVisibleThumbnails = 10;

//     const openModal = (image: string) => {
//         setSelectedImage(image);
//         setIsModalOpen(true);
//     };

//     const closeModal = () => {
//         setSelectedImage(null);
//         setIsModalOpen(false);
//     };

//     const nextImage = () => {
//         const newIndex = (currentIndex + 1) % images.length;
//         setCurrentIndex(newIndex);
//         updateThumbnailIndex(newIndex);
//     };

//     const prevImage = () => {
//         const newIndex = (currentIndex - 1 + images.length) % images.length;
//         setCurrentIndex(newIndex);
//         updateThumbnailIndex(newIndex);
//     };

//     const updateThumbnailIndex = (index: number) => {
//         if (index >= startIndex + maxVisibleThumbnails) {
//             setStartIndex((prevIndex) => Math.min(prevIndex + 1, images.length - maxVisibleThumbnails));
//         } else if (index < startIndex) {
//             setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
//         }
//     };

//     return (
//         <div className="property-detail-slider-wrapper clearfix w-full">
//             <div className="property-detail-slider-two flex overflow-hidden h-[calc(100vh-500px)] md:h-screen justify-center relative">
//                 <img
//                     src={images[currentIndex]}
//                     alt={`Image ${currentIndex + 1}`}
//                     className="w-full h-full object-fill"
//                     draggable="false"
//                 />
//                 <button
//                     onClick={prevImage}
//                     className="absolute left-1 md:left-20 top-1/2 transform -translate-y-1/2 bg-gray-400 bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-70"
//                 >
//                     <FaChevronLeft className="w-4 h-4 text-black  " />
//                 </button>
//                 <button
//                     onClick={nextImage}
//                     className="absolute right-1 md:right-20 top-1/2 transform -translate-y-1/2 bg-gray-400 bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-70"
//                 >
//                     <FaChevronRight className="w-4 h-4 text-black" />
//                 </button>
//             </div>
//             <div className="property-detail-slider-carousel-nav flex justify-center items-center mt-4">
//                 <ul className="slides flex overflow-x-auto">
//                     {images.slice(startIndex, startIndex + maxVisibleThumbnails).map((image, index) => (
//                         <li
//                             key={index + startIndex}
//                             className={`flex-none w-20 mr-2 cursor-pointer ${index + startIndex === currentIndex ? 'border-2 border-green-500' : ''}`}
//                             onClick={() => {
//                                 setCurrentIndex(index + startIndex);
//                                 openModal(image);
//                             }}
//                         >
//                             <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-auto object-cover" draggable="false" />
//                         </li>
//                     ))}
//                 </ul>
//             </div>

//             {isModalOpen && selectedImage && (
//                 <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
//                     <div className="relative w-full h-full flex items-center justify-center">
//                         <button
//                             className="absolute top-0 right-0 m-4 text-white text-2xl"
//                             onClick={closeModal}
//                         >
//                             &times;
//                         </button>
//                         <img src={selectedImage} alt="Selected" className="w-full h-full object-contain" />
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ImageSlider;

import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface ImageSliderProps {
    images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [startIndex, setStartIndex] = useState(0);
    const maxVisibleThumbnails = 10;

    const openModal = (image: string) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setIsModalOpen(false);
    };

    // const nextImage = () => {
    //     const newIndex = (currentIndex + 1) % images.length;
    //     setCurrentIndex(newIndex);
    //     updateThumbnailIndex(newIndex);
    // };

    // const prevImage = () => {
    //     const newIndex = (currentIndex - 1 + images.length) % images.length;
    //     setCurrentIndex(newIndex);
    //     updateThumbnailIndex(newIndex);
    // };
    const nextImage = () => {
        const newIndex = (currentIndex + 1) % images.length; // Asegúrate de que las imágenes se ciclen correctamente
        setCurrentIndex(newIndex);
        updateThumbnailIndex(newIndex);
    };

    const prevImage = () => {
        const newIndex = (currentIndex - 1 + images.length) % images.length;
        setCurrentIndex(newIndex);
        updateThumbnailIndex(newIndex);
    };

    const updateThumbnailIndex = (index: number) => {
        if (index >= startIndex + maxVisibleThumbnails) {
            setStartIndex((prevIndex) => Math.min(prevIndex + 1, images.length - maxVisibleThumbnails));
        } else if (index < startIndex) {
            setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "ArrowRight") {
            nextImage();
        } else if (event.key === "ArrowLeft") {
            prevImage();
        } else if (event.key === "Escape") {
            closeModal();
        }
    };

    // Añadir el event listener para las teclas
    useEffect(() => {
        if (isModalOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isModalOpen]);

    return (
        <div className="property-detail-slider-wrapper clearfix w-full">
            <div className="property-detail-slider-two flex overflow-hidden h-[calc(100vh-500px)] md:h-screen justify-center relative">
                <img
                    src={images[currentIndex]}
                    alt={`Image ${currentIndex + 1}`}
                    className="w-full h-full object-fill"
                    draggable="false"
                    onClick={() => openModal(images[currentIndex])}
                />
                <button
                    onClick={prevImage}
                    className="absolute left-1 md:left-20 top-1/2 transform -translate-y-1/2 bg-gray-400 bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-70"
                >
                    <FaChevronLeft className="w-4 h-4 text-black" />
                </button>
                <button
                    onClick={nextImage}
                    className="absolute right-1 md:right-20 top-1/2 transform -translate-y-1/2 bg-gray-400 bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-70"
                >
                    <FaChevronRight className="w-4 h-4 text-black" />
                </button>
            </div>
            <div className="property-detail-slider-carousel-nav flex justify-center items-center mt-4">
                <ul className="slides flex overflow-x-auto">
                    {images.slice(startIndex, startIndex + maxVisibleThumbnails).map((image, index) => (
                        <li
                            key={index + startIndex}
                            className={`flex-none w-20 mr-2 cursor-pointer ${index + startIndex === currentIndex ? 'border-2 border-green-500' : ''}`}
                            onClick={() => {
                                setCurrentIndex(index + startIndex);
                                openModal(image);
                            }}
                        >
                            <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-auto object-cover" draggable="false" />
                        </li>
                    ))}
                </ul>
            </div>

            {/* Modal */}
            {isModalOpen && selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="relative w-full h-full flex items-center justify-center">
                        <button
                            className="absolute top-0 right-0 m-4 text-white text-2xl"
                            onClick={closeModal}
                        >
                            &times;
                        </button>
                        <img src={selectedImage} alt="Selected" className="w-full h-full object-contain" />
                        <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-400 bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-70"
                        >
                            <FaChevronLeft className="w-4 h-4 text-white" />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-400 bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-70"
                        >
                            <FaChevronRight className="w-4 h-4 text-white" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageSlider;
