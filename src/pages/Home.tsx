import React from 'react';
import Banner from '../components/Banner';
import Button from '../components/Button';
import FormBusqueda from '../components/FormBusqueda';
import Carousel from '../components/CarouselPropiedades';
import propiedadesVenta from '../assets/placeholderPropiedadesVenta';
import placeholderPropiedades from '../assets/placeholderPropiedades';
import propiedadesAlquiler from '../assets/placeholderPropiedadesAlquiler';
import Title from '../components/Title';

const Home: React.FC = () => {
    return (
        <div>
            <Banner />
            <section className=''>
                <FormBusqueda />
            </section>
            <hr />
            <section className=' px-0'>
                <Title text="En venta" />
                <Carousel properties={propiedadesVenta} />
                <div className="pb-2">
                    <Button to="/">Ir a todas las propiedades en venta</Button>
                </div>
                <hr />
                <Title text="En alquiler" />
                <Carousel properties={propiedadesAlquiler} />
                <div className="pb-2">
                    <Button to="/">Ir a todas las propiedades en alquiler</Button>
                </div>
            </section>
            <hr />
            <section className=' '>
                <Title text="Comprar vender" />
                <Button to="/">Publicar</Button>
                <Button clase='ml-4' to="/">Ir a todas las propiedades</Button>
            </section>
            <hr />
            <section className=' px-0'>
                <Title text="Propiedades destacadas" />
                <Carousel properties={placeholderPropiedades} />
                <div className="pb-2">
                    <Button to="/">Ir a todas las propiedades en venta</Button>
                </div>
            </section>
            <hr />
            <section className=' px-0'>
                <Title text="Nosotros" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, nemo.</p>
            </section>
            <hr />
            <section className=' '>
                <Title text="Nuestras garantías" />
                <p className="flex justify-around gap-8">
                    <img src="https://i2.wp.com/www.inmobiliariacostaazul.com/wp-content/uploads/2019/09/inmobiliaria_habilitada.png?resize=90%2C90&amp;ssl=1" alt="Inmobiliaria Habilitada" width="110" />
                    <img src="https://i0.wp.com/www.inmobiliariacostaazul.com/wp-content/uploads/2019/09/camara_inmobiliaria_uruguaya.png?resize=190%2C73&amp;ssl=1" alt="Cámara Inmobiliaria Uruguaya" width="110" />
                    <img src="https://i0.wp.com/www.inmobiliariacostaazul.com/wp-content/uploads/2019/09/camara_inmobiliaria_rocha.png?resize=196%2C73&amp;ssl=1" alt="Cámara Inmobiliaria de Rocha" width="110" />
                </p>
            </section>
            <hr />
        </div>
    );
};

export default Home;