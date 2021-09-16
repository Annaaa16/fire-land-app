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
          hover: '#5753e4',
          input: '#4e4ac8',
          text: '#8b88ff',
        },
        'primary-v2': {
          DEFAULT: '#23d2e2',
        },
        'primary-v3': {
          DEFAULT: '#7750f8',
          hover: '#9668ff',
          input: '#5538b5',
        },
        'primary-v4': {
          DEFAULT: '#40d04f',
          hover: '#4ae95b',
          linear: '#9cec5c',
        },
        red: {
          DEFAULT: '#fd434f',
        },
        pink: {
          DEFAULT: '#c13584',
        },
        blue: {
          DEFAULT: '#139df8',
        },
        decoration: {
          lt: '#fff',
          dk: '#161b28',
        },
        status: {
          online: '#17dd17',
        },
        lt: {
          body: '#f7f7fa',
          text: '#3e3f5e',
          line: '#dedeea',
          cpn: '#fff',
          'tooltip-hv': '#fff',
          gray: {
            DEFAULT: '#adafca',
          },
          newsfeed: {
            group: '#eff4fb',
          },
        },
        dk: {
          body: '#161b28',
          text: '#fff',
          line: '#3f485f',
          cpn: '#1d2333',
          'tooltip-hv': '#293249',
          gray: {
            DEFAULT: '#9aa4bf',
          },
        },
      },
      spacing: {
        'form-w': '484px',
        'form-h': '625px',
        'header-h': '64px',
        'sidebar-sm-w': '80px',
        'sidebar-sm-h': 'calc(100vh - 64px)',
        'sidebar-w': '300px',
        'sidebar-h': 'calc(100vh - 64px)',
        'newsfeed-content-w': '1184px',
        'newsfeed-banner-h': '200px',
      },
      boxShadow: {
        'primary-v1': '4px 7px 12px 0 rgb(97 93 250 / 20%)',
        'primary-v2': '4px 7px 12px 0 rgb(35 210 226 / 20%)',
        'primary-v3': '4px 7px 12px 0 rgb(119 80 248 / 20%)',
        'primary-v4': '4px 7px 12px 0 rgb(64 208 79 / 20%)',
      },
      transitionDuration: {
        250: '250ms',
      },
      minWidth: {
        6.5: '26px',
      },
      rotate: {
        '-30': '-30deg',
      },
    },
    fontSize: {
      '2xs': '10px',
      xs: '12px',
      sm: '14px',
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
    },
  },
  variants: {
    extend: {},
  },
};
