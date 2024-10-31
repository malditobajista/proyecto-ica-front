import './App.css'
import Navbar from './components/Navbar';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Alquileres from './pages/Alquileres';
import Home from './pages/Home';
import Ventas from './pages/Ventas';
import Contacto from './pages/Contacto';
import PublicarProp from './pages/PublicarProp';
import { Footer } from './components/Footer';
import Propiedades from './pages/Propiedades';

function App() {

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Ventas" element={<Ventas />} />
          <Route path="/Alquileres" element={<Alquileres />} />
          <Route path="/Propiedades" element={<Propiedades />} />
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
