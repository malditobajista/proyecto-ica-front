import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchPropertyById } from "../services/services"
import { Property } from "../utils/types"
import ImageSlider from "../components/atomos/ImageSlider"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Button from "../components/atomos/Button"
import PropertyFeatures from "../components/atomos/CaracteristicCarrusel"
import ContactForm from "../components/atomos/ContactForm"
import { useProperties } from "../contexts/PropertyContext"
import PropertyHeader from "../components/atomos/PropertyHeader"
import PropertyInfo from "../components/atomos/PropertyInfo"
import Title from "../components/atomos/Title"



const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const { properties } = useProperties()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const loadProperty = async () => {
      try {
        // if (properties.length > 0 && id) {
        //   const propertyData = properties.find(p => p.id === parseInt(id))
        //   if (propertyData) {
        //     setProperty(propertyData)
        //     return
        //   }
        // }
        if (id) {
          const propertyData = await fetchPropertyById(id)
          setProperty(propertyData)
        }
      } catch (err) {
        console.error("Error fetching property:", err)
        setError("Hubo un problema al cargar los detalles de la propiedad.")
      } finally {
        setLoading(false)
      }
    }
    loadProperty()
  }, [id, properties])

  if (loading) return <div>Cargando detalles de la propiedad...</div>
  if (error) return <Title size="large" text={error} clase="h-screen mt-9" />
  if (!property) return <div>No se encontró la propiedad.</div>

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

      <div className="flex flex-col md:flex-row w-full justify-center">
        <PropertyInfo property={property} />

        <div className="w-full h-full md:h-2/5 md:w-1/4 rounded-xl shadow-xl p-4 mb-4">
          <ContactForm inRent={false} />
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
    </div>
  )
}

export default PropertyDetails

