import React from 'react';
import propiedadesAlquiler from '../assets/placeholderPropiedadesAlquiler';
import PropertyHorizontalCard from '../components/PropertyHorizontalCard';

const Alquileres: React.FC = () => {
    return (
        <div className='mt-14 p-4'>
            <h1 className="text-3xl font-bold leading-tight">
                Propiedades en Alquiler</h1>

            {

                propiedadesAlquiler.map((property, index) => (
                    <div key={index} className='py-4' >
                        <PropertyHorizontalCard {...property}>  </PropertyHorizontalCard>
                    </div>
                ))
            }

        </div>
    );
};

export default Alquileres;