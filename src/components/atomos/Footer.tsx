import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../utils/Footer.css';

export const Footer = () => {
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setHasScrolled(true);
            } else {
                setHasScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <footer className={`sticky top-[100vh] p-5 transition-colors duration-300 ${hasScrolled ? 'bg-gray-700' : 'bg-gray-600'} text-white`}>
            <div className="flex flex-col md:flex-row justify-between items-center px-5">
                <div className="flex-shrink-0 mb-4 md:mb-0">
                    <Link title="Inmobiliaria Costa Azul" to="/Home">
                        <img
                            src="https://www.inmobiliariacostaazul.com/wp-content/uploads/2019/09/logo-1.png"
                            alt="Inmobiliaria Costa Azul"
                            width="100"
                            height="60"
                            className="bg-black"
                        />
                    </Link>
                </div>
                <div className="flex space-x-4 ">
                    <a className="facebook" href="https://www.facebook.com/inmobiliariacostaazul.lapaloma" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook-square fa-lg  hover:text-blue-500"></i>
                    </a>
                    <a className="youtube" href="https://www.youtube.com/channel/UCDNHUcAabL3I4XRk71CACqg" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-youtube fa-lg  hover:text-red-500"></i>
                    </a>
                    <a className="whatsapp" href="https://api.whatsapp.com/send?phone=59898384860&text=&source=&data=" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-whatsapp fa-lg  hover:text-green-500"></i>
                    </a>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-around p-5 gap-8">
                <section id="nav_menu-1" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <div>
                            <Link className="nav-button  hover:text-green-500" to="/Home" aria-current="page">Inicio</Link>
                        </div>
                        <div>
                            <Link className="nav-button  hover:text-green-500" to="/Alquileres">Alquileres</Link>
                        </div>
                        <div>
                            <Link className="nav-button  hover:text-green-500" to="/Ventas">Ventas</Link>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div>
                            <Link className="nav-button  hover:text-green-500" to="/Propiedades/">Propiedades</Link>
                        </div>
                        <div>
                            <Link className="nav-button  hover:text-green-500" to="/Contacto/">Contacto</Link>
                        </div>
                        <div>
                            <Link className="nav-button  hover:text-green-500" to="/PublicarProp/">Publicar propiedad</Link>
                        </div>
                    </div>
                </section>

                <section id="contact-info" className="flex flex-col gap-4">
                    <div className="contact-item  hover:text-green-500">
                        <p className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 384 512">
                                <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"></path>
                            </svg>
                        </p>
                        <p className="content">
                            <a
                                href="https://www.google.com/maps/place/Real+Estate+Costa+Azul/@-34.6345552,-54.1634234,17z/data=!3m1!4b1!4m6!3m5!1s0x95749c887837af5d:0xc00eb1ee62df83f8!8m2!3d-34.6345552!4d-54.1608485!16s%2Fg%2F1pp2w_lp7?entry=ttu&g_ep=EgoyMDI0MDkxOC4xIKXMDSoASAFQAw%3D%3D"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Profesor Yaneo esq. Zapicán en Costa Azul, La Paloma, Rocha
                            </a>
                        </p>
                    </div>
                    <div className="contact-item  hover:text-green-500">
                        <p className="icon">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 459 459" xmlSpace="preserve">
                                <g>
                                    <g>
                                        <path d="M91.8,198.9c35.7,71.4,96.9,130.05,168.3,168.3L316.2,311.1c7.649-7.649,17.85-10.199,25.5-5.1c28.05,10.2,58.649,15.3,91.8,15.3c15.3,0,25.5,10.2,25.5,25.5v86.7c0,15.3-10.2,25.5-25.5,25.5C193.8,459,0,265.2,0,25.5C0,10.2,10.2,0,25.5,0h89.25c15.3,0,25.5,10.2,25.5,25.5c0,30.6,5.1,61.2,15.3,91.8c2.55,7.65,0,17.85-5.1,25.5L91.8,198.9z"></path>
                                    </g>
                                </g>
                            </svg>
                        </p>
                        <p className="content">(+598) 4479 8463</p>
                    </div>
                    <div className="contact-item  hover:text-green-500">
                        <p className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 510 510">
                                <path d="M459 51H51C22.95 51 0 73.95 0 102v306c0 28.05 22.95 51 51 51h408c28.05 0 51-22.95 51-51V102c0-28.05-22.95-51-51-51zm0 102L255 280.5 51 153v-51l204 127.5L459 102v51z"></path>
                            </svg>
                        </p>
                        <a href="mailto:consultas@inmobiliariacostaazul.com" className="content">consultas@inmobiliariacostaazul.com</a>
                    </div>
                </section>
            </div>
        </footer>
    );
};