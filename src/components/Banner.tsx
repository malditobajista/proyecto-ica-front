import image from '../assets/imgs/placeholder.gif';
import imageMobile from '../assets/imgs/placeholderMobile.gif';

const Banner = () => {
    return (
        // <>
        //     {/* <section className='h-screen w-full flex justify-center items-center bg-gradient-to-b from-green-500 to-blue-500 p-0'> */}
        //     <img 
        //     src={image} alt="imagenAnimada" className='w-full h-full h-screen object-cover hidden md:block' />
        //     {/* </section> */}
        //     <section className='h-screen w-full flex justify-center items-center bg-gradient-to-b from-green-500 to-gray-50 md:hidden'>

        //         <img src={imageMobile} alt="imagenAnimada" className='w-full h-full object-cover block md:hidden' />
        //     </section>
        // </>
        <div className="relative h-screen w-full">
            <img
                src={image}
                alt="imagenAnimada"
                className="absolute inset-0 w-full h-full object-cover hidden md:block"
            />
            <img
                src={imageMobile}
                alt="imagenAnimada"
                className="absolute inset-0 w-full h-full object-cover block md:hidden"
            />
        </div>
    );
};

export default Banner;