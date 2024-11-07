import React, { useEffect, useState } from 'react';
import { fetchProperties } from '../services/services';
import PropertyHorizontalCard from '../components/atomos/PropertyHorizontalCard';
import Title from '../components/atomos/Title';
import { Property } from '../utils/types';

const Ventas: React.FC = () => {
    const [propiedadesVenta, setPropiedadesVenta] = useState<Property[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const loadProperties = async () => {
            try {
                const properties = await fetchProperties("for-sale");
                setPropiedadesVenta(properties);

                propiedadesVenta.map((property) => {
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
            <Title text='Propiedades en Venta' />

            {
                propiedadesVenta.map((property) => (
                    <div key={property.id} className='py-4'>
                        <PropertyHorizontalCard {...property} />
                    </div>
                ))
            }

        </div>
    );
};

export default Ventas;