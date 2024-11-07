import './App.css'
import Navbar from './components/atomos/Navbar';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Alquileres from './pages/Alquileres';
import Home from './pages/Home';
import Ventas from './pages/Ventas';
import Contacto from './pages/Contacto';
import PublicarProp from './pages/PublicarProp';
import { Footer } from './components/atomos/Footer';
import Propiedades from './pages/Propiedades';
import PropertyDetails from './pages/PropertyDetails';
import Perfil from './pages/Perfil';
import { MisPropiedades } from './pages/MisPropiedades';
import { MisFavoritas } from './pages/MisFavoritas';
import { PropertyProvider } from "./contexts/PropertyContext";

function App() {

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <PropertyProvider>
        <Router>
          <Navbar />

          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Ventas" element={<Ventas />} />
            <Route path="/Alquileres" element={<Alquileres />} />
            <Route path="/Propiedades" element={<Propiedades />} />
            <Route path="/propiedades/:id" element={<PropertyDetails />} />
            <Route path="/Contacto" element={<Contacto />} />
            <Route path="/Login" element={<Home />} />
            <Route path="/Perfil" element={<Perfil />} />
            <Route path="/Mis-propiedades" element={<MisPropiedades />} />
            <Route path="/Mis-favoritas" element={<MisFavoritas />} />
            <Route path="/PublicarProp" element={<PublicarProp />} />

          </Routes>

          <Footer />

        </Router>
      </PropertyProvider>
    </div>
  )
}

export default App
