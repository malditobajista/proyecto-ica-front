import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPropertyById } from '../services/services';
import { Property } from '../utils/types';
import { FaBed, FaBath, FaCar, FaSwimmingPool, FaRulerCombined, FaCalendarAlt } from 'react-icons/fa';
import Title from '../components/Title';

const PropertyDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProperty = async () => {
            try {
                if (id) {
                    console.log(`Fetching property with id: ${id}`);
                    const propertyData = await fetchPropertyById(id);
                    console.log('Property data:', propertyData);
                    setProperty(propertyData);
                }
            } catch (err) {
                setError('Hubo un problema al cargar los detalles de la propiedad.');
            } finally {
                setLoading(false);
            }
        };

        loadProperty();
    }, [id]);

    if (loading) return <div>Cargando detalles de la propiedad...</div>;
    if (error) return <div>{error}</div>;
    if (!property) return <div>No se encontró la propiedad.</div>;

    // Coordenadas de ejemplo para Costa Azul, Uruguay
    const costaAzulCoordinates = {
        lat: -34.6500,
        lng: -54.1667
    };

    return (
        <div className="my-8 p-4">
            {/* Título y Precio */}
            <div className="flex justify-between items-center mb-4">
                <Title text={property.title} />
                <p className="text-xl font-semibold">Precio: <span className='text-green-500'> {property.price}</span></p>
            </div>

            {/* Imagen de la propiedad */}
            {property.imageSrc && property.imageSrc.length > 0 && (
                <div className="flex justify-center mb-4">
                    <img src={property.imageSrc[0]} alt={property.title} className="w-full h-auto" />
                </div>
            )}

            {/* Detalles de la propiedad */}
            {/* Detalles en una sola fila */}
            <div className="flex flex-wrap justify-center gap-4 mb-4 text-center">
                {property.dormitorios !== undefined && (
                    <p><FaBed className="inline-block mr-2 " /> Dormitorios: {property.dormitorios}</p>
                )}
                {property.banios !== undefined && (
                    <p><FaBath className="inline-block mr-2" /> Baños: {property.banios}</p>
                )}
                {property.garages !== undefined && (
                    <p><FaCar className="inline-block mr-2" /> Garages: {property.garages === 0 ? "No" : "Si"}</p>
                )}
                {property.piscina !== undefined && (
                    <p><FaSwimmingPool className="inline-block mr-2" /> Piscina: {property.piscina ? 'Sí' : 'No'}</p>
                )}
                {property.area && (
                    <p><FaRulerCombined className="inline-block mr-2" /> Área en m<sup>2</sup>: {property.area}</p>
                )}
                {property.lotSize && (
                    <p><FaRulerCombined className="inline-block mr-2" /> Lote en m<sup>2</sup>: {property.lotSize}</p>
                )}
                {property.yearBuilt && (
                    <p><FaCalendarAlt className="inline-block mr-2" /> Año de construcción: {property.yearBuilt}</p>
                )}
            </div>
            {/* <div className="grid grid-cols-2 gap-2 mb-4 text-center">
                {property.dormitorios !== undefined && (
                    <p><FaBed className="inline-block mr-2" /> Dormitorios: {property.dormitorios}</p>
                )}
                {property.banios !== undefined && (
                    <p><FaBath className="inline-block mr-2" /> Baños: {property.banios}</p>
                )}
                {property.garages !== undefined && (
                    <p><FaCar className="inline-block mr-2" /> Garages: {property.garages}</p>
                )}
                {property.piscina !== undefined && (
                    <p><FaSwimmingPool className="inline-block mr-2" /> Piscina: {property.piscina ? 'Sí' : 'No'}</p>
                )}
                {property.area && (
                    <p><FaRulerCombined className="inline-block mr-2" /> Área en m<sup>2</sup>: {property.area}</p>
                )}
                {property.lotSize && (
                    <p><FaRulerCombined className="inline-block mr-2" /> Lote en m<sup>2</sup>: {property.lotSize}</p>
                )}
                {property.yearBuilt && (
                    <p><FaCalendarAlt className="inline-block mr-2" /> Año de construcción: {property.yearBuilt}</p>
                )}
            </div> */}

            {/* Descripción y Estado */}
            <div className="grid grid-cols-2 gap-4 mb-4 text-center">
                <div>
                    <h2 className="text-xl font-bold">Descripción</h2>
                    <p>{property.description}</p>
                </div>
                <div>
                    <h2 className="text-xl font-bold">Estado</h2>
                    <p>{property.status}</p>
                </div>
            </div>

            {/* Mapa de Google Maps */}
            <div className="mt-4 text-center w-full">
                <h2 className="text-2xl font-bold mb-2">Ubicación en el mapa</h2>
                <div className="flex justify-center">

                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26221.553173625896!2d-55.679600661666!3d-34.76329665949181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959ff9ef8a098c7b%3A0xc8f665ead8bd8256!2s15300%20Costa%20Azul%2C%20Canelones%20Department!5e0!3m2!1sen!2suy!4v1730582767438!5m2!1sen!2suy"
                        width="600"
                        height="450"
                        loading="lazy"
                        style={{ border: 0 }}
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;