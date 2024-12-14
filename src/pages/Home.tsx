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

import playa1Gif from '../assets/imgs/playas/playa1.gif';
import playa2Gif from '../assets/imgs/playas/playa3.gif';
import playaMobile1Gif from '../assets/imgs/playas/playa2-mobile.gif';
import playaMobile2Gif from '../assets/imgs/playas/playa3-mobile.gif';

const Home: React.FC = () => {
    const [propiedadesVenta, setPropiedadesVenta] = useState<Property[]>([]);
    const [propiedadesAlquiler, setPropiedadesAlquiler] = useState<Property[]>([]);
    const [allPropiedades, setAllPropiedades] = useState<Property[]>([]);
    const [pinnedProperties, setPinnedProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const { properties, fetchAllProperties } = useProperties();

    // hooks para cambiar las imágenes en parallax
    const [desktopImage, setDesktopImage] = useState(playa1Gif);
    const [mobileImage, setMobileImage] = useState(playaMobile1Gif);

    useEffect(() => {
        const interval = setInterval(() => {
            setDesktopImage((prevImage) => (prevImage === playa1Gif ? playa2Gif : playa1Gif));
            setMobileImage((prevImage) => (prevImage === playaMobile1Gif ? playaMobile2Gif : playaMobile1Gif));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

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
            <div className="lg:max-w-[1300px] mx-auto">

                <Banner />
            </div>

            <div className="lg:max-w-[1200px] mx-auto">
                <section>
                    <FormBusqueda />
                </section>
                <hr />
                <section className='px-0'>
                    <Title text="En venta" size='large' />
                    {loading ? (
                        <Title text="Cargando propiedades..." />
                    ) : (
                        <Carousel properties={propiedadesVenta.length ? propiedadesVenta : []} />
                    )}
                    <div className="py-3">
                        <Button to="/ventas">Ir a propiedades en venta</Button>
                    </div>
                    <hr />
                    <Title text="En alquiler" size='large' />
                    {loading ? (
                        <Title text="Cargando propiedades..." size='large' />
                    ) : (
                        <Carousel properties={propiedadesAlquiler} />
                    )}
                    <div className="py-3">
                        <Button to="/alquileres">Ir a propiedades en alquiler</Button>
                    </div>
                </section>
                <hr />
                {/* Efecto Parallax */}
                <section className="relative h-[500px] md:h-[500px] overflow-hidden">
                    {/* Fondo para escritorio */}
                    <div
                        className="hidden md:block absolute inset-0 bg-cover bg-center bg-fixed"
                        style={{ backgroundImage: `url(${desktopImage})` }}
                    ></div>
                    {/* Fondo para móviles */}
                    <div
                        className="block md:hidden absolute inset-0 bg-cover bg-center bg-fixed h-[1000px]"
                        style={{ backgroundImage: `url(${mobileImage})` }}
                    ></div>
                </section>
                <hr />
                <section className='px-0'>
                    <Title text="Propiedades destacadas" size='large' />
                    <Carousel properties={pinnedProperties.length ? pinnedProperties : []} />
                    <div className="py-3">
                        <Button to="/destacadas">Ir a propiedades destacadas</Button>
                    </div>
                </section>
                <hr />
                <section className='px-0'>
                    <Title text="Tus propiedades favoritas" size='large' />
                    <Carousel properties={properties.length ? properties : []} />
                    <div className="py-3">
                        <Button to="/">Ir a tus propiedades favoritas</Button>
                    </div>
                </section>
                <hr />
                <section className='px-0'>
                    <Title text="Tus propiedades" size='large' />
                    <Carousel properties={allPropiedades.length ? allPropiedades : []} />
                    <div className="py-3">
                        <Button to="/">Ir a tus propiedades</Button>
                    </div>
                </section>
                <hr />
                <section className='px-0'>
                    <Title text="Nosotros" size='large' />
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
