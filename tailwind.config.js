module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.njs'],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  variants: {
    scrollbar: ['dark', 'rounded'],
  },
  plugins: [require('nightwind'), require('@tailwindcss/forms'), require('tailwind-scrollbar')],
}
