const string = {
  capitalize(str: string) {
    if (!str) return '';

    return str
      .split(' ')
      .map((i) => i.charAt(0).toUpperCase() + i.slice(1))
      .join(' ');
  },
};

export default string;
