import { useState } from 'react';
import { Barrios } from '../assets/barrios';
import Button from './atomos/Button';

const FormBusqueda = () => {
    const [mostrarOtrosSelects, setMostrarOtrosSelects] = useState(false);

    const toggleMostrarOtrosSelects = () => {
        setMostrarOtrosSelects(!mostrarOtrosSelects);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-4 ">
            <div className="flex flex-col">
                <label htmlFor="neighborhood">Ubicación</label>
                <select name="neighborhood" id="neighborhood"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                >
                    {
                        Barrios.map(({ value, label }) => (
                            <option key={value} value={value}>{label}</option>
                        ))
                    }
                </select>
            </div>

            <div className="flex flex-col">
                <label htmlFor="tipo">Tipo</label>
                <select name="tipo" id="tipo" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                >
                    <option key="anyType" value="any">Indistinto</option>
                    <option key="storage" value="storage">Almacén</option>
                    <option key="apartament" value="apartament">Apartamento</option>
                    <option key="house" value="house">Casa</option>
                    <option key="comerce" value="comerce">Comercio</option>
                    <option key="office" value="office">Oficina</option>
                    <option key="land" value="land">Terreno</option>
                    <option key="other" value="other">Otros</option>
                </select>
            </div>

            <div className="flex flex-col">
                <label htmlFor="estado">Estado</label>
                <select name="estado" id="estado"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                >
                    <option key="anyState" value="any">Indistinto</option>
                    <option key="brand-new" value="brand-new">A estrenar</option>
                    <option key="for-sale" value="for-sale">En venta</option>
                    <option key="for-rent" value="for-rent">En alquiler</option>
                </select>
            </div>

            {mostrarOtrosSelects && (
                <>
                    <div className="flex flex-col">
                        <label htmlFor="rooms">Dormitorios</label>
                        <select name="rooms" id="rooms"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        >
                            <option key="dormitorio-0" value="0">Indistinto</option>
                            <option key="dormitorio-1" value="1">1</option>
                            <option key="dormitorio-2" value="2">2</option>
                            <option key="dormitorio-3" value="3">3</option>
                            <option key="dormitorio-+" value="+">+</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="bathrooms">Baños</label>
                        <select name="bathrooms" id="bathrooms"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        >
                            <option key="banio-0" value="0">Indistinto</option>
                            <option key="banio-1" value="1">1</option>
                            <option key="banio-2" value="2">2</option>
                            <option key="banio-3" value="3">3</option>
                            <option key="banio-+" value="+">+</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="garages">Garages</label>
                        <select name="garages" id="garages" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        >
                            <option key="garage-0" value="0">Indistinto</option>
                            <option key="garage-si" value="yes">Si</option>
                            <option key="garage-no" value="no">No</option>
                            <option key="garage-indistinto" value="3">Indistitno</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="piscina">Piscina</label>
                        <select name="piscina" id="piscina" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        >
                            <option key="piscina-0" value="0">Indistinto</option>
                            <option key="piscina-si" value="yes">Si</option>
                            <option key="piscina-no" value="no">No</option>
                            <option key="piscina-indistinto" value="3">Indistinto</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="nombre">Nombre de la casa</label>
                        <input type="text" name="nombre" id="nombre" placeholder='Escriba el nombre' className="pl-1 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        />
                    </div>
                </>
            )}

            <div >
                <Button to='' onClick={toggleMostrarOtrosSelects}>
                    {mostrarOtrosSelects ? 'Menos opciones' : 'Más opciones'}
                </Button>

                <Button clase='ml-4' to='/'>Buscar</Button>
            </div>
        </div>
    );
};

export default FormBusqueda;