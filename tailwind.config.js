module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        green: '#65E107',
        blue: '#39bcf8',
        blue_dark: '#0c1630',
        dark_rgba: 'rgb(12,22,48, 0.4)',
      },
      spacing: {
        '95%': '95%',
        '90%': '90%',
        '85%': '85%',
        '80%': '80%',
        '75%': '75%',
        '70%': '70%',
        '65%': '65%',
        '50vh': '50vh',
        '60vh': '60vh',
        '70vh': '70vh',
        '80vh': '80vh',
        '90vh': '90vh',
      },
      backgroundImage: {
        blank: "url('/src/assets/images/blank.webp')",
      },
      gridTemplateRows: {
        8: 'repeat(8, minmax(0, 1fr))',
        16: 'repeat(16, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
};
