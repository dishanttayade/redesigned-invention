/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        backgroundImage: {
          'homebg': "url('../pages/assets/bg-image.jpg')",
          'formbg': "url('../pages/assets/buildings.jpg')",
          'buildericon': "url('../pages/assets/builder-icon.svg')",
        }
      },
    },
    plugins: [],
  }