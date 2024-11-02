// import React, { useState } from 'react';
// import { PropertyCardProps } from '../utils/types';
// import Button from './Button';
// import { Barrios } from '../assets/barrios';
// import InputField from './InputFieldProps';
// import ImageField from './ImageFieldProps';

// interface PropertyFormProps {
//     onAddProperty: (property: Omit<PropertyCardProps, 'id'>) => void;
// }

// const FormPropiedades: React.FC<PropertyFormProps> = ({ onAddProperty }) => {
//     const [title, setTitle] = useState('');
//     const [imageSrc, setImageSrc] = useState<string[]>(['']);
//     const [description, setDescription] = useState('');
//     const [status, setStatus] = useState('');
//     const [price, setPrice] = useState('');
//     const [type, setType] = useState('');
//     const [dormitorios, setDormitorios] = useState('');
//     const [banios, setBanios] = useState('');
//     const [garages, setGarages] = useState('');
//     const [piscina, setPiscina] = useState(''); // Change to string
//     const [ubicacion, setUbicacion] = useState('');

//     const [errors, setErrors] = useState({
//         title: '',
//         imageSrc: '',
//         description: '',
//         status: '',
//         price: '',
//         type: '',
//     });

//     const [successMessage, setSuccessMessage] = useState(false);
//     const [newPropertyId, setNewPropertyId] = useState<string | null>(null);

//     const MAX_TITLE_CHARACTERS = 30;
//     const MAX_DESCRIPTION_CHARACTERS = 200;

//     const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const value = e.target.value;
//         setTitle(value);
//         if (value.length < 5) {
//             setErrors((prev) => ({ ...prev, title: 'Debe tener más de 5 caracteres' }));
//         } else if (value.length > MAX_TITLE_CHARACTERS) {
//             setErrors((prev) => ({ ...prev, title: 'Has alcanzado el límite de caracteres.' }));
//         } else {
//             setErrors((prev) => ({ ...prev, title: '' }));
//         }
//     };

//     const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//         const value = e.target.value;
//         setDescription(value);
//         if (value.length > MAX_DESCRIPTION_CHARACTERS) {
//             setErrors((prev) => ({ ...prev, description: 'Has alcanzado el límite de caracteres.' }));
//         } else {
//             setErrors((prev) => ({ ...prev, description: '' }));
//         }
//     };

//     const handleImageChange = (index: number, value: string) => {
//         const newImageSrc = [...imageSrc];
//         newImageSrc[index] = value;
//         setImageSrc(newImageSrc);
//     };

//     const addImageField = () => {
//         setImageSrc([...imageSrc, '']);
//     };

//     const removeImageField = (index: number) => {
//         if (imageSrc.length > 1) {
//             const newImageSrc = imageSrc.filter((_, i) => i !== index);
//             setImageSrc(newImageSrc);
//         }
//     };

//     const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const value = e.target.value;
//         if (!isNaN(Number(value)) && Number(value) >= 0) {
//             setPrice(value);
//             setErrors((prev) => ({ ...prev, price: '' }));
//         } else {
//             setErrors((prev) => ({ ...prev, price: 'Debes ingresar un monto' }));
//         }
//     };

