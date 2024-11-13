import React, { useEffect, useState } from 'react';
import { fetchPropertiesByStatus } from '../services/services';
import PropertyHorizontalCard from '../components/atomos/PropertyHorizontalCard';
import Title from '../components/atomos/Title';
import { Property } from '../utils/types';

const Alquileres: React.FC = () => {
    const [propiedadesAlquiler, setPropiedadesAlquiler] = useState<Property[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const loadProperties = async () => {
            try {
                const properties = await fetchPropertiesByStatus("for-rent");
                setPropiedadesAlquiler(properties);

                propiedadesAlquiler.map((property) => {
                    console.log(property);
                });

            } catch (err) {
                console.log(err);
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
        <div className='mt-14 p-4 max-w-full overflow-x-hidden'>
            <Title text='Propiedades en Alquiler' />

            {
                propiedadesAlquiler.map((property) => (
                    <div key={property.id} className='py-4'>
                        <PropertyHorizontalCard {...property} />
                    </div>
                ))
            }

        </div>
    );
};

export default Alquileres;