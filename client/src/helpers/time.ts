const time = {
  getMonth(time: string) {
    return new Date(time).toLocaleString('default', { month: 'long' });
  },

  getYear(time: string) {
    return new Date(time).getFullYear();
  },

  getNow() {
    return new Date().toISOString();
  },
};

export default time;
