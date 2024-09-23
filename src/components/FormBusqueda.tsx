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
                        Barrios.map((barrio) => (
                            <option value={barrio.value}>{barrio.label}</option>
                        ))
                    }
                </select>
            </div>

            <div className="flex flex-col">
                <label htmlFor="tipo">Tipo</label>
                <select name="tipo" id="tipo">
                    <option value="any">Cualquiera</option>
                    <option value="house">Casa</option>
                    <option value="apartament">Apartamento</option>
                    <option value="office">Oficina</option>
                    <option value="comerce">Comercio</option>
                    <option value="storage">Almacén</option>
                    <option value="land">Terreno</option>
                    <option value="other">Otros</option>
                </select>
            </div>

            <div className="flex flex-col">
                <label htmlFor="estado">Estado</label>
                <select name="estado" id="estado">
                    <option value="any">Cualquiera</option>
                    <option value="a-estrenar">A estrenar</option>
                    <option value="for-sale">En venta</option>
                    <option value="for-rent">En alquiler</option>
                </select>
            </div>

            {mostrarOtrosSelects && (
                <>
                    <div className="flex flex-col">
                        <label htmlFor="dormitorios">Dormitorios</label>
                        <select name="dormitorios" id="dormitorios">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="+">+</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="banios">Baños</label>
                        <select name="banios" id="banios">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="+">+</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="garages">Garages</label>
                        <select name="garages" id="garages">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="+">+</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="piscina">Piscina</label>
                        <select name="piscina" id="piscina">
                            <option value="1">Si</option>
                            <option value="2">No</option>
                            <option value="3">Indistinto</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="nombre">Nombre de la casa</label>
                        <input type="text" name="nombre" id="nombre" />
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