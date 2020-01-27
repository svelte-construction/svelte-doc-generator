import * as path from 'path';
import * as fs from 'fs-extra';

export default function resolveDocumentationDirectoryPath(componentPath: string): string {
  const { dir, name } = path.parse(componentPath);
  return path.resolve(dir, `${name}Documentation`);
}
