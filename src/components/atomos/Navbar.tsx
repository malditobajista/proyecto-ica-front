import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginRegisterModal from "./Modal";
import { FaUser, FaChevronDown, FaChevronUp } from "react-icons/fa";
import logo from "../../assets/imgs/logo.png";
import { HiMenuAlt3 } from "react-icons/hi";
import { useAlert } from "../../contexts/AlertContext";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { showAlert } = useAlert();
  const { user, isAuthenticated, logoutUser } = useAuth();

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setHasScrolled(window.scrollY > 0);
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setIsNavOpen(false);
      setIsUserMenuOpen(false);
      showAlert("info", "Sesión cerrada correctamente");
      navigate("/home");
    } catch (error) {
      showAlert("error", "Error al cerrar sesión. Intente nuevamente");
      console.error("Error during logout:", error);
    }
  };

  const toggleUserMenu = useCallback(() => {
    if (isAuthenticated) {
      setIsUserMenuOpen((prev) => !prev);
    } else {
      setIsModalOpen(true);
    }
  }, [isAuthenticated]);

  const closeMenus = useCallback(() => {
    setIsNavOpen(false);
    setIsUserMenuOpen(false);
  }, []);

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

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeMenus]);

  useEffect(() => {
    closeMenus();
  }, [location, closeMenus]);

  const isActive = useCallback(
    (path: string) =>
      location.pathname === path
        ? "font-extrabold text-black underline"
        : "hover:text-accent-light transition-text duration-300",
    // ? "text-accent-light font-extrabold text-black"
    // : "hover:text-accent-light transition-text duration-300",
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

  const adminMenuItems = [
    ...userMenuItems,
    { path: "/properties/pending-approval", label: "Aprobar Propiedades" },
    { path: "/user/make-admin", label: "Crear administrador" },

  ];

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-40 bg-gradient-to-b to-blue-300 from-blue-600 text-black`}
    // className={`fixed top-0 left-0 right-0 z-40 bg-primary transition-transform duration-300`}
    >
      <div className="flex justify-between items-center p-2 pr-3">
        <Link to="/home">
          <img src={logo} alt="Logo" width="120" height="50" className="mr-4" />
        </Link>
        <div className="hidden md:flex gap-3 items-center">
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              className={`nav-button text-white ${isActive(path)} hover:font-bold `}
              to={path}
            >
              {label}
            </Link>
          ))}
          <div className="relative" ref={userMenuRef}>
            <button
              className={`nav-button text-white hover:text-accent-light hover:font-bold transition-text duration-300 flex items-center ${isUserMenuOpen ? "text-accent-light" : ""
                }`}
              onClick={toggleUserMenu}
              aria-label="Perfil de usuario"
            >
              <FaUser className="mr-2" />
              {isAuthenticated ? "Mi Cuenta" : "Iniciar Sesión"}
              {isUserMenuOpen ? (
                <FaChevronUp className="ml-2" />
              ) : (
                <FaChevronDown className="ml-2" />
              )}
            </button>
            {isUserMenuOpen && isAuthenticated && (
              // <div className="absolute right-0 mt-2 w-48 bg-background-light rounded-md shadow-lg py-1 z-50">
              <div className="absolute right-0 mt-2 w-48 bg-blue rounded-md shadow-lg py-1 z-50">
                {!user?.admin &&
                  userMenuItems.map(({ path, label }) => (
                    <Link
                      key={path}
                      className={`block px-4 py-2 text-sm text-white  hover:bg-blue-600 bg-blue-300 hover:text-white ${isActive(
                        // className={`block px-4 py-2 text-sm text-primary hover:bg-secondary hover:text-white ${isActive(
                        path
                      )}`}
                      to={path}
                      onClick={closeMenus}
                    >
                      {label}
                    </Link>
                  ))}

                {user?.admin &&
                  adminMenuItems.map(({ path, label }) => (
                    <Link
                      key={path}
                      className={`block px-4 py-2 text-sm text-white hover:bg-blue-600 hover:font-bold bg-blue-300 hover:text-white ${isActive(
                        path
                      )}`}
                      to={path}
                      onClick={closeMenus}
                    >
                      {label}
                    </Link>
                  ))}
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-blue-600 hover:font-bold bg-blue-300 hover:text-white"
                  onClick={handleLogout}
                >
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
        <button
          className="md:hidden nav-button text-2xl text-white hover:text-accent-light"
          onClick={() => setIsNavOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          <HiMenuAlt3 />
        </button>
      </div>

      {isNavOpen && (
        <div className="md:hidden flex flex-col gap-3 mt-3 text-right justify-end items-end bg-blue-300 p-4">
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              className={`nav-button text-white ${isActive(path)}`}
              to={path}
              onClick={closeMenus}
            >
              {label}
            </Link>
          ))}
          <button
            className={`nav-button text-white hover:text-accent-light transition-text duration-300 text-right flex items-center ${isUserMenuOpen ? "text-accent-light" : ""
              }`}
            onClick={toggleUserMenu}
            aria-label="Perfil de usuario"
          >
            <FaUser className="mr-2" />
            {isAuthenticated ? "Mi Cuenta" : "Iniciar Sesión"}
            <FaChevronDown className="ml-2" />
          </button>
          {isAuthenticated && isUserMenuOpen && (
            <>
              {!user?.admin &&
                userMenuItems.map(({ path, label }) => (
                  <Link
                    key={path}
                    className={`block px-4 py-2 text-sm text-white hover:bg-blue-600 hover:text-accent-light ${isActive(
                      path
                    )}`}
                    to={path}
                    onClick={closeMenus}
                  >
                    {label}
                  </Link>
                ))}

              {user?.admin &&
                adminMenuItems.map(({ path, label }) => (
                  <Link
                    key={path}
                    className={`block px-4 py-2 text-sm text-white hover:bg-primary hover:text-accent-light ${isActive(
                      path
                    )}`}
                    to={path}
                    onClick={closeMenus}
                  >
                    {label}
                  </Link>
                ))}
              <button
                className="nav-button hover:bg-primary hover:text-accent-light text-left pl-8"
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

