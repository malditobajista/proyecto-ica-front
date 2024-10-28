import React from 'react';
import Banner from '../components/Banner';
import Button from '../components/Button';
import FormBusqueda from '../components/FormBusqueda';
import Carousel from '../components/CarouselPropiedades';
import propiedadesVenta from '../assets/placeholderPropiedadesVenta';
import placeholderPropiedades from '../assets/placeholderPropiedades';
import propiedadesAlquiler from '../assets/placeholderPropiedadesAlquiler';
import Title from '../components/Title';
import Garantias from '../components/Garantias';

const Home: React.FC = () => {
    return (
        <div className="space-y-8  max-w-full ">
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
            {/* solo para usuarios no logueados y administradores */}
            <section className=' px-0'>
                <Title text="Propiedades destacadas" />
                <Carousel properties={placeholderPropiedades} />
                <div className="pb-2">
                    <Button to="/">Ir a todas las propiedades en venta</Button>
                </div>
            </section>
            {/* solo para usuarios logueados */}
            <section className=' px-0'>
                <Title text="Tus propiedades favoritas" />
                <Carousel properties={placeholderPropiedades} />
                <div className="pb-2">
                    <Button to="/">Ir a tus propiedades favoritas</Button>
                </div>
            </section>
            <section className=' px-0'>
                <Title text="Tus propiedades" />
                <Carousel properties={placeholderPropiedades} />
                <div className="pb-2">
                    <Button to="/">Ir a tus propiedades</Button>
                </div>
            </section>
            <hr />
            <section className=' px-0'>
                <Title text="Nosotros" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, nemo.</p>
            </section>
            <hr />

            <Garantias />
            <hr />
        </div>
    );
};

export default Home;