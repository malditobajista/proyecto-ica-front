import './App.css'
import Navbar from './components/Navbar';
// import FormBusqueda from './components/FormBusqueda'
// import Carousel from './components/CarouselPropiedades'
// import { PropertyCardProps } from './components/PropertyCard';
// import Button from './components/Button';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// import Banner from './components/Banner';
// import placeholderPropiedades from './assets/placeholderPropiedades';
// import propiedadesVenta from './assets/placeholderPropiedadesVenta';
// import propiedadesAlquiler from './assets/placeholderPropiedadesAlquiler';
import Alquileres from './pages/Alquileres';
import Home from './pages/Home';
import Ventas from './pages/Ventas';
import Contacto from './pages/Contacto';
import PublicarProp from './pages/PublicarProp';
import { Footer } from './components/Footer';

function App() {

  return (
    <div className="container-fluid bg-gray-100">
      <Router>
        <Navbar />

        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Ventas" element={<Ventas />} />
          <Route path="/Alquileres" element={<Alquileres />} />
          <Route path="/Contacto" element={<Contacto />} />
          <Route path="/login" element={<Home />} />
          <Route path="/PublicarProp" element={<PublicarProp />} />
        </Routes>

        <Footer />

      </Router>
    </div>
  )
}

export default App
