let i = 0;

export default function resolveUniqueVariableName(prefix: string = 'uniq'): string {
  const name = `${prefix}${i}`;
  i++;
  return name;
}
