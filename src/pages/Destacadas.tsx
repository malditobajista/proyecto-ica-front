import React, { useEffect, useState } from 'react';
// import { fetchPropertiesByStatus } from '../services/services';
import PropertyHorizontalCard from '../components/atomos/PropertyHorizontalCard';
import Title from '../components/atomos/Title';
import { Property } from '../utils/types';
import { fetchPinnedProperties } from '../services/services';

const Destacadas: React.FC = () => {
    const [pinnedProperties, setPinnedProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const loadProperties = async () => {
            try {

                const pinned = await fetchPinnedProperties();

                setPinnedProperties(pinned);

            } catch (err) {
                setError('Hubo un problema al cargar las propiedades.');
                console.log(err);
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        loadProperties();
    }, [error]);

    if (loading) return (
        <div className='mt-14 p-4'>
            <Title text="Cargando propiedades..." />
        </div>
    );

    if (error) return <Title text={error} />;

    return (
        <div className='mt-14 p-4'>
            <Title text='Propiedades Destacadas' />

            {
                pinnedProperties.map((property) => (
                    <div key={property.id} className='py-4'>
                        <PropertyHorizontalCard {...property} />
                    </div>
                ))
            }

        </div>
    );
};

export default Destacadas;