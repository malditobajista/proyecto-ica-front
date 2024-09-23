import React from 'react';
import propiedadesVenta from '../assets/placeholderPropiedadesVenta';
import PropertyHorizontalCard from '../components/PropertyHorizontalCard';

const Ventas: React.FC = () => {
    return (
        <div className='mt-14 p-4'>
            <h1 className="text-3xl font-bold leading-tight">
                Propiedades en Venta</h1>

            {

                propiedadesVenta.map((property, index) => (
                    <div key={index} className='py-4' >
                        <PropertyHorizontalCard {...property}>  </PropertyHorizontalCard>
                    </div>
                ))
            }

        </div>
    );
};

export default Ventas;