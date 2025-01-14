import { Link } from 'react-router-dom';
import { FaFacebookSquare, FaYoutube, FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import '../../utils/Footer.css';
import logo from '../../assets/imgs/logo.png';

export const Footer = () => {
    // const [hasScrolled, setHasScrolled] = useState(false);
    // const location = useLocation();

    // useEffect(() => {
    //     const handleScroll = () => {
    //         setHasScrolled(window.scrollY > 0);
    //     };

    //     window.addEventListener('scroll', handleScroll);
    //     return () => window.removeEventListener('scroll', handleScroll);
    // }, []);

    // useEffect(() => {
    //     setHasScrolled(false);
    // }, [location]);

    return (
        <footer className={`sticky top-[100vh] p-5 bg-gradient-to-b to-blue-600 from-blue-300 text-white`}>
            {/* <footer className={`sticky top-[100vh] p-5 transition-colors duration-300 ${hasScrolled ? 'bg-gray-700' : 'bg-gray-600 '} text-white`}> */}
            <div className="flex flex-col md:flex-row justify-between items-center px-5">
                <div className="flex-shrink-0 mb-4 md:mb-0">
                    <Link title="Inmobiliaria Costa Azul" to="/Home">
                        <img
                            src={logo}
                            alt="Inmobiliaria Costa Azul"
                            width="100"
                            height="60"
                        />
                    </Link>
                </div>
                <div className="flex space-x-4">
                    <a className="facebook" href="https://www.facebook.com/inmobiliariacostaazul.lapaloma" target="_blank" rel="noopener noreferrer">
                        <FaFacebookSquare className="fa-lg hover:text-blue-500 transition-text duration-300" size={25} />
                    </a>
                    <a className="youtube" href="https://www.youtube.com/channel/UCDNHUcAabL3I4XRk71CACqg" target="_blank" rel="noopener noreferrer">
                        <FaYoutube className="fa-lg hover:text-red-500 transition-text duration-300" size={25} />
                    </a>
                    <a className="whatsapp" href="https://api.whatsapp.com/send?phone=59898384860&text=&source=&data=" target="_blank" rel="noopener noreferrer">
                        <FaWhatsapp className="fa-lg hover:text-green-500 transition-text duration-300" size={25} />
                    </a>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-around p-5 gap-8">
                <section id="nav_menu-1" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <Link className="nav-button hover:text-green-500 transition-text duration-300" to="/Home">Inicio</Link>
                        <Link className="nav-button hover:text-green-500 transition-text duration-300" to="/Propiedades/">Propiedades</Link>
                    </div>
                    <div className="flex flex-col">
                        <Link className="nav-button hover:text-green-500 transition-text duration-300" to="/Contacto/">Contacto</Link>
                        <Link className="nav-button hover:text-green-500 transition-text duration-300" to="/PublicarProp/">Publicar propiedad</Link>
                    </div>
                </section>

                <section id="contact-info" className="flex flex-col gap-4 sm:pb-4">
                    <div className="contact-item hover:text-green-500 transition-text duration-300">
                        <FaMapMarkerAlt className="icon" />
                        <p className="content">
                            <a href="https://www.google.com/maps/place/Real+Estate+Costa+Azul/@-34.6345552,-54.1634234,17z/data=!3m1!4b1!4m6!3m5!1s0x95749c887837af5d:0xc00eb1ee62df83f8!8m2!3d-34.6345552!4d-54.1608485!16s%2Fg%2F1pp2w_lp7?entry=ttu&g_ep=EgoyMDI0MDkxOC4xIKXMDSoASAFQAw%3D%3D"
                                target="_blank"
                                rel="noopener noreferrer">
                                Profesor Yaneo esq. Zapicán en Costa Azul, La Paloma, Rocha
                            </a>
                        </p>
                    </div>
                    <div className="contact-item hover:text-green-500 transition-text duration-300">
                        <FaPhoneAlt className="icon" />
                        <p className="content">(+598) 4479 8463</p>
                    </div>
                    <div className="contact-item hover:text-green-500 transition-text duration-300">
                        <FaEnvelope className="icon" />
                        <a href="mailto:consultas@inmobiliariacostaazul.com" className="content">consultas@inmobiliariacostaazul.com</a>
                    </div>
                </section>
            </div>
        </footer>
    );
};
