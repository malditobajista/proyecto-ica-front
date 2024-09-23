import React, { useState } from 'react';

const Navbar = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-50 to-green-500 p-3 mb-3">
            <div className="flex justify-between items-center">
                <img src="https://placehold.co/25" alt="Logo" width="25" height="25" className="mr-4" />
                <div className="hidden md:flex gap-3">
                    <button className="nav-button">Home</button>
                    <button className="nav-button">Ventas</button>
                    <button className="nav-button">Alquileres</button>
                    <button className="nav-button">Contacto</button>
                    <button className="nav-button">Login</button>
                    <button className="nav-button">Publicar Prop</button>
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
                <button className="nav-button">Home</button>
                <button className="nav-button">Ventas</button>
                <button className="nav-button">Alquileres</button>
                <button className="nav-button">Contacto</button>
                <button className="nav-button">Login</button>
                <button className="nav-button">Publicar Prop</button>
            </div>
        </nav>
    );
};

export default Navbar;