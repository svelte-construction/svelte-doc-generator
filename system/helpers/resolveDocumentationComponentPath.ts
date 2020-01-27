import * as path from 'path';

export default function resolveDocumentationComponentPath(componentPath: string): string {
  const { dir, name } = path.parse(componentPath);
  return path.resolve(dir, `${name}Documentation.svelte`);
}
