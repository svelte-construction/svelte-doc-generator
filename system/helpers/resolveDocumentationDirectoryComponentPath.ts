import * as path from 'path';
import * as fs from 'fs-extra';
import resolveDocumentationDirectoryPath from './resolveDocumentationDirectoryPath';

export default function resolveDocumentationDirectoryComponentPath(componentPath: string): string {
  const { dir, name } = path.parse(componentPath);
  return path.resolve(dir, `${name}Documentation`, `${name}Documentation.svelte`);
}
