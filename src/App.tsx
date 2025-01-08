import "./App.css";
import Navbar from "./components/atomos/Navbar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import Alquileres from './pages/Alquileres';
import Home from "./pages/Home";
// import Ventas from './pages/Ventas';
import Contacto from "./pages/Contacto";
import PublicarProp from "./pages/PublicarProp";
import { Footer } from "./components/atomos/Footer";
import Propiedades from "./pages/Propiedades";
import PropertyDetails from "./pages/PropertyDetails";
import Profile from "./pages/Profile";
import { MisPropiedades } from "./pages/MisPropiedades";
import { MisFavoritas } from "./pages/MisFavoritas";
import { PropertyProvider } from "./contexts/PropertyContext";
// import Destacadas from './pages/Destacadas';
import { AlertProvider } from "./contexts/AlertContext"; // Importa el AlertProvider
import ForgotPassword from "./components/atomos/ForgotPassword";
import ResetPassword from "./components/atomos/ResetPassword";
import LoginRegisterModal from "./components/atomos/Modal";

function App() {
  return (
    <div>
      <AlertProvider>
        <PropertyProvider>
          <Router>
            <Navbar />
            <div className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<LoginRegisterModal />
} />
                {/* <Route path="/alquileres" element={<Alquileres />} /> */}
                <Route path="/forgot-password" element={<ForgotPassword isOpen={true} onClose={() => {}} />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/properties" element={<Propiedades />} />
                <Route path="/properties/:id" element={<PropertyDetails />} />
                {/* <Route path="/destacadas" element={<Destacadas />} /> */}
                <Route path="/contact" element={<Contacto />} />
                <Route path="/login" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route
                  path="/properties/created"
                  element={<MisPropiedades />}
                />
                <Route
                  path="/properties/favourites"
                  element={<MisFavoritas />}
                />
                <Route path="/properties/create" element={<PublicarProp />} />
              </Routes>
            </div>

            <Footer />
          </Router>
        </PropertyProvider>
      </AlertProvider>
    </div>
  );
}

export default App;
