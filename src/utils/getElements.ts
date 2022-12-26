export const getElements = (): ReadonlyMap<string, Element> => {
  const m = new Map<string, Element>();

  for (const e of document.querySelectorAll('*')) {
    if (!e.id) {
      continue;
    }

    m.set(e.id, e);
  }

  return m;
};
