import React, { useState } from 'react';
import { PropertyCardProps, PropertyStatus } from '../utils/types';
import Button from './atomos/Button';
import { Barrios } from '../assets/barrios';
import InputField from './atomos/InputFieldProps';
import ImageField from './atomos/ImageFieldProps';
import { errorMessages } from '../utils/errorMessages';
import MockMap from '../assets/MockMapProps';
import DateInput from './atomos/DateInput';
// import Year from 'react-datepicker/dist/year';

interface PropertyFormProps {
    onAddProperty: (property: Omit<PropertyCardProps, 'id'>) => void;
}

const FormPropiedades: React.FC<PropertyFormProps> = ({ onAddProperty }) => {
    const [formData, setFormData] = useState({
        title: '',
        imageSrc: [''],
        address: '',
        description: '',
        longDescription: '',
        status: '',
        price: '',
        type: '',
        rooms: '',
        bathrooms: '',
        garage: '',
        piscina: '',
        neighborhood: '',
        latLng: null as { lat: number; lng: number } | null,
        area: '',
        lote: '',
        contribucion: '',
        yearBuild: '',
    });

    const [errors, setErrors] = useState({
        title: '',
        imageSrc: '',
        description: '',
        longDescription: '',
        status: '',
        price: '',
        type: '',
        neighborhood: '',
    });

    const [successMessage, setSuccessMessage] = useState(false);
    const [newPropertyId, setNewPropertyId] = useState<string | null>(null);

    const MAX_TITLE_CHARACTERS = 30;
    const MAX_DESCRIPTION_CHARACTERS = 150;
    const MAX_LONG_DESCRIPTION_CHARACTERS = 400;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Validaciones específicas para cada campo
        switch (name) {
            case 'title':
                if (value.length < 5) {
                    setErrors((prev) => ({ ...prev, title: errorMessages.title.minLength }));
                } else if (value.length > MAX_TITLE_CHARACTERS) {
                    setErrors((prev) => ({ ...prev, title: errorMessages.title.maxLength }));
                } else {
                    setErrors((prev) => ({ ...prev, title: '' }));
                }
                break;
            case 'description':
                if (value.length > MAX_LONG_DESCRIPTION_CHARACTERS) {
                    setErrors((prev) => ({ ...prev, description: errorMessages.description.maxLength }));
                } else {
                    setErrors((prev) => ({ ...prev, description: '' }));
                }
                break;
            case 'type':
            case 'status':
            case 'neighborhood':
                if (value === 'any') {
                    setErrors((prev) => ({ ...prev, [name]: errorMessages[name] }));
                } else {
                    setErrors((prev) => ({ ...prev, [name]: '' }));
                }
                break;
            case 'price':
                if (!isNaN(Number(value)) && Number(value) >= 0) {
                    setErrors((prev) => ({ ...prev, price: '' }));
                } else {
                    setErrors((prev) => ({ ...prev, price: errorMessages.price.invalid }));
                }
                break;
            case 'contribucion':
                if (!isNaN(Number(value)) && Number(value) >= 0) {
                    setErrors((prev) => ({ ...prev, price: '' }));
                } else {
                    setErrors((prev) => ({ ...prev, price: errorMessages.contribucion.invalid }));
                }
                break;
            default:
                break;
        }
    };

    const handleImageChange = (index: number, value: string) => {
        const newImageSrc = [...formData.imageSrc];
        newImageSrc[index] = value;
        setFormData((prev) => ({ ...prev, imageSrc: newImageSrc }));
    };

    const addImageField = () => {
        setFormData((prev) => ({ ...prev, imageSrc: [...prev.imageSrc, ''] }));
    };

    const removeImageField = (index: number) => {
        if (formData.imageSrc.length > 1) {
            const newImageSrc = formData.imageSrc.filter((_, i) => i !== index);
            setFormData((prev) => ({ ...prev, imageSrc: newImageSrc }));
        }
    };

    const validateForm = () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const newErrors: any = {};
        if (!formData.title) newErrors.title = errorMessages.title.required;
        if (!formData.imageSrc[0]) newErrors.imageSrc = errorMessages.imageSrc;
        if (!formData.description) newErrors.description = errorMessages.description.required;
        if (!formData.price) newErrors.price = errorMessages.price.required;
        if (!formData.contribucion) newErrors.price = errorMessages.contribucion.invalid;
        if (!formData.type || formData.type === 'any') newErrors.type = errorMessages.type;
        if (!formData.status || formData.status === 'any') newErrors.status = errorMessages.status;
        if (!formData.neighborhood || formData.neighborhood === 'any') newErrors.neighborhood = errorMessages.neighborhood;
        setErrors(newErrors);
        console.log('Errores de validación:', newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            const priceAsNumber = Number(formData.price);
            const roomsAsNumber = Number(formData.rooms);
            const bathroomsAsNumber = Number(formData.bathrooms);

            if (isNaN(priceAsNumber)) {
                console.error('El precio debe ser un número válido');
                return;
            }
            if (isNaN(roomsAsNumber)) {
                console.error('El precio debe ser un número válido');
                return;
            }
            if (isNaN(bathroomsAsNumber)) {
                console.error('El precio debe ser un número válido');
                return;
            }
            const newProperty = {
                ...formData,
                status: formData.status as PropertyStatus,
                garage: formData.garage === 'yes',
                piscina: formData.piscina === 'yes',
                area: Number(formData.area),
                lote: Number(formData.lote),
                // anioConstruccion: formData.anioConstruccion ? formData.anioConstruccion.getFullYear() : null,
                yearBuild: formData.yearBuild,
                price: priceAsNumber,
                rooms: roomsAsNumber,
                bathrooms: bathroomsAsNumber,
                contribucion: formData.contribucion,
            };

            console.log('>> Datos de la nueva propiedad:', newProperty);

            onAddProperty(newProperty);

            const generatedId = '123';
            setNewPropertyId(generatedId);
            setSuccessMessage(true);

            setFormData({
                title: '',
                imageSrc: [''],
                address: '',
                description: '',
                longDescription: '',
                status: '',
                price: '',
                type: '',
                rooms: '',
                bathrooms: '',
                garage: '',
                piscina: '',
                neighborhood: '',
                latLng: null,
                area: '',
                lote: '',
                yearBuild: '',
                contribucion: '',
            });
            setErrors({
                title: '',
                imageSrc: '',
                description: '',
                longDescription: '',
                status: '',
                price: '',
                type: '',
                neighborhood: '',
            });
        }
    };

    const mockMapOnClick = (latLng: { lat: number; lng: number }) => {
        console.log('LatLng seleccionado:', latLng);
    };

    return (
        <section id="contact-form" className="p-4 max-w-4xl mx-auto">
            {successMessage && (
                <div className="bg-green-100 border border-green-300 text-green-500 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">Propiedad agregada con éxito!</strong>
                    <span className="block sm:inline"> ¿Deseas ir a ella?</span>
                    {newPropertyId && (
                        <a
                            href={`/propiedades/${newPropertyId}`}
                            className="text-green-300 hover:text-green-500 underline ml-2"
                        >
                            Ir a la propiedad
                        </a>
                    )}
                    <button
                        onClick={() => setSuccessMessage(false)}
                        className="absolute top-0 bottom-0 right-0 px-4 py-3"
                    >
                        <span className="text-green-700">×</span>
                    </button>
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <article className={`
                        bg-white 
                        rounded
                        text-surface
                        shadow-md
                        dark:bg-surface-dark dark:text-gray-800
                        p-4
                        mb-4
                        relative
                        `}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div>
                            <InputField
                                label="Nombre de la propiedad"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                error={errors.title}
                                maxLength={MAX_TITLE_CHARACTERS}
                            />
                        </div>

                        <div>
                            <InputField
                                label="Precio"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                error={errors.price}
                                placeholder="Escriba el monto en dólares"
                                inputMode="numeric"
                                pattern="[0-9]*"
                            />
                        </div>
                    </div>
                </article>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">

                    <div className="space-y-4">
                        <article className={`
                        bg-white 
                        rounded
                        text-surface
                        shadow-md
                        dark:bg-surface-dark dark:text-gray-800
                        p-4
                        mb-4
                        relative
                        `}>
                            <div >
                                <label className="block text-sm font-medium text-gray-700" htmlFor="tipo">Tipo</label>
                                <select
                                    name="type"
                                    id="tipo"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className={`pl-1 mt-1 block w-full border ${errors.type ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm`}

                                >
                                    <option key="anyType" value="any">Elija una opción</option>
                                    <option key="apartament" value="apartament">Apartamento</option>
                                    <option key="storage" value="storage">Almacén</option>
                                    <option key="house" value="house">Casa</option>
                                    <option key="comerce" value="comerce">Comercio</option>
                                    <option key="office" value="office">Oficina</option>
                                    <option key="land" value="land">Terreno</option>
                                    <option key="other" value="other">Otros</option>
                                </select>
                            </div>
                            {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}

                            <div>

                                <label className="block text-sm font-medium text-gray-700" htmlFor="neighborhood">Barrio</label>
                                <select
                                    name="neighborhood"
                                    id="neighborhood"
                                    value={formData.neighborhood}
                                    onChange={handleChange}
                                    className={`pl-1 mt-1 block w-full border ${errors.neighborhood ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm`}
                                >
                                    {Barrios.map(({ value, label }) => (
                                        <option key={value} value={value}>{label}</option>
                                    ))}
                                </select>

                            </div>
                            {errors.neighborhood && <p className="text-red-500 text-sm">{errors.neighborhood}</p>}
                            <div >
                                <label className="block text-sm font-medium text-gray-700" htmlFor="estado">Estado</label>
                                <select
                                    name="status"
                                    id="estado"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className={`pl-1 mt-1 block w-full border ${errors.status ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm`}
                                >
                                    <option key="anyStatus" value="any">Indistinto</option>
                                    <option key="brand-new" value="brand-new">A estrenar</option>
                                    <option key="for-sale" value="for-sale">En venta</option>
                                    <option key="for-rent" value="for-rent">En alquiler</option>
                                </select>
                            </div>
                            {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
                        </article>
                    </div>
                    <div className="space-y-4">
                        <article className={`
                        bg-white 
                        rounded
                        text-surface
                        shadow-md
                        dark:bg-surface-dark dark:text-gray-800
                        p-4
                        mb-4
                        relative
                        `}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Dormitorios</label>
                                <select
                                    name="rooms"
                                    value={formData.rooms}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                >
                                    <option value="0">Elija una opción</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="+">+</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Baños</label>
                                <select
                                    name="bathrooms"
                                    value={formData.bathrooms}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                >
                                    <option value="0">Elija una opción</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="+">+</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Garage</label>
                                <select
                                    name="garage"
                                    value={formData.garage}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                >
                                    <option value="0">Elija una opción</option>
                                    <option value="yes">Si</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Piscina</label>
                                <select
                                    name="piscina"
                                    value={formData.piscina}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                >
                                    <option value="">Elija una opción</option>
                                    <option value="yes">Si</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                        </article>
                    </div>

                    <div className="space-y-4">
                        <article className={`
                        bg-white 
                        rounded
                        text-surface
                        shadow-md
                        dark:bg-surface-dark dark:text-gray-800
                        p-4
                        mb-4
                        relative
                        `}>
                            <InputField
                                label="Área en m²"
                                name="area"
                                value={formData.area}
                                onChange={handleChange}
                                placeholder="Ingrese el área en metros cuadrados"
                                inputMode="numeric"
                                pattern="[0-9]*"
                            />
                            <InputField
                                label="Lote en m²"
                                name="lote"
                                value={formData.lote}
                                onChange={handleChange}
                                placeholder="Ingrese el área en metros cuadrados"
                                inputMode="numeric"
                                pattern="[0-9]*"
                            />
                            <InputField
                                label="Contribución"
                                name="contribucion"
                                value={formData.contribucion}
                                onChange={handleChange}
                                placeholder="Ingrese la contribución en pesos"
                                inputMode="numeric"
                                pattern="[0-9]*"
                            />
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Año de construcción</label>
                                <DateInput
                                    selectedYear={formData.yearBuild}
                                    onChange={(year) => setFormData((prev) => ({ ...prev, yearBuild: year }))}
                                />
                            </div>
                        </article>
                    </div>
                </div>
                <article className={`
                        bg-white 
                        rounded
                        text-surface
                        shadow-md
                        dark:bg-surface-dark dark:text-gray-800
                        p-4
                        mb-4
                        relative
                        `}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Dirección</label>
                            <input type='text' name='address' value={formData.address} onChange={handleChange} className={`mt-1 block w-full border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm`} required />
                            <hr className="m-auto my-4 pb-2 w-3/4" />
                            <label className="block text-sm font-medium text-gray-700">Breve descripción</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                maxLength={MAX_DESCRIPTION_CHARACTERS}
                                className={`mt-1 block w-full border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm`}
                                rows={4}
                                style={{ resize: 'none' }}
                                required
                            />
                            <div className="text-sm text-gray-500 mt-1">
                                {MAX_DESCRIPTION_CHARACTERS - formData.description.length} caracteres restantes
                            </div>
                            {errors.description && (
                                <div className="text-sm text-red-500 mt-1">
                                    {errors.description}
                                </div>
                            )}
                        </div>
                        <div>
                            <hr className="m-auto my-2 pb-2 block md:hidden w-3/4" />

                            <label className="block text-sm font-medium text-gray-700">Descripción completa</label>
                            <textarea
                                name="longDescription"
                                value={formData.longDescription}
                                onChange={handleChange}
                                maxLength={MAX_LONG_DESCRIPTION_CHARACTERS}
                                className={`mt-1 block w-full border ${errors.longDescription ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm`}
                                rows={8}
                                style={{ resize: 'none' }}
                                required
                            />
                            <div className="text-sm text-gray-500 mt-1">
                                {MAX_LONG_DESCRIPTION_CHARACTERS - formData.longDescription.length} caracteres restantes
                            </div>
                            {errors.longDescription && (
                                <div className="text-sm text-red-500 mt-1">
                                    {errors.longDescription}
                                </div>
                            )}
                        </div>
                    </div>
                    <hr className="m-auto my-2 block md:hidden" />

                    <ImageField
                        imageSrc={formData.imageSrc}
                        onImageChange={handleImageChange}
                        addImageField={addImageField}
                        removeImageField={removeImageField}
                        error={errors.imageSrc}
                    />
                </article>
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Selecciona la ubicación en el mapa</label>
                    <MockMap onClick={mockMapOnClick} />
                    {formData.latLng && (
                        <div>
                            <p>Latitud: {formData.latLng.lat}</p>
                            <p>Longitud: {formData.latLng.lng}</p>
                        </div>
                    )}
                </div>
                <Button type="submit">
                    Agregar Propiedad
                </Button>
            </form>
        </section>
    );
};

export default FormPropiedades;