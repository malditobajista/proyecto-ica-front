
export interface PropertyCardProps {
    title: string;
    imageSrc: string;
    url: string;
    excerpt: string;
    status: string;
    price: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ title, imageSrc, url, excerpt, status, price }) => {
    return (
        // <div className="w-full flex justify-center items-center">
        //     <article className="rh_prop_card_elementor property bg-white rounded w-9/10 mx-auto sm:w-full sm:max-w-md md:max-w-lg">
        //         <div className="rh_prop_card__wrap">
        //             <figure className="rh_prop_card__thumbnail w-full">
        //                 <div className="rhea_figure_property_one w-full">
        //                     <a href={url} className="block w-full h-full">
        //                         <img
        //                             src={imageSrc}
        //                             alt={title}
        //                             className="attachment-property-thumb-image size-property-thumb-image wp-post-image w-full h-full object-cover"
        //                         />
        //                     </a>
        //                     <div className="rh_overlay"></div>
        //                     <div className="rh_overlay__contents rh_overlay__fadeIn-bottom">
        //                         <a href={url}>Ver más</a>
        //                     </div>
        //                 </div>
        //             </figure>
        //             <div className="rh_prop_card__details_elementor px-4 sm:px-0">
        //                 <h3>
        //                     <a href={url}>{title}</a>
        //                 </h3>
        //                 <p className="rh_prop_card__excerpt">{excerpt}</p>
        //                 <div className="rh_prop_card__priceLabel">
        //                     <span className="rh_prop_card__status">{status}</span>
        //                     <p className="rh_prop_card__price">{price}</p>
        //                 </div>
        //             </div>
        //         </div>
        //     </article>
        // </div>
        <div className="w-full flex justify-center items-center">
            <article className="rh_prop_card_elementor property bg-white rounded w-full sm:max-w-md md:max-w-lg mx-auto">
                <div className="rh_prop_card__wrap">
                    <figure className="rh_prop_card__thumbnail w-full">
                        <div className="rhea_figure_property_one w-full">
                            <a href={url} className="block w-full h-full">
                                <img
                                    src={imageSrc}
                                    alt={title}
                                    className="attachment-property-thumb-image size-property-thumb-image wp-post-image w-full h-48 object-cover mx-auto sm:h-auto"
                                />
                            </a>
                            <div className="rh_overlay"></div>
                            <div className="rh_overlay__contents rh_overlay__fadeIn-bottom">
                                <a href={url}>Ver más</a>
                            </div>
                        </div>
                    </figure>
                    <div className="rh_prop_card__details_elementor p-4 sm:p-0">
                        <h3>
                            <a href={url}>{title}</a>
                        </h3>
                        <p className="rh_prop_card__excerpt">{excerpt}</p>
                        <div className="rh_prop_card__priceLabel">
                            <span className="rh_prop_card__status">{status}</span>
                            <p className="rh_prop_card__price">{price}</p>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default PropertyCard;