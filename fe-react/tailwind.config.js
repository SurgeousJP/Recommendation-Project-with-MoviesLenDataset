/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#1A191F',
        border: '#393643',
        primary: '#F9AB00',
        textbox: '#222028',
      },
      fontFamily: {
        icon: 'Ionicons',
        source_sans: 'Source Sans Pro'
      },
      borderWidth: {
        1: '1px',
        6: '6px'
      },
      outlineWidth: {
        6: '6px'
      }
    }
  },
  plugins: []
};
