import { useState } from 'react';

const FormBusqueda = () => {
    const [mostrarOtrosSelects, setMostrarOtrosSelects] = useState(false);

    const toggleMostrarOtrosSelects = () => {
        setMostrarOtrosSelects(!mostrarOtrosSelects);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex flex-col">
                <label htmlFor="ubicacion">Ubicación</label>
                <select name="ubicacion" id="ubicacion">
                    <option value="1">Barrio 1</option>
                    <option value="2">Barrio 2</option>
                    <option value="3">Barrio 3</option>
                    <option value="+">Barrio x</option>
                </select>
            </div>

            <div className="flex flex-col">
                <label htmlFor="tipo">Tipo</label>
                <select name="tipo" id="tipo">
                    <option value="1">Tipo 1</option>
                    <option value="2">Tipo 2</option>
                    <option value="3">Tipo 3</option>
                    <option value="+">Tipo x</option>
                </select>
            </div>

            <div className="flex flex-col">
                <label htmlFor="estado">Estado</label>
                <select name="estado" id="estado">
                    <option value="1">Estado 1</option>
                    <option value="2">Estado 2</option>
                    <option value="3">Estado 3</option>
                    <option value="+">Estado x</option>
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
                    <div className="w-full">
                        <label htmlFor="nombre">Nombre de la casa</label>
                        <input type="text" name="nombre" id="nombre" />
                    </div>
                </>
            )}

            <div>
                <button onClick={toggleMostrarOtrosSelects}>Más opciones</button>
            </div>


            <div>
                <button type="button">Buscar</button>
            </div>
        </div>
    );
};

export default FormBusqueda;