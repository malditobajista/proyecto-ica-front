import React, { useEffect } from "react";
import Banner from "../components/atomos/Banner";
import Button from "../components/atomos/Button";
import FormBusqueda from "../components/FormBusqueda";
import Carousel from "../components/CarouselPropiedades";
import Title from "../components/atomos/Title";
import Garantias from "../components/Garantias";
import Nosotros from "../components/Nosotros";
import { useProperties } from "../contexts/PropertyContext";

const Home: React.FC = () => {
  const { home } = useProperties();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="space-y-8  max-w-full bg-white">
      <div className="lg:max-w-[1300px] mx-auto">
        <Banner />
      </div>

      <div className="lg:max-w-[1200px] mx-auto">
        <section>
          <FormBusqueda />
        </section>
        <hr />
        <section className="px-0">
          {home.sale && home.sale.length > 0 && (
            <>
              <Title text="En venta" />
              <Carousel properties={home.sale.length ? home.sale : []} />
              <div className="py-3">
                <Button to="/ventas">Ir a propiedades en venta</Button>
              </div>
            </>
          )}
          <hr />
          {home.rent && home.rent.length > 0 && (
            <>
              <Title text="En alquiler" />
              <Carousel properties={home.rent.length ? home.rent : []} />
              <div className="py-3">
                <Button to="/alquileres">Ir a propiedades en alquiler</Button>
              </div>
            </>
          )}
        </section>
        <hr />
        <section className="px-0">
          {home.pinned && home.pinned.length > 0 && (
            <>
              <Title text="Propiedades destacadas" />
              <Carousel properties={home.pinned.length ? home.pinned : []} />
              <div className="py-3">
                <Button to="/destacadas">Ir a propiedades destacadas</Button>
              </div>
            </>
          )}
        </section>
        <hr />
        <section className="px-0">
          {home.favourites && home.favourites.length > 0 && (
            <>
              <Title text="Tus propiedades favoritas" />
              <Carousel
                properties={home.favourites.length ? home.favourites : []}
              />
              <div className="py-3">
                <Button to="/">Ir a tus propiedades favoritas</Button>
              </div>
            </>
          )}
        </section>
        <hr />
        <section className="px-0">
          {home.created && home.created.length > 0 && (
            <>
              <Title text="Tus propiedades" />
              <Carousel properties={home.created.length ? home.created : []} />
              <div className="py-3">
                <Button to="/">Ir a tus propiedades</Button>
              </div>
            </>
          )}
        </section>
        <hr />
        <section className="px-0">
          <Title text="Nosotros" />
          <Nosotros />
        </section>
        <hr />
        <Garantias />
        <hr />
      </div>
    </div>
  );
};

export default Home;
