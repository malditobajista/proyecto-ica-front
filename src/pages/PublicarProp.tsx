import { useState } from 'react';
import Title from '../components/Title';
import FormPropiedades from '../components/FormPropiedades';
import { PropertyCardProps } from '../utils/types';

const PublicarProp: React.FC = () => {
    const [properties, setProperties] = useState<PropertyCardProps[]>([]);

    const onAddProperty = (newProperty: Omit<PropertyCardProps, 'id'>) => {
        const newId = properties.length + 1;
        const propertyWithId = { id: newId, ...newProperty };
        setProperties([...properties, propertyWithId]);
    };

    return (
        <div className='mt-14'>
            <Title text='Publicar Propiedades' />
            <FormPropiedades onAddProperty={onAddProperty} />
        </div>
    );
};

export default PublicarProp;