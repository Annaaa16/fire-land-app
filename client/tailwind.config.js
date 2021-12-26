module.exports = {
  mode: 'jit',
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/contexts/**/*.{js,ts,jsx,tsx}',
    './src/features/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      zIndex: require('./src/tailwind/zIndex'),
      container: require('./src/tailwind/container'),
      lineHeight: require('./src/tailwind/lineHeight'),
      boxShadow: require('./src/tailwind/boxShadow'),
      colors: require('./src/tailwind/colors'),
      backgroundImage: require('./src/tailwind/backgroundImage'),
      transitionDuration: require('./src/tailwind/transitionDuration'),
      animation: require('./src/tailwind/animation'),
      keyframes: require('./src/tailwind/keyframes'),
    },
    fontSize: require('./src/tailwind/fontSize'),
    spacing: require('./src/tailwind/spacing'),
  },
  variants: {
    extend: {},
  },
  plugins: [require('tailwind-scrollbar')],
};
