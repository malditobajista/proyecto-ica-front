import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 p-3 mb-3">
            <div className="flex justify-between items-center">
                <img src="https://www.inmobiliariacostaazul.com/wp-content/uploads/2019/09/logo-1.png" alt="Logo" width="80" height="40" className="mr-4" />
                <div className="hidden md:flex gap-3">
                    <Link className="nav-button" to="/Home">Home</Link>
                    <Link className="nav-button" to="/Ventas">Ventas</Link>
                    <Link className="nav-button" to="/Alquileres">Alquileres</Link>
                    <Link className="nav-button" to="/Propiedades">Propiedades</Link>
                    <Link className="nav-button" to="/Contacto">Contacto</Link>
                    <Link className="nav-button">Login</Link>
                    <Link className="nav-button" to="/PublicarProp">Publicar Prop</Link>
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
                <Link className="nav-button" to="/Alquielres">Alquileres</Link>
                <Link className="nav-button" to="/Propiedades">Propiedades</Link>
                <Link className="nav-button" to="/Contacto">Contacto</Link>
                <Link className="nav-button">Login</Link>
                <Link className="nav-button" to="/PublicarProp">Publicar Prop</Link>
            </div>
        </nav>
    );
};

export default Navbar;