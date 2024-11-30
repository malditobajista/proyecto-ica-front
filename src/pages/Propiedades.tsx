import React, { useEffect, useState } from 'react';
import PropertyHorizontalCard from '../components/atomos/PropertyHorizontalCard';
import Title from '../components/atomos/Title';
import { fetchPropertiesByStatus } from '../services/services';
import { Property } from '../utils/types';
import FilterButtons from '../components/Filtros/FilterByType';
import SortByPriceButtons from '../components/Filtros/SortByPriceButtons';
import FilterByStatus from '../components/Filtros/FilterByStatus';
import FilterByHood from '../components/Filtros/FilterByHood';
import FilterByRooms from '../components/Filtros/FilterByRooms';
import FilterCleaner from '../components/Filtros/FilterCleaner';
import FilterByGarages from '../components/Filtros/FilterByGarages';
import FilterByPool from '../components/Filtros/FilterByPool';

const Propiedades: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [allProperties, setAllProperties] = useState<Property[]>([]);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
    const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
    const [filterTypes, setFilterTypes] = useState<string[]>([]);
    const [filterStatus, setFilterStatus] = useState<string[]>([]);
    const [filterHood, setFilterHood] = useState<string[]>([]);
    const [filterRooms, setFilterRooms] = useState<number[] | null>(null);
    const [filterGarages, setFilterGarages] = useState<boolean>(false);
    const [filterPool, setFilterPool] = useState<boolean>(false);

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

    const handleGaragesFilterChange = (hasGarages: boolean) => {
        setFilterGarages(hasGarages);
    };

    const handlePoolFilterChange = (hasPool: boolean) => {
        setFilterPool(hasPool);
    };

    const handleClearFilters = () => {
        setFilterTypes([]);
        setFilterStatus([]);
        setFilterHood([]);
        setFilterRooms(null);
        setSortOrder(null);
        setFilterGarages(false);
        setFilterPool(false);
    };

    useEffect(() => {
        const loadProperties = async () => {
            try {
                const allProps = await fetchPropertiesByStatus("all");

                // para cuando se implemente la aprobación de propiedades solo se muestren las q están aprobadas
                const approvedProps = allProps.filter(property => property.approved === true);
                console.log(approvedProps);
                // y aquí se debería setear el estado con approvedProps
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

        if (filterGarages) {
            filtered = filtered.filter(p => !p.garages);
        }

        if (filterPool) {
            filtered = filtered.filter(p => p.pool);
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
    }, [filterTypes, filterStatus, filterHood, filterRooms, filterGarages, allProperties, sortOrder, filterPool]);

    return (
        <div className="mt-14 p-4 min-h-screen">
            <div className="grid grid-rows-[auto,1fr] grid-cols-1 gap-4 min-h-full">
                <div className="flex flex-col md:flex-row md:items-center">
                    <Title text="Todas las Propiedades" />
                    <p className="mt-3 pt-1 lg:pl-5 md:mt-0 md:ml-4">Se están mostrando <span className="text-green-600">{filteredProperties.length}</span> propiedades</p>
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
                            <hr className='my-2' />
                            <div className="flex gap-8 justify-center mt-2">
                                <FilterByGarages onFilterChange={handleGaragesFilterChange} isChecked={filterGarages} />
                                <FilterByPool onFilterChange={handlePoolFilterChange} isChecked={filterPool} />
                            </div>
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
                            <hr className='my-2' />
                            <div className="flex gap-8 justify-center mt-2">
                                <FilterByGarages onFilterChange={handleGaragesFilterChange} isChecked={filterGarages} />
                                <FilterByPool onFilterChange={handlePoolFilterChange} isChecked={filterPool} />
                            </div>

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
