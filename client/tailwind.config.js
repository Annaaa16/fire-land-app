module.exports = {
  mode: 'jit',
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/features/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      zIndex: {
        '-1': '-1',
      },
      container: {
        center: true,
        screens: {
          lg: '1440px',
        },
        padding: {
          DEFAULT: '15px',
          lg: '0',
        },
      },
      lineHeight: {
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        7: '28px',
        8: '32px',
        9: '36px',
        10: '40px',
      },
      colors: {
        'primary-v1': {
          DEFAULT: '#615dfa',
          hv: '#5753e4',
          input: '#4e4ac8',
          text: '#8b88ff',
        },
        'primary-v2': {
          DEFAULT: '#23d2e2',
        },
        'primary-v3': {
          DEFAULT: '#7750f8',
          hv: '#9668ff',
          input: '#5538b5',
        },
        'primary-v4': {
          DEFAULT: '#40d04f',
          hv: '#4ae95b',
          linear: '#9cec5c',
        },
        green: {
          DEFAULT: '#45bd62',
        },
        gray: {
          DEFAULT: '#65676b',
        },
        blue: {
          DEFAULT: '#1877f2',
          hv: '#1771e6',
        },
        lt: {
          body: '#f7f7fa',
          line: '#dedeea',
          cpn: '#fff',
          input: '#f2f2f2',
          'tooltip-hv': '#fff',
          gray: {
            DEFAULT: '#adafca',
          },
        },
        dk: {
          body: '#161b28',
          line: '#3f485f',
          cpn: '#1d2333',
          input: '#21283b',
          'tooltip-hv': '#293249',
          gray: {
            DEFAULT: '#9aa4bf',
          },
        },
      },
      height: () => ({
        'screen/2': '50vh',
      }),
      boxShadow: {
        'primary-v1': '4px 7px 12px 0 rgb(97 93 250 / 20%)',
        'primary-v2': '4px 7px 12px 0 rgb(35 210 226 / 20%)',
        'primary-v3': '4px 7px 12px 0 rgb(119 80 248 / 20%)',
        'primary-v4': '4px 7px 12px 0 rgb(64 208 79 / 20%)',
        box: '0 1px 20px rgba(0, 0, 0, 0.18)',
      },
      transitionDuration: {
        250: '250ms',
      },
    },
    fontSize: {
      '2xs': '10px',
      xs: '12px',
      '2sm': '13px',
      sm: '14px',
      'base-1': '15px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '36px',
      '5xl': '48px',
      '6xl': '60px',
      '7xl': '72px',
    },
    spacing: {
      px: '1px',
      0: '0',
      0.5: '2px',
      1: '4px',
      1.25: '5px',
      1.5: '6px',
      2: '8px',
      2.5: '10px',
      3: '12px',
      3.5: '14px',
      4: '16px',
      4.5: '18px',
      5: '20px',
      6: '24px',
      7: '28px',
      8: '32px',
      9: '36px',
      10: '40px',
      11: '44px',
      12: '48px',
      14: '56px',
      16: '64px',
      17: '68px',
      18: '72px',
      20: '80px',
      24: '96px',
      28: '112px',
      32: '128px',
      36: '144px',
      40: '160px',
      44: '176px',
      48: '192px',
      50: '200px',
      52: '208px',
      56: '224px',
      60: '240px',
      64: '256px',
      72: '288px',
      80: '320px',
      96: '384px',
      100: '400px',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('tailwind-scrollbar')],
};
