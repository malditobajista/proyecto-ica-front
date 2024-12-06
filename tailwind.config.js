/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '350px': '350px',
        '450px': '450px',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        primary: '#038C3E',        // Verde oscuro (Acento)
        secondary: '#92BF4E',      // Verde claro (Acento)
        accent: '#0477BF',         //  Azul
        'background-light': '#C2D9A0',  // Verde pastel (Fondo claro)
        'background-neutral': '#F2F2F2', // Gris claro (Fondo neutro)
      },
    },
  },
  plugins: [],
}