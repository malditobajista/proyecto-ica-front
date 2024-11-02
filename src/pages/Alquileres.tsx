import React, { useEffect, useState } from 'react';
import { fetchProperties } from '../services/services';
import PropertyHorizontalCard from '../components/PropertyHorizontalCard';
import Title from '../components/Title';
import { Property } from '../utils/types';

const Alquileres: React.FC = () => {
    const [propiedadesAlquiler, setPropiedadesAlquiler] = useState<Property[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProperties = async () => {
            try {
                const properties = await fetchProperties("for-rent");
                setPropiedadesAlquiler(properties);

                propiedadesAlquiler.map((property) => {
                    console.log(property);
                });

            } catch (err) {
                setError('Hubo un problema al cargar las propiedades.');
            } finally {
                setLoading(false);
            }
        };

        loadProperties();
    }, []);

    if (loading) return (
        <div className='mt-14 p-4'>
            <Title text="Cargando propiedades..." />
        </div>
    );

    if (error) return <Title text={error} />;

    return (
        <div className='mt-14 p-4'>
            <h1 className="text-3xl font-bold leading-tight">
                Propiedades en Alquiler
            </h1>

            {
                propiedadesAlquiler.map((property) => (
                    <div key={property.id} className='py-4'>
                        <PropertyHorizontalCard {...property} />
                    </div>
                ))
            }
            {/* {

                propiedadesVenta.map((property, index) => (
                    <div key={index} className='py-4' >
                        <PropertyHorizontalCard {...property}>  </PropertyHorizontalCard>
                    </div>
                ))
            } */}

        </div>
    );
};

export default Alquileres;