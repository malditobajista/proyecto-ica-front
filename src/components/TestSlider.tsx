import PropertyImageSlider from "./atomos/ImageSlider";

const imageSrc = [
    "https://placehold.co/300x300",
    "https://placehold.co/300x300",
    "https://placehold.co/300x300",
    "https://placehold.co/300x300",
    "https://placehold.co/300x300",
    "https://placehold.co/300x300",
    "https://placehold.co/300x300",
    "https://placehold.co/300x300",
    "https://placehold.co/300x300",
    "https://placehold.co/300x300",
    "https://placehold.co/300x300",
    "https://placehold.co/300x300",
]
const TestSlider = () => {
    const testImages = [
        "https://placehold.co/300x300/000000/FFFFFF?text=Image+1",
        "https://placehold.co/300x300/FF0000/FFFFFF?text=Image+2",
        "https://placehold.co/300x300/00FF00/FFFFFF?text=Image+3",
    ];


    return <PropertyImageSlider images={imageSrc} />;
};
export default TestSlider;
// Luego renderiza <TestSlider /> en algún lugar de tu aplicación para verificar el comportamiento
