const updateCSP = (csp: string, key: string, value: string): string => {
  const directives = csp.split(';').map(directive => directive.trim());

  const index = directives.findIndex(directive =>
    directive.startsWith(`${key} `),
  );

  if (index !== -1) {
    const updatedDirective = `${key} ${directives[index]
      .substring(key.length)
      .trim()} ${value}`;
    directives[index] = updatedDirective;
  }

  const updatedCSP = directives.join('; ');

  return updatedCSP;
};
export default updateCSP;
