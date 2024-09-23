import './App.css'
import Navbar from './components/Navbar';
import FormBusqueda from './components/FormBusqueda'
import Carousel from './components/CarouselPropiedades'
// import { PropertyCardProps } from './components/PropertyCard';
import Button from './components/Button';
import { BrowserRouter as Router } from 'react-router-dom';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Banner from './components/Banner';
import placeholderPropiedades from './assets/placeholderPropiedades';
import propiedadesVenta from './assets/placeholderPropiedadesVenta';
import propiedadesAlquiler from './assets/placeholderPropiedadesAlquiler';

function App() {

  return (
    <Router>

      <div className="container-fluid bg-gray-400">
        <Navbar />
        <Banner />
        <section className='bg-gradient-to-b from-gray-50 to-green-500'>
          <h2>Buscador</h2>
          <FormBusqueda />
        </section>
        <section className='bg-gradient-to-b from-green-500 to-gray-50 px-0'>
          <h2>Propiedades</h2>
          <h2>En venta</h2>
          <Carousel properties={propiedadesVenta} />
          <div className="pb-2">
            <Button to="/">Ir a todas las propiedades en venta</Button>
          </div>
          <hr />
          <h2>En alquiler</h2>
          <Carousel properties={propiedadesAlquiler} />
          <div className="pb-2">
            <Button to="/">Ir a todas las propiedades en alquiler</Button>
          </div>
        </section>
        <section className='bg-gradient-to-b  from-gray-50 to-green-500 '>
          <h2>Comprar vender</h2>
          <Button to="/">Publicar</Button>
          <Button to="/">Ir a todas las propiedades</Button>
        </section>
        <section className='bg-gradient-to-b from-green-500 to-gray-50 px-0'>
          <h2>Propiedades destacadas</h2>
          <Carousel properties={placeholderPropiedades} />
          <div className="pb-2">
            <Button to="/">Ir a todas las propiedades en venta</Button>
          </div>
        </section>
        <section className='bg-gradient-to-b  from-gray-50 to-green-500 px-0'>
          <h2>Nosotros</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, nemo.</p>
        </section>
        <section className='bg-gradient-to-b from-green-500 to-gray-50 '>
          <h2>Garantias</h2>
          <p className="flex justify-center gap-8">
            <img src="https://placehold.co/60" width="60" height="60" alt="garantia" />
            <img src="https://placehold.co/60" width="60" height="60" alt="garantia" />
            <img src="https://placehold.co/60" width="60" height="60" alt="garantia" />
          </p>
        </section>
        <section className='bg-gradient-to-b from-gray-50 to-gray-500'>
          <footer>
            <span>Lorem, ipsum.</span>
            <span>Lorem, ipsum.</span>
            <span>Lorem, ipsum.</span>
            <span>Lorem, ipsum.</span>
            <span>Lorem, ipsum.</span>
            <span>Lorem, ipsum.</span>
            <span>Lorem, ipsum.</span>
            <span>Lorem, ipsum.</span>
          </footer>
        </section>
      </div>
    </Router>
  )
}

export default App
