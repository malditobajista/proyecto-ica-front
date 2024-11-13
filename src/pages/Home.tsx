import React, { useEffect, useState } from 'react';
import Banner from '../components/atomos/Banner';
import Button from '../components/atomos/Button';
import FormBusqueda from '../components/FormBusqueda';
import Carousel from '../components/CarouselPropiedades';
// import placeholderPropiedades from '../assets/placeholderPropiedades';
import Title from '../components/atomos/Title';
import Garantias from '../components/Garantias';
// import { fetchProperties } from '../services/services';
import { Property } from '../utils/types';
import Nosotros from '../components/Nosotros';
import { useProperties } from "../contexts/PropertyContext";
import { fetchPinnedProperties, fetchPropertiesByStatus } from '../services/services';

const Home: React.FC = () => {
    const [propiedadesVenta, setPropiedadesVenta] = useState<Property[]>([]);
    const [propiedadesAlquiler, setPropiedadesAlquiler] = useState<Property[]>([]);
    const [allPropiedades, setAllPropiedades] = useState<Property[]>([]);
    const [pinnedProperties, setPinnedProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const { properties, fetchAllProperties } = useProperties();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const loadProperties = async () => {
            try {
                const forSale = await fetchPropertiesByStatus("for-sale");
                const forRent = await fetchPropertiesByStatus("for-rent");
                const allProperties = await fetchPropertiesByStatus("all");
                const pinned = await fetchPinnedProperties();

                setAllPropiedades(allProperties);
                setPropiedadesVenta(forSale);
                setPropiedadesAlquiler(forRent);
                setPinnedProperties(pinned);

            } catch (err) {
                setError('Hubo un problema al cargar las propiedades.');
                console.log(err);
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllProperties();
        loadProperties();
    }, [error, fetchAllProperties]);

    return (
        <div className="space-y-8  max-w-full bg-white">
            <div className="lg:max-w-[1400px] mx-auto">

                <Banner />
            </div>

            <div className="lg:max-w-[1200px] mx-auto">
                <section>
                    <FormBusqueda />
                </section>
                <hr />
                <section className='px-0'>
                    <Title text="En venta" />
                    {loading ? (
                        <Title text="Cargando propiedades..." />
                    ) : (
                        <Carousel properties={propiedadesVenta.length ? propiedadesVenta : []} />
                    )}
                    <div className="py-3">
                        <Button to="/ventas">Ir a propiedades en venta</Button>
                    </div>
                    <hr />
                    <Title text="En alquiler" />
                    {loading ? (
                        <Title text="Cargando propiedades..." />
                    ) : (
                        <Carousel properties={propiedadesAlquiler} />
                    )}
                    <div className="py-3">
                        <Button to="/alquileres">Ir a propiedades en alquiler</Button>
                    </div>
                </section>
                <hr />
                <section className='px-0'>
                    <Title text="Propiedades destacadas" />
                    <Carousel properties={pinnedProperties.length ? pinnedProperties : []} />
                    <div className="py-3">
                        <Button to="/destacadas">Ir a propiedades destacadas</Button>
                    </div>
                </section>
                <hr />
                <section className='px-0'>
                    <Title text="Tus propiedades favoritas" />
                    <Carousel properties={properties.length ? properties : []} />
                    <div className="py-3">
                        <Button to="/">Ir a tus propiedades favoritas</Button>
                    </div>
                </section>
                <hr />
                <section className='px-0'>
                    <Title text="Tus propiedades" />
                    <Carousel properties={allPropiedades.length ? allPropiedades : []} />
                    <div className="py-3">
                        <Button to="/">Ir a tus propiedades</Button>
                    </div>
                </section>
                <hr />
                <section className='px-0'>
                    <Title text="Nosotros" />
                    <Nosotros />
                </section>
                <hr />
                <Garantias />
                <hr />
            </div>
        </div>
    );
};

export default Home;
