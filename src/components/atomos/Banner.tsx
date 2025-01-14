// import image from '../../assets/imgs/placeholder.gif';
import imageMobile from '../../assets/imgs/placeholderMobile.gif';

// const Banner = () => {
//     return (
//         <div className="relative h-screen w-full">
//             <img
//                 src={image}
//                 alt="imagenAnimada"
//                 className="absolute inset-0 w-full h-full object-cover hidden md:block"
//             />
//             <img
//                 src={imageMobile}
//                 alt="imagenAnimada"
//                 className="absolute inset-0 w-full h-full object-cover block md:hidden"
//             />
//         </div>
//     );
// };

// export default Banner;


const Banner = () => {
    return (
        <div className="relative h-screen w-full overflow-hidden py-0">
            {/* Video de fondo para pantallas grandes */}
            <div className="absolute inset-0 w-full h-full hidden md:block">
                <iframe
                    src="https://www.youtube.com/embed/bgzEFsSRSdU?si=4dGwqY8dnLq1o2f4&controls=0&start=13&autoplay=1&loop=1&mute=1&playlist=bgzEFsSRSdU&modestbranding=1&showinfo=0&disablekb=1"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                // style={{ border: 'none' }} // Elimina cualquier borde
                ></iframe>
            </div>

            {/* Imagen de fondo para dispositivos móviles */}
            <img
                src={imageMobile}
                alt="imagenAnimada"
                className="absolute inset-0 w-full h-full object-cover block md:hidden"
            />
        </div>
    );
};

export default Banner;
