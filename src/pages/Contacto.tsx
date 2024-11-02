import React from 'react';
import FormContacto from '../components/FormContacto';
import Recaptcha from '../components/Recaptcha';
import ContactItemsProps from '../components/ContactItemsProps';
import Gmap from '../components/Gmap';
import Title from '../components/Title';

const Contacto: React.FC = () => {
    return (
        <div className="py-8">
            <Title text='Contacto' />
            <div className="flex flex-col lg:flex-row lg:space-x-8">
                <div className="flex-1">
                    <FormContacto />
                    <div className="flex justify-center mt-4">
                        <Recaptcha />
                    </div>
                </div>
                <div className="flex-1">
                    <ContactItemsProps />
                </div>
            </div>
            <div className="flex justify-center mt-8">
                <Gmap />
            </div>
        </div>
    );
};

export default Contacto;