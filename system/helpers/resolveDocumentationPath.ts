import * as path from 'path';

export default function resolveDocumentationPath(componentPath: string): string {
  const { dir, name } = path.parse(componentPath);
  return path.resolve(dir, `${name}Documentation.svelte`);
}
