import React, { useEffect, useState } from 'react';
import PropertyHorizontalCard from '../components/atomos/PropertyHorizontalCard';
import Title from '../components/atomos/Title';
import { fetchPropertiesByStatus } from '../services/services';
import { Property } from '../utils/types';
import FilterButtons from '../components/Filtros/FilterByType';
import SortByPriceButtons from '../components/atomos/SortByPriceButtons';
import FilterByStatus from '../components/Filtros/FilterByStatus';
import FilterByHood from '../components/Filtros/FilterByHood';
import FilterByRooms from '../components/Filtros/FilterByRooms';
import FilterCleaner from '../components/Filtros/FilterCleaner';

const Propiedades: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [allProperties, setAllProperties] = useState<Property[]>([]);
    const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
    const [filterTypes, setFilterTypes] = useState<string[]>([]);
    const [filterStatus, setFilterStatus] = useState<string[]>([]);
    const [filterHood, setFilterHood] = useState<string[]>([]);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
    const [filterRooms, setFilterRooms] = useState<number[] | null>(null);

    const handleFilterTypeChange = (type: string) => {
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

    const handleFilterStatusChange = (type: string) => {
        if (type === 'all') {
            setFilterStatus([]);
        } else {
            setFilterStatus(prevFilters =>
                prevFilters.includes(type)
                    ? prevFilters.filter(filter => filter !== type)
                    : [...prevFilters, type]
            );
        }
    };

    const handleFilterHoodChange = (neighborhood: string) => {
        if (neighborhood === "Cualquiera") {
            setFilterHood([]);
        } else {
            setFilterHood((prevFilters) =>
                prevFilters.includes(neighborhood)
                    ? prevFilters.filter((filter) => filter !== neighborhood)
                    : [...prevFilters, neighborhood]
            );
        }
    };


    const handleFilterRoomsChange = (rooms: number[] | null) => {
        setFilterRooms(rooms);
    };

    const handleSortChange = (order: 'asc' | 'desc') => {
        setSortOrder(order);
    };

    const handleClearFilters = () => {
        setFilterTypes([]);
        setFilterStatus([]);
        setFilterHood([]);
        setFilterRooms(null);
        setSortOrder(null);
    };

    useEffect(() => {
        const loadProperties = async () => {
            try {
                const allProps = await fetchPropertiesByStatus("all");
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
        let filtered = filterTypes.length === 0
            ? allProperties
            : allProperties.filter(p => filterTypes.includes(p.type));

        if (filterStatus.length > 0) {
            filtered = filtered.filter(p => filterStatus.includes(p.status));
        }

        if (filterHood.length > 0) {
            filtered = filtered.filter(p =>
                p.neighborhood && filterHood.includes(p.neighborhood)
            );
        }

        if (filterRooms !== null) {
            filtered = filtered.filter(p => p.rooms && filterRooms.includes(p.rooms));
        }
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
    }, [filterTypes, filterStatus, filterHood, filterRooms, allProperties, sortOrder]);

    return (
        <div className="mt-14 p-4 min-h-screen">
            <div className="grid grid-rows-[auto,1fr] grid-cols-1 gap-4 min-h-full">
                <div className="flex ">
                    <Title text="Todas las Propiedades" />
                    <p className="mt-5">Se están mostrando <span className="text-green-600">{filteredProperties.length}</span> propiedades</p>
                </div>

                <div className="flex flex-col md:flex-row gap-4 px-4">
                    <aside className="hidden mt-4  md:block md:w-1/4 w-full bg-white p-4 min-h-full rounded-lg">
                        <div className='text-center'>
                            <h2 className='text-lg font-bold'>Filtros de ordenamiento</h2>
                            <hr className='my-2' />
                            <FilterCleaner onClearFilters={handleClearFilters} /> {/* Botón para limpiar filtros */}
                            <hr className='my-2' />
                            <SortByPriceButtons onSortChange={handleSortChange} currentOrder={sortOrder} />
                            <hr className='my-2' />
                            <FilterButtons onFilterChange={handleFilterTypeChange} currentFilters={filterTypes} />
                            <hr className='my-2' />
                            <FilterByStatus onFilterChange={handleFilterStatusChange} currentFilters={filterStatus} />
                            <hr className='my-2' />
                            <FilterByHood onFilterChange={handleFilterHoodChange} currentFilters={filterHood} />
                            <hr className='my-2' />
                            <FilterByRooms onFilterChange={handleFilterRoomsChange} currentFilters={filterRooms} />

                        </div>
                    </aside>

                    <div className="flex-1">
                        <div className="flex flex-col   md:hidden mb-4 text-center">
                            <h2>Filtros de ordenamiento</h2>
                            <hr className='my-2' />
                            <FilterCleaner onClearFilters={handleClearFilters} /> {/* Botón para limpiar filtros */}
                            <hr className='my-2' />
                            <SortByPriceButtons onSortChange={handleSortChange} currentOrder={sortOrder} />
                            <hr className='my-2' />
                            <FilterButtons onFilterChange={handleFilterTypeChange} currentFilters={filterTypes} />
                            <hr className='my-2' />
                            <FilterByStatus onFilterChange={handleFilterStatusChange} currentFilters={filterStatus} />
                            <hr className='my-2' />
                            <FilterByHood onFilterChange={handleFilterHoodChange} currentFilters={filterHood} />
                            <hr className='my-2' />
                            <FilterByRooms onFilterChange={handleFilterRoomsChange} currentFilters={filterRooms} />
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
