import { PropertyStatus } from "./types";

export const replaceStatus = (status: PropertyStatus): string => {
  switch (status) {
    case PropertyStatus.ForSale:
      return "En venta";
    case PropertyStatus.ForRent:
      return "En alquiler";
    case PropertyStatus.Reserved:
      return "Reservada";
    case PropertyStatus.Sold:
      return "Vendida";
    case PropertyStatus.Rented:
      return "Alquilada";
    case PropertyStatus.UnderConstruction:
      return "En construcción";
    default:
      return "Estado no definido";
  }
};

