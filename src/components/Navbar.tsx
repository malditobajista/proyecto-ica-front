import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal'; // Asegúrate de que la ruta sea correcta
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

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
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 p-3 mb-3 transition-colors duration-300 ${hasScrolled ? 'bg-gray-600 text-white' : 'bg-transparent'}`}>
                <div className="flex justify-between items-center">
                    <img
                        src="https://www.inmobiliariacostaazul.com/wp-content/uploads/2019/09/logo-1.png"
                        alt="Logo"
                        width="80"
                        height="40"
                        className="mr-4"
                    />
                    <div className="hidden md:flex gap-3">
                        <Link className="nav-button" to="/Home">Home</Link>
                        <Link className="nav-button" to="/Ventas">Ventas</Link>
                        <Link className="nav-button" to="/Alquileres">Alquileres</Link>
                        <Link className="nav-button" to="/Propiedades">Propiedades</Link>
                        <Link className="nav-button" to="/Contacto">Contacto</Link>
                        <Link className="nav-button" to="/PublicarProp">Publicar Propiedad</Link>
                        <button className="nav-button" onClick={() => setIsModalOpen(true)}>
                            <FontAwesomeIcon icon={faUser} size="sm" />
                        </button>
                    </div>
                    <button className="md:hidden" onClick={() => setIsNavOpen(!isNavOpen)}>
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            ></path>
                        </svg>
                    </button>
                </div>
                <div className={`${isNavOpen ? 'flex' : 'hidden'} flex-col md:hidden`}>
                    <Link className="nav-button" to="/Home">Home</Link>
                    <Link className="nav-button" to="/Ventas">Ventas</Link>
                    <Link className="nav-button" to="/Alquileres">Alquileres</Link>
                    <Link className="nav-button" to="/Propiedades">Propiedades</Link>
                    <Link className="nav-button" to="/Contacto">Contacto</Link>
                    <Link className="nav-button" to="/PublicarProp">Publicar Prop</Link>
                    <button className="nav-button" onClick={() => setIsModalOpen(true)}>
                        <FontAwesomeIcon icon={faUser} size="sm" />
                    </button>
                </div>
            </nav>
            <Modal isOpen={isModalOpen} onClose={handleModalClose} />
        </>
    );
};

export default Navbar;