//     const validateForm = () => {
//         const newErrors: any = {};
//         if (!title) newErrors.title = 'Este campo es requerido.';
//         if (!imageSrc[0]) newErrors.imageSrc = 'Este campo es requerido.';
//         if (!description) newErrors.description = 'Este campo es requerido.';
//         if (!status) newErrors.status = 'Este campo es requerido.';
//         if (!price) newErrors.price = 'Este campo es requerido.';
//         if (!type) newErrors.type = 'Este campo es requerido.';
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         if (validateForm()) {
//             const newProperty = {
//                 title,
//                 imageSrc,
//                 description,
//                 status,
//                 price,
//                 type,
//                 dormitorios,
//                 banios,
//                 garages,
//                 piscina: piscina === 'yes', // Convert to boolean
//                 ubicacion,
//             };

//             onAddProperty(newProperty);

//             // Simula obtener un ID para la nueva propiedad
//             const generatedId = '123'; // Esto debería ser el ID real de la propiedad
//             setNewPropertyId(generatedId);
//             setSuccessMessage(true);

//             // Reset form
//             setTitle('');
//             setImageSrc(['']);
//             setDescription('');
//             setStatus('');
//             setPrice('');
//             setType('');
//             setDormitorios('');
//             setBanios('');
//             setGarages('');
//             setPiscina(''); // Reset to empty string
//             setUbicacion('');
//             setErrors({
//                 title: '',
//                 imageSrc: '',
//                 description: '',
//                 status: '',
//                 price: '',
//                 type: '',
//             });
//         }
//     };

//     return (
//         <section id="contact-form" className="p-4 max-w-lg mx-auto">
//             {successMessage && (
//                 <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
//                     <strong className="font-bold">Propiedad agregada con éxito!</strong>
//                     <span className="block sm:inline"> ¿Deseas ir a ella?</span>
//                     {newPropertyId && (
//                         <a
//                             href={`/propiedades/${newPropertyId}`}
//                             className="text-blue-500 hover:text-blue-700 underline ml-2"
//                         >
//                             Ir a la propiedad
//                         </a>
//                     )}
//                     <button
//                         onClick={() => setSuccessMessage(false)}
//                         className="absolute top-0 bottom-0 right-0 px-4 py-3"
//                     >
//                         <span className="text-green-700">×</span>
//                     </button>
//                 </div>
//             )}
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <InputField
//                     label="Nombre de la propiedad"
//                     value={title}
//                     onChange={handleTitleChange}
//                     error={errors.title}
//                     maxLength={MAX_TITLE_CHARACTERS}
//                 />
//                 <ImageField
//                     imageSrc={imageSrc}
//                     onImageChange={handleImageChange}
//                     addImageField={addImageField}
//                     removeImageField={removeImageField}
//                     error={errors.imageSrc}
//                 />
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700">Descripción</label>
//                     <textarea
//                         value={description}
//                         onChange={handleDescriptionChange}
//                         maxLength={MAX_DESCRIPTION_CHARACTERS}
//                         className={`mt-1 block w-full border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
//                         rows={8}
//                         style={{ resize: 'none' }}
//                         required
//                     />
//                     <div className="text-sm text-gray-500 mt-1">
//                         {MAX_DESCRIPTION_CHARACTERS - description.length} caracteres restantes
//                     </div>
//                     {errors.description && (
//                         <div className="text-sm text-red-500 mt-1">
//                             {errors.description}
//                         </div>
//                     )}
//                 </div>
//                 <div className="flex flex-col">
//                     <label htmlFor="ubicacion">Ubicación</label>
//                     <select
//                         name="ubicacion"
//                         id="ubicacion"
//                         value={ubicacion}
//                         onChange={(e) => setUbicacion(e.target.value)}
//                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     >
//                         {Barrios.map(({ value, label }) => (
//                             <option key={value} value={value}>{label}</option>
//                         ))}
//                     </select>
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700">Estado</label>
//                     <select
//                         value={status}
//                         onChange={(e) => setStatus(e.target.value)}
//                         className={`mt-1 block w-full border ${errors.status ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
//                     >
//                         <option value="">Elija una opción</option>
//                         <option value="en venta">En venta</option>
//                         <option value="en alquiler">En alquiler</option>
//                     </select>
//                     {errors.status && (
//                         <div className="text-sm text-red-500 mt-1">
//                             {errors.status}
//                         </div>
//                     )}
//                 </div>
//                 <InputField
//                     label="Precio"
//                     value={price}
//                     onChange={handlePriceChange}
//                     error={errors.price}
//                     placeholder="Escriba el monto en dólares"
//                 />
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700">Tipo</label>
//                     <select
//                         value={type}
//                         onChange={(e) => setType(e.target.value)}
//                         className={`mt-1 block w-full border ${errors.type ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
//                     >
//                         <option value="">Elija una opción</option>
//                         <option value="almacen">Almacén</option>
//                         <option value="apartamento">Apartamento</option>
//                         <option value="casa">Casa</option>
//                         <option value="comercio">Comercio</option>
//                         <option value="oficina">Oficina</option>
//                         <option value="terreno">Terreno</option>
//                     </select>
//                     {errors.type && (
//                         <div className="text-sm text-red-500 mt-1">
//                             {errors.type}
//                         </div>
//                     )}
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700">Dormitorios</label>
//                     <select
//                         value={dormitorios}
//                         onChange={(e) => setDormitorios(e.target.value)}
//                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     >
//                         <option value="0">Elija una opción</option>
//                         <option value="1">1</option>
//                         <option value="2">2</option>
//                         <option value="3">3</option>
//                         <option value="+">+</option>
//                     </select>
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700">Baños</label>
//                     <select
//                         value={banios}
//                         onChange={(e) => setBanios(e.target.value)}
//                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     >
//                         <option value="0">Elija una opción</option>
//                         <option value="1">1</option>
//                         <option value="2">2</option>
//                         <option value="3">3</option>
//                         <option value="+">+</option>
//                     </select>
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700">Garages</label>
//                     <select
//                         value={garages}
//                         onChange={(e) => setGarages(e.target.value)}
//                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     >
//                         <option value="0">Elija una opción</option>
//                         <option value="yes">Si</option>
//                         <option value="no">No</option>
//                     </select>
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700">Piscina</label>
//                     <select
//                         value={piscina}
//                         onChange={(e) => setPiscina(e.target.value)}
//                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     >
//                         <option value="">Elija una opción</option>
//                         <option value="yes">Si</option>
//                         <option value="no">No</option>
//                     </select>
//                 </div>
//                 <Button type="submit">
//                     Agregar Propiedad
//                 </Button>
//             </form>
//         </section>
//     );
// };

// export default FormPropiedades;
import React, { useState } from 'react';
import { PropertyCardProps } from '../utils/types';
import Button from './Button';
import { Barrios } from '../assets/barrios';
import InputField from './InputFieldProps';
import ImageField from './ImageFieldProps';
import MockMap from '../assets/MockMapProps';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface PropertyFormProps {
    onAddProperty: (property: Omit<PropertyCardProps, 'id'>) => void;
}
const FormPropiedades: React.FC<PropertyFormProps> = ({ onAddProperty }) => {
    const [title, setTitle] = useState('');
    const [imageSrc, setImageSrc] = useState<string[]>(['']);
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState('');
    const [dormitorios, setDormitorios] = useState('');
    const [banios, setBanios] = useState('');
    const [garages, setGarages] = useState('');
    const [piscina, setPiscina] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [latLng, setLatLng] = useState<{ lat: number; lng: number } | null>(null);

    const [errors, setErrors] = useState({
        title: '',
        imageSrc: '',
        description: '',
        status: '',
        price: '',
        type: '',
    });

    const [successMessage, setSuccessMessage] = useState(false);
    const [newPropertyId, setNewPropertyId] = useState<string | null>(null);

    const MAX_TITLE_CHARACTERS = 30;
    const MAX_DESCRIPTION_CHARACTERS = 200;

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTitle(value);
        if (value.length < 5) {
            setErrors((prev) => ({ ...prev, title: 'Debe tener más de 5 caracteres' }));
        } else if (value.length > MAX_TITLE_CHARACTERS) {
            setErrors((prev) => ({ ...prev, title: 'Has alcanzado el límite de caracteres.' }));
        } else {
            setErrors((prev) => ({ ...prev, title: '' }));
        }
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setDescription(value);
        if (value.length > MAX_DESCRIPTION_CHARACTERS) {
            setErrors((prev) => ({ ...prev, description: 'Has alcanzado el límite de caracteres.' }));
        } else {
            setErrors((prev) => ({ ...prev, description: '' }));
        }
    };

    const handleImageChange = (index: number, value: string) => {
        const newImageSrc = [...imageSrc];
        newImageSrc[index] = value;
        setImageSrc(newImageSrc);
    };

    const addImageField = () => {
        setImageSrc([...imageSrc, '']);
    };

    const removeImageField = (index: number) => {
        if (imageSrc.length > 1) {
            const newImageSrc = imageSrc.filter((_, i) => i !== index);
            setImageSrc(newImageSrc);
        }
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (!isNaN(Number(value)) && Number(value) >= 0) {
            setPrice(value);
            setErrors((prev) => ({ ...prev, price: '' }));
        } else {
            setErrors((prev) => ({ ...prev, price: 'Debes ingresar un monto' }));
        }
    };

    const validateForm = () => {
        const newErrors: any = {};
        if (!title) newErrors.title = 'Este campo es requerido.';
        if (!imageSrc[0]) newErrors.imageSrc = 'Este campo es requerido.';
        if (!description) newErrors.description = 'Este campo es requerido.';
        if (!status) newErrors.status = 'Este campo es requerido.';
        if (!price) newErrors.price = 'Este campo es requerido.';
        if (!type) newErrors.type = 'Este campo es requerido.';
        if (!latLng) newErrors.latLng = 'Debe seleccionar una ubicación en el mapa.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            const newProperty = {
                title,
                imageSrc,
                description,
                status,
                price,
                type,
                dormitorios,
                banios,
                garages,
                piscina: piscina === 'yes',
                ubicacion,
                latLng,
            };

            onAddProperty(newProperty);

            const generatedId = '123';
            setNewPropertyId(generatedId);
            setSuccessMessage(true);

            setTitle('');
            setImageSrc(['']);
            setDescription('');
            setStatus('');
            setPrice('');
            setType('');
            setDormitorios('');
            setBanios('');
            setGarages('');
            setPiscina('');
            setUbicacion('');
            setLatLng(null);
            setErrors({
                title: '',
                imageSrc: '',
                description: '',
                status: '',
                price: '',
                type: '',
            });
        }
    };

    const handleMapClick = (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
            setLatLng({
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
            });
        }
    };

    return (
        <section id="contact-form" className="p-4 max-w-lg mx-auto">
            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">Propiedad agregada con éxito!</strong>
                    <span className="block sm:inline"> ¿Deseas ir a ella?</span>
                    {newPropertyId && (
                        <a
                            href={`/propiedades/${newPropertyId}`}
                            className="text-blue-500 hover:text-blue-700 underline ml-2"
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
            <form onSubmit={handleSubmit} className="space-y-4">
                <InputField
                    label="Nombre de la propiedad"
                    value={title}
                    onChange={handleTitleChange}
                    error={errors.title}
                    maxLength={MAX_TITLE_CHARACTERS}
                />
                <ImageField
                    imageSrc={imageSrc}
                    onImageChange={handleImageChange}
                    addImageField={addImageField}
                    removeImageField={removeImageField}
                    error={errors.imageSrc}
                />
                <div>
                    <label className="block text-sm font-medium text-gray-700">Descripción</label>
                    <textarea
                        value={description}
                        onChange={handleDescriptionChange}
                        maxLength={MAX_DESCRIPTION_CHARACTERS}
                        className={`mt-1 block w-full border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        rows={8}
                        style={{ resize: 'none' }}
                        required
                    />
                    <div className="text-sm text-gray-500 mt-1">
                        {MAX_DESCRIPTION_CHARACTERS - description.length} caracteres restantes
                    </div>
                    {errors.description && (
                        <div className="text-sm text-red-500 mt-1">
                            {errors.description}
                        </div>
                    )}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="ubicacion">Ubicación</label>
                    <select
                        name="ubicacion"
                        id="ubicacion"
                        value={ubicacion}
                        onChange={(e) => setUbicacion(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        {Barrios.map(({ value, label }) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Estado</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className={`mt-1 block w-full border ${errors.status ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    >
                        <option value="">Elija una opción</option>
                        <option value="en venta">En venta</option>
                        <option value="en alquiler">En alquiler</option>
                    </select>
                    {errors.status && (
                        <div className="text-sm text-red-500 mt-1">
                            {errors.status}
                        </div>
                    )}
                </div>
                <InputField
                    label="Precio"
                    value={price}
                    onChange={handlePriceChange}
                    error={errors.price}
                    placeholder="Escriba el monto en dólares"
                />
                <div>
                    <label className="block text-sm font-medium text-gray-700">Tipo</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className={`mt-1 block w-full border ${errors.type ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    >
                        <option value="">Elija una opción</option>
                        <option value="almacen">Almacén</option>
                        <option value="apartamento">Apartamento</option>
                        <option value="casa">Casa</option>
                        <option value="comercio">Comercio</option>
                        <option value="oficina">Oficina</option>
                        <option value="terreno">Terreno</option>
                    </select>
                    {errors.type && (
                        <div className="text-sm text-red-500 mt-1">
                            {errors.type}
                        </div>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Dormitorios</label>
                    <select
                        value={dormitorios}
                        onChange={(e) => setDormitorios(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                        value={banios}
                        onChange={(e) => setBanios(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="0">Elija una opción</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="+">+</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Garages</label>
                    <select
                        value={garages}
                        onChange={(e) => setGarages(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="0">Elija una opción</option>
                        <option value="yes">Si</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Piscina</label>
                    <select
                        value={piscina}
                        onChange={(e) => setPiscina(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">Elija una opción</option>
                        <option value="yes">Si</option>
                        <option value="no">No</option>
                    </select>
                </div>
                {/* <div>
                    <label className="block text-sm font-medium text-gray-700">Selecciona la ubicación en el mapa</label>
                    <LoadScript googleMapsApiKey="TU_API_KEY_DE_GOOGLE_MAPS">
                        <GoogleMap
                            mapContainerStyle={{ width: '100%', height: '400px' }}
                            center={{ lat: -34.6500, lng: -54.1667 }}
                            zoom={10}
                            onClick={handleMapClick}
                        >
                            {latLng && <Marker position={latLng} />}
                        </GoogleMap>
                    </LoadScript>
                    {errors.latLng && (
                        <div className="text-sm text-red-500 mt-1">
                            {errors.latLng}
                        </div>
                    )}
                </div> */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Selecciona la ubicación en el mapa</label>
                    <MockMap onClick={handleMapClick} />
                    {latLng && (
                        <div>
                            <p>Latitud: {latLng.lat}</p>
                            <p>Longitud: {latLng.lng}</p>
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