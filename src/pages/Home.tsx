import React from 'react';
import Banner from '../components/Banner';
import Button from '../components/Button';
import FormBusqueda from '../components/FormBusqueda';
import Carousel from '../components/CarouselPropiedades';
import propiedadesVenta from '../assets/placeholderPropiedadesVenta';
import placeholderPropiedades from '../assets/placeholderPropiedades';
import propiedadesAlquiler from '../assets/placeholderPropiedadesAlquiler';

const Home: React.FC = () => {
    return (
        <div>
            <Banner />
            <section className=''>
                <h2>Buscador</h2>
                <FormBusqueda />
            </section>
            <hr />
            <section className=' px-0'>
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
            <hr />
            <section className=' '>
                <h2>Comprar vender</h2>
                <Button to="/">Publicar</Button>
                <Button to="/">Ir a todas las propiedades</Button>
            </section>
            <hr />
            <section className=' px-0'>
                <h2>Propiedades destacadas</h2>
                <Carousel properties={placeholderPropiedades} />
                <div className="pb-2">
                    <Button to="/">Ir a todas las propiedades en venta</Button>
                </div>
            </section>
            <hr />
            <section className=' px-0'>
                <h2>Nosotros</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, nemo.</p>
            </section>
            <hr />
            <section className=' '>
                <h2>Garantias</h2>
                <p className="flex justify-center gap-8">
                    <img src="https://placehold.co/60" width="60" height="60" alt="garantia" />
                    <img src="https://placehold.co/60" width="60" height="60" alt="garantia" />
                    <img src="https://placehold.co/60" width="60" height="60" alt="garantia" />
                </p>
            </section>
        </div>
    );
};

export default Home;