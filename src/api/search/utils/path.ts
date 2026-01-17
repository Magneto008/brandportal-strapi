export const buildPagePath = (page: any) => {
  const segments: string[] = [];

  if (page.root) segments.push(page.root);

  const parents: string[] = [];
  let current = page.parent;

  while (current) {
    if (current.slug) parents.unshift(current.slug);
    current = typeof current.parent === "object" ? current.parent : null;
  }

  segments.push(...parents);

  if (page.slug) segments.push(page.slug);

  return "/" + segments.join("/");
};
