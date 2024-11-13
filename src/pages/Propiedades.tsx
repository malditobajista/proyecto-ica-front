import React, { useEffect, useState } from 'react';
import PropertyHorizontalCard from '../components/atomos/PropertyHorizontalCard';
import Title from '../components/atomos/Title';
import { fetchPropertiesByStatus } from '../services/services';
import { Property } from '../utils/types';
import FilterButtons from '../components/atomos/FilterButtons';
import SortByPriceButtons from '../components/atomos/SortByPriceButtons';

const Propiedades: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [allProperties, setAllProperties] = useState<Property[]>([]);
    const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
    const [filterTypes, setFilterTypes] = useState<string[]>([]);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);

    const handleFilterChange = (type: string) => {
        if (type === 'all') {
            setFilterTypes([]);
        } else {
            setFilterTypes(prevFilters =>
                prevFilters.includes(type)
                    ? prevFilters.filter(filter => filter !== type)
                    : [...prevFilters, type]
            );
        }
    };

    const handleSortChange = (order: 'asc' | 'desc') => {
        setSortOrder(order);
    };

    useEffect(() => {
        const loadProperties = async () => {
            try {
                const allProps = await fetchPropertiesByStatus("all");
                console.log('>> Loaded properties:', allProps); // Verifica la estructura de los datos
                setAllProperties(allProps);
                setFilteredProperties(allProps);
            } catch (err) {
                console.log(err);

                setError('Hubo un problema al cargar las propiedades.');
            } finally {
                setLoading(false);
            }
        };

        loadProperties();
    }, []);

    useEffect(() => {
        // Aplica los filtros sobre allProperties
        const filtered = filterTypes.length === 0
            ? allProperties
            : allProperties.filter(p => filterTypes.includes(p.type));

        // Si ya existe un orden, lo aplicamos al resultado filtrado
        const sortedFilteredProperties = [...filtered].sort((a: Property, b: Property) => {
            const priceA = Number(a.price);
            const priceB = Number(b.price);

            if (sortOrder === 'asc') {
                return priceA - priceB;
            } else if (sortOrder === 'desc') {
                return priceB - priceA;
            }
            return 0;
        });

        setFilteredProperties(sortedFilteredProperties);
    }, [filterTypes, allProperties, sortOrder]);

    return (
        <div className="mt-14 p-4 min-h-screen">
            <div className="grid grid-rows-[auto,1fr] grid-cols-1 gap-4 min-h-full">
                <div className="flex ">
                    <Title text="Todas las Propiedades" />
                    <p className="mt-5">Se están mostrando <span className="text-green-600">{filteredProperties.length}</span> propiedades</p>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <aside className="hidden mt-4 md:block md:w-1/4 w-full bg-white p-4 min-h-full rounded-lg">
                        <div className='text-center'>
                            <h2 className='text-lg font-bold'>Filtros de ordenamiento</h2>
                            <hr className='my-2' />
                            <SortByPriceButtons onSortChange={handleSortChange} currentOrder={sortOrder} />
                            <hr className='my-2' />
                            <FilterButtons onFilterChange={handleFilterChange} currentFilters={filterTypes} />
                        </div>
                    </aside>

                    <div className="flex-1">
                        <div className="flex flex-col   md:hidden mb-4 text-center">
                            <h2>Filtros de ordenamiento</h2>
                            <hr className='my-2' />
                            <SortByPriceButtons onSortChange={handleSortChange} currentOrder={sortOrder} />
                            <hr className='my-2' />
                            <FilterButtons onFilterChange={handleFilterChange} currentFilters={filterTypes} />
                        </div>

                        {loading ? (
                            <p>Cargando propiedades...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : (
                            <>
                                {filteredProperties.length > 0 ? (
                                    filteredProperties.map((property, index) => (
                                        <div key={index} className="py-4">
                                            <PropertyHorizontalCard {...property} />
                                        </div>
                                    ))
                                ) : (
                                    <Title text="Lo sentimos, pero no hay propiedades para mostrar de ese tipo" />
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Propiedades;
