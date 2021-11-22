const colors = require('./src/tailwind/colors');
const lineHeight = require('./src/tailwind/lineHeight');
const spacing = require('./src/tailwind/spacing');
const fontSize = require('./src/tailwind/fontSize');
const container = require('./src/tailwind/container');
const zIndex = require('./src/tailwind/zIndex');
const boxShadow = require('./src/tailwind/boxShadow');
const transitionDuration = require('./src/tailwind/transitionDuration');

module.exports = {
  mode: 'jit',
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/features/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      zIndex,
      container,
      lineHeight,
      boxShadow,
      colors,
      transitionDuration,
    },
    fontSize,
    spacing,
  },
  variants: {
    extend: {},
  },
  plugins: [require('tailwind-scrollbar')],
};
