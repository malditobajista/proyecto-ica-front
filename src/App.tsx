import './App.css'
import Navbar from './components/atomos/Navbar';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import Alquileres from './pages/Alquileres';
import Home from './pages/Home';
// import Ventas from './pages/Ventas';
import Contacto from './pages/Contacto';
import PublicarProp from './pages/PublicarProp';
import { Footer } from './components/atomos/Footer';
import Propiedades from './pages/Propiedades';
import PropertyDetails from './pages/PropertyDetails';
import Profile from './pages/Profile';
import { MisPropiedades } from './pages/MisPropiedades';
import { MisFavoritas } from './pages/MisFavoritas';
import { PropertyProvider } from "./contexts/PropertyContext";
// import Destacadas from './pages/Destacadas';

function App() {

  return (
    <div>
      <PropertyProvider>
        <Router>
          <Navbar />
          <div className="main-content">
            <Routes>

              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              {/* <Route path="/ventas" element={<Ventas />} /> */}
              {/* <Route path="/alquileres" element={<Alquileres />} /> */}
              <Route path="/properties" element={<Propiedades />} />
              <Route path="/properties/:id" element={<PropertyDetails />} />
              {/* <Route path="/destacadas" element={<Destacadas />} /> */}
              <Route path="/contact" element={<Contacto />} />
              <Route path="/login" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/properties/created" element={<MisPropiedades />} />
              <Route path="/properties/favourites" element={<MisFavoritas />} />
              <Route path="/properties/create" element={<PublicarProp />} />

            </Routes>

          </div>

          <Footer />

        </Router>
      </PropertyProvider>
    </div>
  )
}

export default App
