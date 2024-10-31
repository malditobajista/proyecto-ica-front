import { useState } from 'react';
import { Barrios } from '../assets/barrios';
import Button from './Button';

const FormBusqueda = () => {
    const [mostrarOtrosSelects, setMostrarOtrosSelects] = useState(false);

    const toggleMostrarOtrosSelects = () => {
        setMostrarOtrosSelects(!mostrarOtrosSelects);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-4 ">
            <div className="flex flex-col">
                <label htmlFor="ubicacion">Ubicación</label>
                <select name="ubicacion" id="ubicacion">
                    {
                        Barrios.map(({ value, label }) => (
                            <option key={value} value={value}>{label}</option>
                        ))
                    }
                </select>
            </div>

            <div className="flex flex-col">
                <label htmlFor="tipo">Tipo</label>
                <select name="tipo" id="tipo">
                    <option key="anyType" value="any">Cualquiera</option>
                    <option key="house" value="house">Casa</option>
                    <option key="apartament" value="apartament">Apartamento</option>
                    <option key="office" value="office">Oficina</option>
                    <option key="comerce" value="comerce">Comercio</option>
                    <option key="storage" value="storage">Almacén</option>
                    <option key="land" value="land">Terreno</option>
                    <option key="other" value="other">Otros</option>
                </select>
            </div>

            <div className="flex flex-col">
                <label htmlFor="estado">Estado</label>
                <select name="estado" id="estado">
                    <option key="anyState" value="any">Cualquiera</option>
                    <option key="brand-new" value="brand-new">A estrenar</option>
                    <option key="for-sale" value="for-sale">En venta</option>
                    <option key="for-rent" value="for-rent">En alquiler</option>
                </select>
            </div>

            {mostrarOtrosSelects && (
                <>
                    <div className="flex flex-col">
                        <label htmlFor="dormitorios">Dormitorios</label>
                        <select name="dormitorios" id="dormitorios">
                            <option key="dormitorio-1" value="1">1</option>
                            <option key="dormitorio-2" value="2">2</option>
                            <option key="dormitorio-3" value="3">3</option>
                            <option key="dormitorio-+" value="+">+</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="banios">Baños</label>
                        <select name="banios" id="banios">
                            <option key="banio-1" value="1">1</option>
                            <option key="banio-2" value="2">2</option>
                            <option key="banio-3" value="3">3</option>
                            <option key="banio-+" value="+">+</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="garages">Garages</label>
                        <select name="garages" id="garages">
                            <option key="garage-si" value="yes">Si</option>
                            <option key="garage-no" value="no">No</option>
                            <option key="garage-indistinto" value="3">Indistitno</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="piscina">Piscina</label>
                        <select name="piscina" id="piscina">
                            <option key="piscina-si" value="yes">Si</option>
                            <option key="piscina-no" value="no">No</option>
                            <option key="piscina-indistinto" value="3">Indistinto</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="nombre">Nombre de la casa</label>
                        <input type="text" name="nombre" id="nombre" placeholder='Escriba el nombre' className='pl-1' />
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