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
import Destacadas from './pages/Destacadas';

function App() {

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <PropertyProvider>
        <Router>
          <Navbar />

          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/ventas" element={<Ventas />} />
            <Route path="/alquileres" element={<Alquileres />} />
            <Route path="/propiedades" element={<Propiedades />} />
            <Route path="/propiedades/:id" element={<PropertyDetails />} />
            <Route path="/destacadas" element={<Destacadas />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/login" element={<Home />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/mis-propiedades" element={<MisPropiedades />} />
            <Route path="/mis-favoritas" element={<MisFavoritas />} />
            <Route path="/publicarProp" element={<PublicarProp />} />

          </Routes>

          <Footer />

        </Router>
      </PropertyProvider>
    </div>
  )
}

export default App
