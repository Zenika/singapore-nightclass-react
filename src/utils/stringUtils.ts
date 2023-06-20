export const kebabCaseToCamelCase = (str: string) =>
  str
    .toLowerCase()
    .replace(/(-[a-z])/g, (group: string) =>
      group.toUpperCase().replace("-", "")
    );
