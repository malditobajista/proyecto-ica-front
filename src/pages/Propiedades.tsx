import React, { useEffect } from 'react';
import placeholderPropiedades from '../assets/placeholderPropiedades';
import PropertyHorizontalCard from '../components/atomos/PropertyHorizontalCard';
import Title from '../components/atomos/Title';

const Propiedades: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='mt-14 p-4'>
            <Title text='Todas las Propiedades' />
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