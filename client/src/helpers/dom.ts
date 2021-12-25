export const getRect = (el: HTMLElement) => {
  return el.getBoundingClientRect();
};

export const setStyle = (
  el: HTMLElement,
  prop: keyof CSSStyleDeclaration,
  value: string
) => {
  el.style[prop as any] = value;
};

export const removeStyle = (
  el: HTMLElement,
  prop: keyof CSSStyleDeclaration
) => {
  el.style.removeProperty(prop as string);
};
