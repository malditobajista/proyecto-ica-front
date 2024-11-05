import React, { useEffect, useState } from 'react';
import Banner from '../components/atomos/Banner';
import Button from '../components/atomos/Button';
import FormBusqueda from '../components/FormBusqueda';
import Carousel from '../components/CarouselPropiedades';
import placeholderPropiedades from '../assets/placeholderPropiedades';
import Title from '../components/atomos/Title';
import Garantias from '../components/Garantias';
import { fetchProperties } from '../services/services';
import { Property } from '../utils/types';

const Home: React.FC = () => {
    const [propiedadesVenta, setPropiedadesVenta] = useState<Property[]>([]);
    const [propiedadesAlquiler, setPropiedadesAlquiler] = useState<Property[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
    }, []);
    useEffect(() => {
        window.scrollTo(0, 0);
        const loadProperties = async () => {
            try {
                const forSale = await fetchProperties("for-sale");
                setPropiedadesVenta(forSale);
                const forRent = await fetchProperties("for-rent");
                setPropiedadesAlquiler(forRent);

            } catch (err) {
                setError('Hubo un problema al cargar las propiedades.');
            } finally {
                setLoading(false);
            }
        };
        console.log(">>>", error);

        loadProperties();
    }, []);
    return (
        <div className="space-y-8  max-w-full ">
            <Banner />
            <section className=''>
                <FormBusqueda />
            </section>
            <hr />
            <section className=' px-0'>
                <Title text="En venta" />
                {loading ? <Title text="Cargando propiedades..." />
                    :
                    <Carousel properties={propiedadesVenta} />
                }
                <div className="pb-2">
                    <Button to="/Ventas">Ir a todas las propiedades en venta</Button>
                </div>
                <hr />
                <Title text="En alquiler" />
                {loading ? <Title text="Cargando propiedades..." />
                    :
                    <Carousel properties={propiedadesAlquiler} />
                }
                <div className="pb-2">
                    <Button to="/Alquileres">Ir a todas las propiedades en alquiler</Button>
                </div>
            </section>
            <hr />
            <section className=' '>
                <Title text="Comprar vender" />
                <Button to="/PublicarProp">Publicar</Button>
                <Button clase='ml-4' to="/Propiedades">Ir a todas las propiedades</Button>
            </section>
            <hr />
            {/* solo para usuarios no logueados y administradores */}
            <section className=' px-0'>
                <Title text="Propiedades destacadas" />
                <Carousel properties={placeholderPropiedades} />
                <div className="pb-2">
                    <Button to="/Propiedades">Ir a todas las propiedades</Button>
                </div>
            </section>
            <hr />

            {/* solo para usuarios logueados */}
            <section className=' px-0'>
                <Title text="Tus propiedades favoritas" />
                <Carousel properties={placeholderPropiedades} />
                <div className="pb-2">
                    <Button to="/">Ir a tus propiedades favoritas</Button>
                </div>
            </section>
            <hr />

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