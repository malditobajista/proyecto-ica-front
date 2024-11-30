import React, { useState, useCallback } from "react";
import Button from "./atomos/Button";
import InputField from "./atomos/InputFieldProps";
import MockMap from "../assets/MockMapProps";
import {
  PropertyStatus,
  PropertyTypes,
  PropertyCardProps,
} from "../utils/types";
import Title from "./atomos/Title";
import { replaceType } from "../utils/replaceType";
import { replaceStatus } from "../utils/replaceStatus";
import PropertyCard from "./atomos/PropertyCard";
import { useDropzone } from "react-dropzone";
import { createProperty } from "../services/properties/propertyService";
import { Barrios } from "../assets/barrios";

interface CreatePropertyFormProps {
  onAddProperty: (newProperty: Omit<PropertyCardProps, "id">) => void;
}

const inicializarPropiedad = {
  title: "",
  description: "",
  longDescription: "",
  price: 0,
  type: "" as PropertyTypes,
  status: "" as PropertyStatus,
  lotSize: 0,
  area: 0,
  rooms: 0,
  bathrooms: 0,
  address: "",
  geoCordinates: {
    lat: 0,
    lng: 0,
  },
  neighborhood: "",
  yearBuilt: 0,
  garages: false,
  pool: false,
  contribution: 0,
  imageSrc: [],
  pinned: false,
  approved: false,
};

const CreatePropertyForm: React.FC<CreatePropertyFormProps> = ({
  onAddProperty,
}) => {
  const [formData, setFormData] =
    useState<Omit<PropertyCardProps, "id">>(inicializarPropiedad);
  const [files, setFiles] = useState<File[]>([]); // Nuevo estado para almacenar los archivos

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImageSrc = acceptedFiles.map((file) => URL.createObjectURL(file));
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]); // Guardar archivos reales
    setFormData((prev) => ({
      ...prev,
      imageSrc: [...prev.imageSrc, ...newImageSrc],
    })); // Guardar URLs de vista previa
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Llamada al servicio para crear la propiedad
      console.log("Formulario de propiedad:", formData);
      console.log("files de propiedad:", files);

      await createProperty(formData, files);
      // Añadir la propiedad al estado de la lista de propiedades
      onAddProperty(formData);
      // Restablecer el formulario y los archivos después de la creación exitosa
      setFormData(inicializarPropiedad);
      setFiles([]); // Limpiar archivos
    } catch (error) {
      console.error("Error al enviar la propiedad:", error);
    }
  };

  return (
    <div className="md:p-4 space-y-6">
      {/* Contenedor dividido en dos columnas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <form
          onSubmit={handleSubmit}
          className="space-y-8 border-2 border-grey p-4 md:p-8 mt-10 rounded-md"
        >
          <Title clase="text-2xl" text="Agregar propiedad" />
          <p className="text-gray-500 m-0 font-sans">
            Ingrese los detalles de las propiedades.
          </p>

          <div className="space-y-4">
            <InputField
              label="Titulo"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Ingrese el titulo"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium">Imagenes</label>
            <div
              {...getRootProps()}
              className={`w-full p-6 md:p-10 border rounded-md ${isDragActive ? "bg-blue-100" : "bg-gray-50"
                }`}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Suelta tus imágenes aquí</p>
              ) : (
                <p>
                  Arrastra y suelta algunos archivos aquí, o haz clic para
                  seleccionar archivos
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Ingrese la dirección de la propiedad"
            />
            <div >
              <label className="block text-sm">Barrio</label>

              <select
                name="neighborhood"
                value={formData.neighborhood}
                onChange={handleInputChange}
                className="w-full mt-1 capitalize p-2 border rounded-md"
              >
                <option disabled value="">
                  Seleccione un barrio
                </option>
                {Barrios.map((barrio) => (
                  <option key={barrio.value} value={barrio.value}>
                    {barrio.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <InputField
            label="Precio"
            name="price"
            value={formData.price?.toString() || ""}
            onChange={handleInputChange}
            placeholder="Ingrese la dirección de la propiedad"
            type="number"
          />

          <InputField
            label="Descripción corta"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Ingrese una descripción corta"
          />

          <InputField
            label="Descripción larga"
            name="longDescription"
            value={formData.longDescription}
            onChange={handleInputChange}
            placeholder="Ingrese una descripción larga"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm">Tipo de propiedad</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full capitalize p-2 border rounded-md"
              >
                <option disabled value="">
                  Seleccione un Tipo
                </option>
                {Object.values(PropertyTypes).map((type) => (
                  <option key={type} value={type}>
                    {replaceType(type)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">
                Estado de la propiedad
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full p-2 capitalize border rounded-md"
              >
                <option disabled value="">
                  Seleccione un estado
                </option>
                {Object.values(PropertyStatus).map((status) => (
                  <option key={status} value={status}>
                    {replaceStatus(status)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Habitaciones"
              name="rooms"
              value={formData.rooms?.toString() || ""}
              onChange={handleInputChange}
              type="number"
            />
            <InputField
              label="Baños"
              name="bathrooms"
              value={formData.bathrooms?.toString() || ""}
              onChange={handleInputChange}
              type="number"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="garages"
                checked={formData.garages}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Garajes
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="pool"
                checked={formData.pool}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Piscina
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Área (m²)"
              name="area"
              value={formData.area?.toString() || ""}
              onChange={handleInputChange}
              type="number"
            />
            <InputField
              label="Tamaño del terreno (m²)"
              name="lotSize"
              value={formData.lotSize?.toString() || ""}
              onChange={handleInputChange}
              type="number"
            />
          </div>



          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Año de construcción"
              name="yearBuilt"
              value={formData.yearBuilt?.toString() || ""}
              onChange={handleInputChange}
              placeholder="Ingrese el año de construcción"
            />
            <InputField
              label="Contribución"
              name="contribution"
              value={formData.contribution?.toString() || ""}
              onChange={handleInputChange}
              placeholder="Cuanto se paga de constribucion"
              type="number"
            />
          </div>

          <MockMap
            onClick={(latLng) =>
              setFormData({
                ...formData,
                // @ts-expect-error aasdas
                latitud: latLng.lat,
                longitud: latLng.lng,
              })
            }
          />

          <Button type="submit" clase="w-full bg-blue-500 text-white">
            Crear Propiedad
          </Button>
        </form>

        <div className="space-y-8 mt-10 rounded-md">
          <div className="border-2 border-grey p-4 md:p-8 rounded-md">
            <Title clase="text-xl mb-4" text="Vista de la propiedad" />
            {formData.title.trim() || formData.imageSrc ? (
              <PropertyCard
                {...{ ...formData, id: 0 }} // Pasamos los datos del estado.
              />
            ) : (
              <p className="text-gray-500 text-sm">
                Comience a llenar el formulario para ver una vista previa de la
                propiedad.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePropertyForm;
