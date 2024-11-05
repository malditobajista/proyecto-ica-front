import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Modal from './Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


const Navbar = () => {
    const location = useLocation();
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const navMenuRef = useRef<HTMLDivElement>(null);
    const subMenuRef = useRef<HTMLDivElement>(null);
    const userMenuRef = useRef<HTMLDivElement>(null);

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

    // useEffect(() => {
    //     const handleClickOutside = (event: MouseEvent) => {
    //         const target = event.target as Node | null;
    //         if (
    //             target &&
    //             subMenuRef.current && !subMenuRef.current.contains(target) &&
    //             userMenuRef.current && !userMenuRef.current.contains(target) &&
    //             navMenuRef.current && !navMenuRef.current.contains(target)
    //         ) {
    //             setIsSubMenuOpen(false);
    //             setIsUserMenuOpen(false);
    //             setIsNavOpen(false);
    //         }
    //     };

    //     document.addEventListener('mousedown', handleClickOutside);
    //     return () => document.removeEventListener('mousedown', handleClickOutside);
    // }, []);

    const isLoggedIn = true;
    const isHomePage = location.pathname === '/' || location.pathname === '/Home';

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 p-3 mb-3 transition-colors duration-300 
                ${isHomePage && !hasScrolled ? 'bg-transparent' : 'bg-gray-600 text-white'}`}>
                <div className="flex justify-between items-center">
                    <img
                        src="https://www.inmobiliariacostaazul.com/wp-content/uploads/2019/09/logo-1.png"
                        alt="Logo"
                        width="80"
                        height="40"
                        className="mr-4"
                    />
                    <div className="hidden md:flex gap-3">
                        <Link className="nav-button hover:text-green-500" to="/Home">Inicio</Link>

                        <div
                            className="relative"
                            onMouseEnter={() => setIsSubMenuOpen(true)}
                            onMouseLeave={() => setIsSubMenuOpen(false)}
                        >
                            <button className="nav-button hover:text-green-500"
                                onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
                            >
                                Propiedades
                            </button>
                            {isSubMenuOpen && (
                                <div className="absolute top-full left-0 bg-gray-600 text-white shadow-lg rounded-md py-2">
                                    <Link className="block px-4 py-2 hover:bg-green-500" to="/Ventas">Ventas</Link>
                                    <Link className="block px-4 py-2 hover:bg-green-500" to="/Alquileres">Alquileres</Link>
                                    <Link className="block px-4 py-2 hover:bg-green-500" to="/Propiedades">Todas las Propiedades</Link>
                                </div>
                            )}
                        </div>

                        <Link className="nav-button hover:text-green-500" to="/Contacto">Contacto</Link>
                        <Link className="nav-button hover:text-green-500" to="/PublicarProp">Publicar Propiedad</Link>

                        {isLoggedIn ? (
                            <div
                                className="relative"
                                onMouseEnter={() => setIsUserMenuOpen(true)}
                                onMouseLeave={() => setIsUserMenuOpen(false)}
                            >
                                <button className="nav-button hover:text-green-500" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
                                    <FontAwesomeIcon icon={faUser} size="sm" />
                                </button>
                                {isUserMenuOpen && (
                                    <div className="absolute top-full right-0 bg-gray-600 text-white shadow-lg rounded-md py-2">
                                        <Link className="block px-4 py-2 hover:bg-green-500" to="/Perfil">Perfil</Link>
                                        <Link className="block px-4 py-2 hover:bg-green-500" to="/mis-propiedades">Mis Propiedades</Link>
                                        <Link className="block px-4 py-2 hover:bg-green-500" to="/mis-favoritas">Mis Favoritas</Link>
                                        <button className="block w-full text-left px-4 py-2 hover:bg-green-500" onClick={() => {/* Lógica para cerrar sesión */ }}>
                                            Cerrar Sesión
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button className="nav-button hover:text-green-500" onClick={() => setIsModalOpen(true)}>
                                <FontAwesomeIcon icon={faUser} size="sm" />
                            </button>
                        )}
                    </div>

                    <button className="md:hidden" onClick={() => setIsNavOpen(!isNavOpen)}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>

                <div ref={navMenuRef} className={`${isNavOpen ? 'flex' : 'hidden'} flex-col items-end md:hidden text-right`}>
                    <Link className="nav-button hover:text-green-500" to="/Home">Inicio</Link>
                    <div className="relative" ref={subMenuRef}>
                        <button className="nav-button hover:text-green-500" onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}>
                            Propiedades
                        </button>
                        {isSubMenuOpen && (
                            <div className="flex flex-col bg-gray-600 text-white shadow-lg rounded-md py-2">
                                <Link className="block px-4 py-2 hover:bg-green-500" to="/Ventas">Ventas</Link>
                                <Link className="block px-4 py-2 hover:bg-green-500" to="/Alquileres">Alquileres</Link>
                                <Link className="block px-4 py-2 hover:bg-green-500" to="/Propiedades">Todas las Propiedades</Link>
                            </div>
                        )}
                    </div>
                    <Link className="nav-button hover:text-green-500" to="/Contacto">Contacto</Link>
                    <Link className="nav-button hover:text-green-500" to="/PublicarProp">Publicar Propiedad</Link>

                    {isLoggedIn ? (
                        <div className="relative" ref={userMenuRef}>
                            <button className="nav-button hover:text-green-500" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
                                <FontAwesomeIcon icon={faUser} size="sm" />
                            </button>
                            {isUserMenuOpen && (
                                <div className="flex flex-col bg-gray-600 text-white shadow-lg rounded-md py-2">
                                    <Link className="block px-4 py-2 hover:bg-green-500" to="/perfil">Perfil</Link>
                                    <Link className="block px-4 py-2 hover:bg-green-500" to="/mis-propiedades">Mis Propiedades</Link>
                                    <Link className="block px-4 py-2 hover:bg-green-500" to="/mis-favoritas">Mis Favoritas</Link>
                                    <button className="block w-full text-right px-4 py-2 hover:bg-green-500" onClick={() => {/* Lógica para cerrar sesión */ }}>
                                        Cerrar Sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button className="nav-button hover:text-green-500" onClick={() => setIsModalOpen(true)}>
                            <FontAwesomeIcon icon={faUser} size="sm" />
                        </button>
                    )}
                </div>
            </nav>
            <Modal isOpen={isModalOpen} onClose={handleModalClose} />
        </>
    );
};

export default Navbar;
