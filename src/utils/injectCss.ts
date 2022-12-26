import { paramCase } from 'change-case';

export const injectCss = (
  className: string,
  style: Partial<CSSStyleDeclaration>
): HTMLStyleElement => {
  let css = `.${className}{`;

  for (const [key, value] of Object.entries(style)) {
    css += `${paramCase(key)}:${value};`;
  }

  css += '}';

  const s = document.createElement('style');

  s.innerHTML = css;

  document.head.append(s);

  return s;
};
