import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Property, PropertyStatus } from "../utils/types";
import ImageSlider from "../components/atomos/ImageSlider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from "../components/atomos/Button";
import PropertyFeatures from "../components/atomos/CaracteristicCarrusel";
import { useProperties } from "../contexts/PropertyContext";
import PropertyHeader from "../components/atomos/PropertyHeader";
import PropertyInfo from "../components/atomos/PropertyInfo";
import WhatsappButton from "../components/atomos/WhatsappButton";
import PropertyContactSlider from "../components/atomos/PropertiContactSlider";
import { fetchProperty } from "../services/properties/propertyService";
import { useAlert } from "../contexts/AlertContext";

const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [isRent, setIsRent] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { properties } = useProperties();
  const { showAlert } = useAlert();
  

  const currentUrl = window.location.href;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const loadProperty = async () => {
      try {
        if (!id) throw new Error("No se encontró el ID de la propiedad.");  
        if (properties.length > 0 && id) {
          const propertyData = properties.find((p) => p.id === parseInt(id));
          if (propertyData) {
            setProperty(propertyData);
            setIsRent(propertyData.status.map((s) => s.toLowerCase()).includes(PropertyStatus.ForRent));
            return;
          }
        }
        const propertyResponse = await fetchProperty(parseInt(id));
        setProperty(propertyResponse);
        setIsRent(propertyResponse.status.map((s) => s.toLowerCase()).includes(PropertyStatus.ForRent));
      } catch {
        showAlert("error", "Hubo un problema al cargar los detalles de la propiedad.");        
      } finally {
        setLoading(false);
      }
    };
    loadProperty();
  },);

  if (loading) return <div>Cargando detalles de la propiedad...</div>;
  if (!property) return <>No se encontró la propiedad</>;

  return (
    <div className="w-full bg-white mt-8 my-8 overflow-hidden">
      <Button
        onClick={() => window.history.back()}
        clase="mb-4 bg-green-300 hover:bg-green-500 fixed bottom-4 left-6 z-50"
      >
        Volver
      </Button>

      <PropertyHeader title={property.title} price={property.price} />

      <div className="w-full mb-8">
        {property.imageSrc && property.imageSrc.length > 0 && (
          <div className="flex justify-center items-center w-full">
            <ImageSlider images={property.imageSrc} />
          </div>
        )}
      </div>

      <div className="w-full mb-8">
        <PropertyFeatures
          property={{
            rooms: property.rooms,
            bathrooms: property.bathrooms,
            garages: property.garages,
            pool: property.pool,
            area: property.area,
            lotSize: property.lotSize,
            yearBuilt: property.yearBuilt,
          }}
        />
      </div>

      <div className="flex flex-col pl-2 md:flex-row w-full justify-center items-center">
  <PropertyInfo property={property} />
  {/* Envolvemos el slider en un div con un ancho máximo */}
  <div className="md:w-1/4  w-full md justify-center md:mt-0"> 
    <PropertyContactSlider propertyId={property.id} isRent={isRent}/>
  </div>
</div>


      <div className="mt-4 text-center w-full rounded-lg">
        <h2 className="text-2xl font-bold mb-2">Ubicación en el mapa</h2>
        <div className="flex justify-center rounded-lg">
          <iframe
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26221.553173625896!2d-${property.geoCoordinates?.lng}!3d-${property.geoCoordinates?.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959ff9ef8a098c7b%3A0xc8f665ead8bd8256!2s15300%20Costa%20Azul%2C%20Canelones%20Department!5e0!3m2!1sen!2suy!4v1730582767438!5m2!1sen!2suy`}
            width="600"
            height="450"
            loading="lazy"
            style={{ border: 0 }}
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <WhatsappButton urlMessage={currentUrl} />
    </div>
  );
};

export default PropertyDetails;
