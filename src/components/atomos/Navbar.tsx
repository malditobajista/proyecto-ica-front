import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginRegisterModal from "./Modal";
import { FaUser, FaBars, FaChevronDown, FaChevronUp } from "react-icons/fa";
import logo from "../../assets/imgs/logo.png";
import { hasCookie } from "../../utils/cookie";
import { logoutUser } from "../../services/users/userService";
import { HiMenuAlt3 } from "react-icons/hi";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(hasCookie("sessionIndicator"));
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleLogout = async () => {
    console.log("Logging out");
    await logoutUser();
    setIsLoggedIn(false);
    setIsNavOpen(false);
    setIsUserMenuOpen(false);
    navigate("/home");
  };

  const toggleUserMenu = useCallback(() => {
    if (isLoggedIn) {
      setIsUserMenuOpen(prev => !prev);
    } else {
      setIsModalOpen(true);
    }
  }, [isLoggedIn]);

  const closeMenus = useCallback(() => {
    setIsNavOpen(false);
    setIsUserMenuOpen(false);
  }, []);

  useEffect(() => {
    setIsLoggedIn(hasCookie("sessionIndicator"));
  }, []);

  useEffect(() => {
    setIsLoggedIn(hasCookie("sessionIndicator"));
  }, [isModalOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target as Node) &&
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        closeMenus();
      }
    };

    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [closeMenus]);

  useEffect(() => {
    closeMenus();
  }, [location, closeMenus]);

  const isHomePage =
    location.pathname === "/" || location.pathname.toLowerCase() === "/home";

  const isActive = useCallback(
    (path: string) =>
      location.pathname === path
        ? "text-green-500 font-extrabold"
        : "hover:text-green-500 transition-text duration-300",
    [location.pathname]
  );

  const navLinks = [
    { path: "/home", label: "Inicio" },
    { path: "/properties", label: "Propiedades" },
    { path: "/contact", label: "Contacto" },
    { path: "/properties/create", label: "Publicar Propiedad" },
  ];

  const userMenuItems = [
    { path: "/profile", label: "Perfil" },
    { path: "/properties/created", label: "Mis Propiedades" },
    { path: "/properties/favourites", label: "Mis Favoritas" },
  ];

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-40 p-2 pr-3 transition-colors duration-300 
            ${
              isHomePage && !hasScrolled
                ? "bg-transparent"
                : "bg-gradient-to-b from-gray-800 to-gray-400 text-white"
            }`}
    >
      <div className="flex justify-between items-center">
        <Link to="/home">
          <img src={logo} alt="Logo" width="120" height="50" className="mr-4" />
        </Link>
        <div className="hidden md:flex gap-3 items-center">
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              className={`nav-button ${isActive(path)}`}
              to={path}
            >
              {label}
            </Link>
          ))}
          <div className="relative" ref={userMenuRef}>
            <button
              className={`nav-button hover:text-green-500 transition-text duration-300 flex items-center ${isUserMenuOpen ? 'text-green-500' : ''}`}
              onClick={toggleUserMenu}
              aria-label="Perfil de usuario"
            >
              <FaUser className="mr-2" />
              {isLoggedIn ? "Mi Cuenta" : "Iniciar Sesión"}
              {isUserMenuOpen ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" /> }
            </button>
            {isUserMenuOpen && isLoggedIn && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                {userMenuItems.map(({ path, label }) => (
                  <Link
                    key={path}
                    className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${isActive(
                      path
                    )}`}
                    to={path}
                    onClick={closeMenus}
                  >
                    {label}
                  </Link>
                ))}
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
        <button
          className="md:hidden nav-button text-2xl"
          onClick={() => setIsNavOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
            <HiMenuAlt3 />
        </button>
      </div>

      {isNavOpen && (
        <div className="md:hidden flex flex-col gap-3 mt-3">
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              className={`nav-button ${isActive(path)}`}
              to={path}
              onClick={closeMenus}
            >
              {label}
            </Link>
          ))}
          <button
            className={`nav-button hover:text-green-500 transition-text duration-300 text-left flex items-center ${isUserMenuOpen ? 'text-green-500' : ''}`}
            onClick={toggleUserMenu}
            aria-label="Perfil de usuario"
          >
            <FaUser className="mr-2" />
            {isLoggedIn ? "Mi Cuenta" : "Iniciar Sesión"}
            <FaChevronDown className="ml-2" />
          </button>
          {isLoggedIn && isUserMenuOpen && (
            <>
              {userMenuItems.map(({ path, label }) => (
                <Link
                  key={path}
                  className={`nav-button ${isActive(path)} pl-8`}
                  to={path}
                  onClick={closeMenus}
                >
                  {label}
                </Link>
              ))}
              <button
                className="nav-button hover:bg-green-500 text-left pl-8"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </button>
            </>
          )}
        </div>
      )}
      <LoginRegisterModal isOpen={isModalOpen} onClose={handleModalClose} />
    </nav>
  );
};

export default Navbar;

