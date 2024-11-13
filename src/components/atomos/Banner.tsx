import image from '../../assets/imgs/placeholder.gif';
import imageMobile from '../../assets/imgs/placeholderMobile.gif';

const Banner = () => {
    return (
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