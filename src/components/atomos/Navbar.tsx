import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Modal from './Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const location = useLocation();
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);
    // const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            setHasScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isLoggedIn = false;
    const isHomePage = location.pathname === '/' || location.pathname === '/Home';

    const isActive = (path: string) => location.pathname === path ? 'text-green-500 font-extrabold' : 'hover:text-green-500 transition-text duration-300';

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 p-3 mb-3 transition-colors duration-300 
                ${isHomePage && !hasScrolled ? 'bg-transparent' : 'bg-gray-600 text-white'}`}>
                <div className="flex justify-between items-center">
                    <Link to="/home">
                        <img
                            src="https://www.inmobiliariacostaazul.com/wp-content/uploads/2019/09/logo-1.png"
                            alt="Logo"
                            width="80"
                            height="40"
                            className="mr-4"
                        />
                    </Link>
                    <div className="hidden md:flex gap-3">
                        {/* Links de navegación para pantallas grandes */}
                        <Link className={`nav-button ${isActive('/home')}`} to="/home">Inicio</Link>

                        {/* <div
                            className="relative"
                            onMouseEnter={() => setIsSubMenuOpen(true)}
                            onMouseLeave={() => setIsSubMenuOpen(false)}
                        >
                            <button className={`nav-button ${isActive('/propiedades')}`} onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}>
                                Propiedades
                            </button>
                            {isSubMenuOpen && (
                                <div className="absolute top-full left-0 bg-gray-600 text-white shadow-lg rounded-md py-2">
                                    <Link className={`block px-4 py-2 ${isActive('/ventas')}`} to="/ventas">Ventas</Link>
                                    <Link className={`block px-4 py-2 ${isActive('/alquileres')}`} to="/alquileres">Alquileres</Link>
                                    <Link className={`block px-4 py-2 ${isActive('/destacadas')}`} to="/destacadas">Destacadas</Link>
                                    <Link className={`block px-4 py-2 ${isActive('/propiedades')}`} to="/propiedades">Todas las Propiedades</Link>
                                </div>
                            )}
                        </div> */}
                        <Link className={`nav-button ${isActive('/propiedades')}`} to="/propiedades">
                            Propiedades
                        </Link>
                        <Link className={`nav-button ${isActive('/contacto')}`} to="/contacto">Contacto</Link>
                        <Link className={`nav-button ${isActive('/publicarProp')}`} to="/publicarProp">Publicar Propiedad</Link>

                        {isLoggedIn ? (
                            <div
                                className="relative"
                                onMouseEnter={() => setIsUserMenuOpen(true)}
                                onMouseLeave={() => setIsUserMenuOpen(false)}
                            >
                                <button className="nav-button hover:text-green-500 transition-text duration-300" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
                                    <FontAwesomeIcon icon={faUser} size="sm" />
                                </button>
                                {isUserMenuOpen && (
                                    <div className="absolute top-full right-0 bg-gray-600 text-white shadow-lg rounded-md py-2">
                                        <Link className={`block px-4 py-2 ${isActive('/perfil')}`} to="/perfil">Perfil</Link>
                                        <Link className={`block px-4 py-2 ${isActive('/mis-propiedades')}`} to="/mis-propiedades">Mis Propiedades</Link>
                                        <Link className={`block px-4 py-2 ${isActive('/mis-favoritas')}`} to="/mis-favoritas">Mis Favoritas</Link>
                                        <button className="block w-full text-left px-4 py-2 hover:bg-green-500" onClick={() => {/* Lógica para cerrar sesión */ }}>
                                            Cerrar Sesión
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button className="nav-button hover:text-green-500 transition-text duration-300" onClick={() => setIsModalOpen(true)}>
                                <FontAwesomeIcon icon={faUser} size="sm" />
                            </button>
                        )}
                    </div>

                    {/* Botón de hamburguesa */}
                    <button className="md:hidden" onClick={() => setIsNavOpen(!isNavOpen)}>
                        <svg className="w-6 h-6 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>

                {/* Menú desplegable para móviles */}
                {isNavOpen && (
                    <div className="md:hidden flex flex-col gap-3 mt-3 text-right">
                        <Link className={`nav-button ${isActive('/home')}`} to="/home" onClick={() => setIsNavOpen(false)}>Inicio</Link>

                        {/* <button className="nav-button text-right" onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}>
                            Propiedades
                        </button>
                        {isSubMenuOpen && (
                            <div className="flex flex-col gap-2 pl-4">
                                <Link className={`nav-button ${isActive('/ventas')}`} to="/ventas" onClick={() => setIsNavOpen(false)}>Ventas</Link>
                                <Link className={`nav-button ${isActive('/alquileres')}`} to="/alquileres" onClick={() => setIsNavOpen(false)}>Alquileres</Link>
                                <Link className={`nav-button ${isActive('/destacadas')}`} to="/destacadas" onClick={() => setIsNavOpen(false)}>Destacadas</Link>
                                <Link className={`nav-button ${isActive('/propiedades')}`} to="/propiedades" onClick={() => setIsNavOpen(false)}>Todas las Propiedades</Link>
                            </div>
                        )} */}
                        <Link
                            className={`nav-button ${isActive('/propiedades')}`}
                            to="/propiedades"
                            onClick={() => setIsNavOpen(false)}
                        >
                            Propiedades
                        </Link>
                        <Link className={`nav-button ${isActive('/contacto')}`} to="/contacto" onClick={() => setIsNavOpen(false)}>Contacto</Link>
                        <Link className={`nav-button ${isActive('/publicarProp')}`} to="/publicarProp" onClick={() => setIsNavOpen(false)}>Publicar Propiedad</Link>

                        {isLoggedIn ? (
                            <div>
                                <button className="nav-button hover:text-green-500" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
                                    <FontAwesomeIcon icon={faUser} size="sm" />
                                </button>
                                {isUserMenuOpen && (
                                    <div className="flex flex-col gap-2 pl-4">
                                        <Link className={`nav-button ${isActive('/perfil')}`} to="/perfil" onClick={() => setIsNavOpen(false)}>Perfil</Link>
                                        <Link className={`nav-button ${isActive('/mis-propiedades')}`} to="/mis-propiedades" onClick={() => setIsNavOpen(false)}>Mis Propiedades</Link>
                                        <Link className={`nav-button ${isActive('/mis-favoritas')}`} to="/mis-favoritas" onClick={() => setIsNavOpen(false)}>Mis Favoritas</Link>
                                        <button className="nav-button hover:bg-green-500 text-right" onClick={() => { /* Lógica para cerrar sesión */ }}>
                                            Cerrar Sesión
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button className="nav-button hover:text-green-500 text-right " onClick={() => { setIsModalOpen(true); setIsNavOpen(false); }}>
                                <FontAwesomeIcon icon={faUser} size="sm" />
                            </button>
                        )}
                    </div>
                )}

                <Modal isOpen={isModalOpen} onClose={handleModalClose} />
            </nav>
        </>
    );
};

export default Navbar;
