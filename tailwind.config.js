module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.njs'],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [require('nightwind'), require('@tailwindcss/forms')],
}
