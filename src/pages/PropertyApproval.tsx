import { useEffect, useState } from "react";
import { Property } from "../utils/types";
import { findToApprove } from "../services/properties/propertyService";
import PropertyCardApproved from "../components/atomos/PropertyCardApprove";

const ApprovePropertiesPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Fetch properties from the API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await findToApprove();
        console.log(response);
        setProperties(response);
      } catch (err) {
        console.error(err);
        setError("Error al cargar las propiedades");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);


  if (loading) return <p>Cargando propiedades...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Aprobar Propiedades</h1>
      {properties.length === 0 ? (
        <p className="text-gray-500">No hay propiedades pendientes de aprobación.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((property) => (
            <PropertyCardApproved property={property} setProperties={setProperties}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApprovePropertiesPage;
