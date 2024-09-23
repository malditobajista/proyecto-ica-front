import React from 'react';
import placeholderPropiedades from '../assets/placeholderPropiedades';
import PropertyHorizontalCard from '../components/PropertyHorizontalCard';

const Propiedades: React.FC = () => {

    return (
        <div className='mt-14 p-4'>
            <h1 className="text-3xl font-bold leading-tight">
                Todas las propiedades</h1>

            {

                placeholderPropiedades.map((property, index) => (
                    <div key={index} className='py-4' >
                        <PropertyHorizontalCard {...property}>  </PropertyHorizontalCard>
                    </div>
                ))
            }

        </div>
    );
};

export default Propiedades;